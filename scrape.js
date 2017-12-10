const { Builder, By, Key, until } = require('selenium-webdriver')
const Promise = require('bluebird')
const parse = require('./parser.js')

const chrome = driver => ({
  waitForId       : id => driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 1000),
  inputCredentials: (u, p) => driver.findElement(By.id('login')).sendKeys(u, Key.TAB, p, Key.RETURN),
  swap            : w => driver.getAllWindowHandles().then((w) => driver.switchTo().window(w[w.length - 1])),
  wait            : t => driver.sleep(t),
  textify         : _ => driver.executeScript('return document.body.innerText')
})

const scrape = module.exports = (url, sId, pass, target) => {

  const driver = new Builder()
    .forBrowser('chrome')
    .build()
  
  const bot = chrome(driver)
  
  return driver.get(url) // ERR: no connection
    .then(bot.waitForId('login'))
    .then(bot.waitForId('password'))
    .then(bot.inputCredentials(sId, pass))
    .then(bot.wait(1000))
    .then(bot.textify)
    .then(res => {
      if (res.includes('Invalid login or password.'))
        throw new Error('Invalid login or password.')
    })
    .then(bot.swap)
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
                .then(bot.textify)
            .then(html => {return {inner: html, parsed: parse(html, target)}}))
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