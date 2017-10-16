const { Builder, By, Key, until } = require('selenium-webdriver')
const Promise = require('bluebird')

const scrape = module.exports = (url, sId, pass) => {
  const waitForId        = id   => driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 1000)
  const inputCredentials = ()   => driver.findElement(By.id('login')).sendKeys(sId, Key.TAB, pass, Key.RETURN)
  const getHandles       = ()   => driver.getAllWindowHandles()
  const swap             = w    => driver.getAllWindowHandles().then((w) => driver.switchTo().window(w[w.length - 1]))
  const wait             = x    => driver.sleep(x)

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
    .then(grades => {
      return Promise
        .resolve(grades)
        .reduce((data, grade) => grade.getAttribute('data-bkt')
            .then(bkt => {
              data[bkt] = data[bkt] || []

              data[bkt].push(grade)

              return data
            }), {})
        .then((data) => Object.keys(data)
            .reduce((obj, bkt) => {
              obj[bkt] = obj[bkt].reduce((overview, grade) => {

                return driver.executeScript('arguments[0].scrollIntoView()', grade)
                  .then(() => grade.click())
                  .then(() => driver.wait(until.elementLocated(By.className('gb_heading'))))
                  .then(() => driver.findElement(By.className('gb_heading')).then((x) => x.getAttribute('innerHTML').then(console.log)))
                  .then(() => driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')))))
                  .then(() => driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')).click())
                  .then(() => driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')))))
                  .then(() => 5)

                }, {})
              return obj
            }, data))
    })
}
