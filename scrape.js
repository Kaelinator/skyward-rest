const { Builder, By, Key, until } = require('selenium-webdriver')
const Promise = require('bluebird')
const parse = require('./parser.js')

const scrape = module.exports = (url, sId, pass, target) => {
  const waitForId        = id   => driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 1000)
  const inputCredentials = _    => driver.findElement(By.id('login')).sendKeys(sId, Key.TAB, pass, Key.RETURN)
  const getHandles       = _    => driver.getAllWindowHandles()
  const swap             = w    => driver.getAllWindowHandles().then((w) => driver.switchTo().window(w[w.length - 1]))
  const wait             = x    => driver.sleep(x)
  const innerText        = _    => driver.executeScript('return document.body.innerText')

  const driver = new Builder()
    .forBrowser('chrome')
    .build()
    
  return driver.get(url) // ERR: no connection
    .then(waitForId('login'))
    .then(waitForId('password'))
    .then(inputCredentials)
    .then(wait(1000))
    .then(innerText)
    .then(res => {
      if (res.includes('Invalid login or password.'))
        throw 'Invalid login or password.'
    })
    .then(swap)
    .then(() => driver.findElement(By.xpath('//a[@data-nav="sfgradebook001.w"]')).click())
    .then(() => driver.findElements(By.name('showGradeInfo')))
    .then(grades => Promise
        .resolve(grades)
        .filter(link => link.getAttribute('data-lit')
            .then(lit => lit == target))
        .mapSeries((link) =>
          /* TODO: clean up */
          Promise
            .resolve(link.getAttribute('innerHTML'))
            .then(score => Object.assign({}, { score: score }))
            .then(data => 
              driver.executeScript('arguments[0].scrollIntoView()', link)
                .then(driver.wait(until.elementIsVisible(link)))
                .then(link.click())
                .then(() => data))
            .then(data =>
              driver.wait(until.elementLocated(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')))
                .then(driver.wait(until.elementLocated(By.css('#gradeInfoDialog div.sf_DialogDataWrap div.sf_DialogData div.sf_DialogHtml'))))
                .then(driver.wait(until.elementIsVisible(driver.findElement(By.css('#gradeInfoDialog div.sf_DialogDataWrap div.sf_DialogData div.sf_DialogHtml')))))
                .then(driver.findElements(By.css('#gradeInfoDialog div.sf_DialogDataWrap div.sf_DialogData div.sf_DialogHtml')))
                .then(pane => driver.executeScript('return document.body.innerText'))
                .then(html => parse(html, target)))
            .then(data =>
                driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]'))))
                .then(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')).click())
                .then(driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')))))
                .then(() => data))
        ).then(x => {
          driver.quit()
          return x
        }))
}