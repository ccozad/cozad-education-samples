/**
Demo Name:
Hot and Cold, Range Sensor Demo

Description:
Reads an OSEPP ultrasonic range finger and displays the distance on a Grove 
RGB LCD while simultaneously indicating "hot" or "cold" using the LCD back 
light color.

License:
Copyright 2017 Charles Cozad
 
Permission is hereby granted, free of charge, to any person obtaining a copy 
of this software and associated documentation files (the "Software"),to deal 
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
copies of the Software, and to permit persons to whom the Software is furnished
to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in 
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS 
IN THE SOFTWARE.
*/

#include <rgb_lcd.h>
#include <Wire.h>

// LCD related fields
rgb_lcd lcd;
int colorR = 0;
int colorG = 0;
int colorB = 255;

// Range sensor related fields
const int triggerPin = 7;
const int echoPin = 8;
float duration; // Time in microseconds
int distance; // Distance in cm
float speed_of_sound_in_air;// Approx speed of sound at a given temp [m/s]
float speed_of_sound_ref; //Approx speed of sound at 0 degrees C [m/s]
float temperature; // temerature of room in degrees celsius
float speed_of_sound; //Speed in arduino friendly unts[cm per microsecond]

void setup()
{
  pinMode(triggerPin, OUTPUT);
  pinMode(echoPin, INPUT);
  // The speed of sound is not contant and depends on the medium it is 
  // traveling through, temperature, humidity and other factors. Our 
  // approximation is greatly simplified and we will only consider 
  // temperature variation for a typical earth atmosphere.
  // See http://hyperphysics.phy-astr.gsu.edu/hbase/Sound/souspe3.html
  // for additional context.
  speed_of_sound_ref = 331.4;
  temperature = 21.1;
  speed_of_sound_in_air = speed_of_sound_ref + (0.6 * temperature);
  speed_of_sound = speed_of_sound_in_air / 10000.0;

  // LCD initialization
  lcd.begin(16, 2);
  lcd.setRGB(colorR, colorG, colorB);
  lcd.print("Distance [cm]: ");

  delay(1000);
}

void loop()
{
  // Clear second line of LCD and get ready to print sensor results
  lcd.setCursor(0, 1);
  lcd.print("               ");
  lcd.setCursor(0, 1);

  // Ensure that the range sensor is ready
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);

  // Send ultrasoic pulses
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);

  // Read time to hear echo
  duration = pulseIn(echoPin, HIGH);
  // The duration represents a round trip time
  // speed = distance / time
  // distance = time * speed
  // Finally, we convert the result into an integer to show a more steady
  // value on the display.
  distance = (int)((duration / 2) * speed_of_sound);

  // The ultrasonic range finder has an advertised range of 2cm to 400cm
  // Any other distance values we assume to be invalid.
  if (distance >= 400 || distance <= 2) {
    lcd.print("Out of Range!");
    colorR = 0;
    colorB = 255;
  }
  else {
    lcd.print((int)distance);
    // Normalize the distance and use it to calculate a percentage of red
    // and blue for the LCD backlight. 
    // 2cm = 100% red and 60cm = 0% red
    // 2cm = 0% blue and 60 cm = 100% blue
    if (distance > 60) {
      colorR = 0;
      colorB = 255;
    } else {
      colorR = (int)(255 * ((60 - distance) / 58.0));
      colorB = 255 - colorR;
    }
  }
  lcd.setRGB(colorR, colorG, colorB);
  delay(100);
}
