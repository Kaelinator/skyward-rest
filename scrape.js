const { Builder, By, Key, until } = require('selenium-webdriver')
const Promise = require('bluebird')

const scrape = module.exports = (url, sId, pass) => {
  
  const driver = new Builder()
    .forBrowser('chrome')
    .build()

  return new Promise((resolve, reject) => {

    const waitForId        = (id) => driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 1000)
    const inputCredentials = ()   => driver.findElement(By.id('login')).sendKeys(sId, Key.TAB, pass, Key.RETURN)
    const getHandles       = ()   => driver.getAllWindowHandles()
    const swap             = (w)  => driver.getAllWindowHandles().then((w) => driver.switchTo().window(w[w.length - 1]))
    const wait             = (x)  => driver.sleep(x)
    
    let classes = []

    const access = driver.get(url)
      .then(waitForId('login'))
      .then(waitForId('password'))
      .then(inputCredentials)
      .then(wait(1000))
      .then(swap)
    
    const gradebook = access
      .then(() => driver.findElement(By.xpath('//*[@data-nav="sfgradebook001.w"]')).click())
      .then(async () => {

        let grades = await driver.findElements(By.name('showGradeInfo'))
        // grades = [grades[0]]
        Promise.each(grades, async (g) => {

          const score = await g.getAttribute('innerHTML')
          const bkt = await g.getAttribute('data-bkt')

          await driver.executeScript('arguments[0].scrollIntoView()', g)
          /* sometimes this doesn't actually scroll... */

          await g.click()
            .then(() => { console.log('awaiting heading')
              driver.wait(until.elementLocated(By.className('gb_heading'))) })
            .then(() => { console.log('grabbing heading')
              driver.findElement(By.className('gb_heading')).then((x) => x.getAttribute('innerHTML').then(console.log)) })
            .then(() => { console.log('awaiting exit button')
              driver.wait(until.elementIsVisible(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')))) })
            .then(() => { console.log('clicking exit button')
              driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')).click() })
            .then(() => { console.log('awaiting exit')
              driver.wait(until.elementIsNotVisible(driver.findElement(By.xpath('//a[@class="sf_DialogClose"][@style="display: block;"]')))) })

        })
        
      })
    
    resolve(classes)
  })
}