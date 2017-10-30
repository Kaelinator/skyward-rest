const { Builder, By, Key, until } = require('selenium-webdriver')
const Promise = require('bluebird')

const scrape = module.exports = (url, sId, pass, target) => {
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
        .filter(link => link.getAttribute('data-lit')
            .then(lit => lit == target))
        .mapSeries((link) => 
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
                .then(driver.wait(until.elementLocated(By.className('sf_DialogHtml'))))
                .then(driver.findElements(By.className('sf_DialogHtml')))
                .then(pane => driver.executeScript('return arguments[0].innerHTML', pane))
                .then(html => Object.assign(data, { pane: html })))
            .then(data =>
                driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]'))))
                .then(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')).click())
                .then(driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')))))
                .then(() => data))
        ))
}