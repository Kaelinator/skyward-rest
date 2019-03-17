# Skyward REST

[![Build Status](https://travis-ci.org/Kaelinator/skyward-rest.svg?branch=master)](https://travis-ci.org/Kaelinator/skyward-rest)

## Installation

```sh
npm install https://github.com/Kaelinator/skyward-rest
```

## Summary

**Unofficial Rest API for Skyward**
 - Queries data for the fastest output
 - Breaks down and parses complex responses
 - Handles edge cases with ease
 - Built functionally

## Examples

**Boilerplate**

```javascript
const skyward = require('skyward-rest')

const url = 'https://skyward.cooldistrict.net/...'

const scraper = skyward(url) // the scraper!
```

**Scrape a user's course gradebook**

```javascript
scraper.scrapeGradebook(user, pass, options)
  .then(console.log) // => Large Object
```

**Scrape a user's academic history**

```javascript
scraper.scrapeHistory(user, pass)
  .then(console.log) // => Array of Sizeable Objects
```

## API

- [skyward( loginURL )](#skyward-loginurl-)
- [.scrapeReportcard( user, pass )](#scrapereportcard-user-pass-)
  - [Report](#report)
- [.scrapeGradebook( user, pass, options )](#scrapegradebook-user-pass-options-)
  - [Gradebook](#gradebook)
- [.scrapeHistory( user, pass )](#scrapehistory-user-pass-)
  - [SchoolYear](#schoolyear)

### skyward( loginURL )

Function which returns an object containing the API.

* **loginURL** _string_ - URL to the login page of the specific district's Skyward domain. Note that the URL should not redirect.

```javascript
const skyward = require('skyward-rest')

skyward('https://skyward.cooldistrict.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w')
// => { usable functions }
```

### .scrapeReportcard( user, pass )

Fetches and parses a student's report card, returning a promise which results in an object that's `data` property is an array of [`Report`](#report)s. Note that this differs from `.scrapeGradebook` in that individual assignments in a course are not scraped, only the bucket's score.

* **user** _string_ - the username or Login ID of the student who's grades will be retrieved
* **pass** _string_ - the password of the student

```javascript
scraper.scrapeReportcard(user, pass)
  .then(({ data, raw }) => {
    console.log(data) // array of reports
    console.log(raw) // fetched html before parsing
  })
```

#### Report

An object that contains scores from a specific course over each bucket.

```javascript
{
  course: 97776, // the five-digit course ID
  scores: [
    {
      bucket: 'TERM 1',
      score: 100
    },
    {
      bucket: 'TERM 2',
      score: 98
    },
    /* etc */
  ]
}
```

### .scrapeGradebook( user, pass, options )

Fetches and parses user's a gradebook, returning a promise which results in an object that's data property is a [`Gradebook`](#gradebook).

* **user** _string_ - the username or Login ID of the student who's gradebook will be retrieved
* **pass** _string_ - the password of the student
* **options** _object_ - information identifying which gradebook to scrape
  * **course** _number_ - the five-digit course ID to scrape _(e.g. 97776, 97674, etc. )_
  * **bucket** _string_ - the term to scrape _(e.g. 'TERM 1', 'SEM 1', etc.)_

```javascript
scraper.scrapeGradebook(user, pass, { course: 97776, bucket: 'TERM 3' })
  .then(({ data, raw }) => {
    console.log(data) // gradebook
    console.log(raw) // fetched xml before parsing
  })
```

#### Gradebook

An object that contains information and assignments about a course at a specific bucket.

```javascript
{
  course: 'PHYSICS 2 AP', // name of the course
  instructor: 'Jennifer Smith', // name of the instructor
  lit: { // information about the specific bucket
    name: 'S1', // bucket's alias
    begin: '08/20/2018', // bucket's begin date
    end: '12/20/2018' // bucket's end date
  },
  period: 1, // course's order in the day
  score: 99.5, // score recieved (usually contains a decimal)
  grade: 100, // score after rounding (always a whole number)
  gradeAdjustment: 1.5, // points added to average to get score (null if no adjustment)
  breakdown: [ // buckets which make up this bucket's score (null if no breakdown)
    {
      lit: 'Q2', // bucket's alias
      score: 95.5, // score recieved
      grade: 96, // score after rounding
      weight: 50, // part that this bucket's score makes up the parent bucket's score (out of 100)
    },
    {
      lit: 'Q1',
      grade: 100,
      score: 100,
      weight: 50,
    },
  ],
  gradebook: [ // grade categories which make up this bucket's score
    {
      category: 'Major', // category title
      breakdown: [ // buckets which make up this category (undefined if no breakdown)
        {
          lit: 'Q2', // bucket's alias
          weight: 70, // part that this bucket's score makes up this category's score (out of 100)
          dates: {
            begin: '10/22/2018', // bucket's begin date
            end: '12/20/2018', // bucket's end date
          },
          score: 96.5, // score recieved
          grade: 97, // score after rounding
          points: {
            earned: 965, // sum of all assignments' earned points
            total: 1000, // sum of all assignments' total points
          },
        },
        /* etc. */
      ],
      assignments: [ // assignments which make up this category
        {
          title: 'TEST IV',
          score: 100, // score recieved (null if no score)
          grade: 100, // score after rounding (null if no grade)
          points: {
            earned: 100, // earned points (null if no earned)
            total: 100, // total points (null if no total)
          },
          date: '09/07/18', // date the assignment is/was due
          meta: [ // assignment modifiers
            {
              type: 'absent', // modifier type (e.g. 'absent', 'noCount', or 'missing')
              note: 'Parent note received within 5d', // extra message
            }
          ],
        },
        /* etc. */
      ]
    },
    /* etc. */
  ]
}
```

### .scrapeHistory( user, pass )

Fetches and parses user's a academic history, returning a promise which results in an object that's data property is an array of [`SchoolYear`](#schoolyear)s.

* **user** _string_ - the username or Login ID of the student who's academic history will be retrieved
* **pass** _string_ - the password of the student

```javascript
scraper.scrapeHistory(user, pass)
  .then(({ data, raw }) => {
    console.log(data) // array of schoolYears
    console.log(raw) // fetched xml before parsing
  })
```

#### SchoolYear

An object that contins information, courses, and scores from a completed school year

```javascript
{
  dates: {
    begin: '2018', // school year begin date
    end: '2019', // school year end date
  },
  grade: 12, // grade of student during the school year
  courses: [ // courses taken during the year
    {
      course: 'PHYSICS 2 AP', // course name
      scores: [
        {
          grade: 100, // grade recieved
          lit: 'S1', // bucket alias
        },
        /* etc. */
      ]
    },
    /* etc. */
  ]
}
```