# Skyward REST

[![Build Status](https://travis-ci.org/Kaelinator/skyward-rest.svg?branch=master)](https://travis-ci.org/Kaelinator/skyward-rest)

## Installation

```sh
npm install https://github.com/Kaelinator/skyward-rest
```

## Summary

### Unofficial Rest API for Skyward
 - Queries data for the fastest output
 - Breaks down and parses complex responses
 - Handles edge cases with ease
 - Built functionally

## Examples

**Basics**

```javascript
const skyward = require('skyward-rest')

const url = 'https://skyward.coolisd.net/...'

skyward(url)(userId, password)
  .then(console.log) // => [Array of Sizeable Objects]
```
<!-- 
**`.scrape()` multiple times within the same session**

```javascript
skyward(url)(userId, password)
  .then(student => {
    student.scrape('PR3')
      .then(console.log) // => [Array of Sizeable Objects]
      .then(() => student.scrape('Q2'))
      .then(console.log) // => [Array of Bigger Objects]
      .then(() => student.scrape('S2'))
      .then(console.log) // => [Array of Enormous Objects]
      .then(() => student.close())
  })
```

## API

* [Scraper factory](#scraper-factory)
* [Scraper functions](#scraper-functions)
  * [`.scrape( lit )`](#scrape-lit-)
  * [`.close()`](#close)

### Scraper factory

Curried function which returns a `Promise` which resolves into a `Scraper`. It first accepts the URL to the login page of the specific ISD's Skyward domain. Note that the URL should not redirect.

```javascript
skyward('https://skyward.coolisd.net/scripts/wsisa.dll/WService=wsEAplus/seplog01.w')(userId, password)
// => Promise { <pending> } then Scraper
```

The Promise resolves once the scraper navigates to the gradebook.

### Scraper functions

Functions to control the Scraper.

#### .scrape( lit )

Function to scrape data from a particular `lit` which returns a `Promise` that resolves into an `Object Array`.

```javascript
student.scrape('PR4')
// => Promise { <pending> } then [Array]
```

#### .close()

Closes the scraper and exits Puppeteer. This function is imperative in order to save computer resources. -->
