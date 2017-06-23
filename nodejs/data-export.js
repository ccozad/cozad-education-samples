/**
Demo Name:
Export to CSV

Description:
Writes a collection of data to a file in CSV format

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


// Our dependencies
// Built in file system module
var fs = require('fs');

// Some fake data to export
// Generated using http://www.json-generator.com/
// [
//  '{{repeat(10)}}',
//  {
//    _id: '{{objectId()}}',
//    isActive: '{{bool()}}',
//    balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
//    age: '{{integer(20, 40)}}',
//    name: '{{firstName()}} {{surname()}}',
//    registered: '{{date(new Date(2014, 0, 1), new Date(), "YYYY-MM-ddThh:mm:ss Z")}}'
//  }
// ]
var sampleData = [
  {
    "_id": "594c5375a176061237164cde",
    "isActive": false,
    "balance": "$2,443.77",
    "age": 33,
    "name": "Marla Cantu",
    "registered": "2016-11-18T01:48:39 +08:00"
  },
  {
    "_id": "594c53755c9e1a9b7a2bafaf",
    "isActive": false,
    "balance": "$2,768.48",
    "age": 22,
    "name": "Ayala Farmer",
    "registered": "2015-08-24T05:31:55 +07:00"
  },
  {
    "_id": "594c537516d0607a3652924d",
    "isActive": true,
    "balance": "$1,526.59",
    "age": 39,
    "name": "Bender Lara",
    "registered": "2016-12-25T07:08:40 +08:00"
  },
  {
    "_id": "594c5375266d0ec634902e1b",
    "isActive": false,
    "balance": "$3,366.90",
    "age": 31,
    "name": "Petra Flores",
    "registered": "2015-05-17T08:10:52 +07:00"
  },
  {
    "_id": "594c5375fdf30b98180cdf90",
    "isActive": true,
    "balance": "$3,115.12",
    "age": 24,
    "name": "Pollard Harrell",
    "registered": "2016-07-31T05:10:49 +07:00"
  },
  {
    "_id": "594c537571cc33b154a087e2",
    "isActive": false,
    "balance": "$1,964.18",
    "age": 35,
    "name": "Luz Logan",
    "registered": "2014-04-15T07:34:59 +07:00"
  },
  {
    "_id": "594c53752853b493f1b9ba8b",
    "isActive": false,
    "balance": "$1,902.53",
    "age": 33,
    "name": "Foster Stein",
    "registered": "2014-01-12T10:43:53 +08:00"
  },
  {
    "_id": "594c5375e7f51df6087d0145",
    "isActive": false,
    "balance": "$3,528.16",
    "age": 31,
    "name": "Lee Goff",
    "registered": "2015-06-04T01:22:52 +07:00"
  },
  {
    "_id": "594c5375fc730338f4751abf",
    "isActive": true,
    "balance": "$1,052.16",
    "age": 30,
    "name": "Miles Vinson",
    "registered": "2015-04-25T12:24:38 +07:00"
  },
  {
    "_id": "594c5375ac8271c195bd9d56",
    "isActive": false,
    "balance": "$2,292.57",
    "age": 38,
    "name": "Larsen Mcconnell",
    "registered": "2016-08-09T01:02:16 +07:00"
  }
]

// The CSV file format is documented here: https://tools.ietf.org/html/rfc4180
// Returns a string that contains a header and the information for each item
var createCsvData = function(data) {
    var header = "Is Active?,Balance,Age,Name,Date Registered\n"
    var body = data.map(function(item) {
        var result = [];
        result.push('"' + item.isActive + '"');
        result.push('"' + item.balance + '"');
        result.push('"' + item.age + '"');
        result.push('"' + item.name + '"');
        result.push('"' + item.registered + '"');

        return result.join(",");
    });
    return header + body.join("\n");
}

// We will now use the sample data to create a CSV file
var csvData = createCsvData(sampleData);
fs.writeFile("data-export.csv", csvData, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The csv file was saved!");
});
