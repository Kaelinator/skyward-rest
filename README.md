# skyward-rest
### Unofficial Rest API for Skyward

```javascript
const skyward = require('skyward-rest')

const url = 'https://skyward.coolisd.net/...'

skyward(url)(userId, password)
  .then(student => {
    student.scrape('PR3')
      .then(console.log)
      .then(() => student.scrape('Q2'))
      .then(console.log)
      .then(() => student.scrape('S1'))
      .then(console.log)
      .then(() => student.close())
  })
```