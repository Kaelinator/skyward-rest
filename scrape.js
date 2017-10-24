const { Builder, By, Key, until } = require('selenium-webdriver')
const Promise = require('bluebird')

const scrape = module.exports = (url, sId, pass) => {
  const waitForId        = id   => driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 1000)
  const inputCredentials = ()   => driver.findElement(By.id('login')).sendKeys(sId, Key.TAB, pass, Key.RETURN)
  const getHandles       = ()   => driver.getAllWindowHandles()
  const swap             = w    => driver.getAllWindowHandles().then((w) => driver.switchTo().window(w[w.length - 1]))
  const wait             = x    => driver.sleep(x)
  const maintain         = d    => d

  const driver = new Builder()
    .forBrowser('chrome')
    .build()
    
  return driver.get(url)
    .then(waitForId('login'))
    .then(waitForId('password'))
    .then(inputCredentials)
    .then(wait(1000))
    .then(swap)
    .then(() => driver.findElement(By.xpath('//a[@data-nav="sfgradebook001.w"]')).click())
    .then(() => driver.findElements(By.name('showGradeInfo')))
    .then(grades => Promise
        .resolve(grades)
        .reduce((data, grade) => grade.getAttribute('data-bkt')
            .then(bkt => {
              data[bkt] = data[bkt] || []

              data[bkt].push(grade)

              return data
            }), {})
        .then((data) => Object.keys(data)
            .reduce((obj, bkt) => {
              obj[bkt] = obj[bkt].map((link) => {
                return Promise
                  .resolve(link.getAttribute('innerHTML'))
                  .then(score => Object.assign({}, { score: score }))
                  .tap(driver.executeScript('arguments[0].scrollIntoView()', link))
                  .tap(driver.wait(until.elementIsVisible(link)))
                  .tap(link.click())
                  .tap(driver.wait(until.elementLocated(By.className('gb_heading'))))
                  .tap(driver.findElement(By.className('gb_heading')))
                  .tap(driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')))))
                  .tap(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')).click())
                  .tap(driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')))))
              })
              return obj
            }, data)
          )

                

        //         }, {})
        //       return obj
        //     }, data))
    )
}