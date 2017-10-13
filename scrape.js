const { Builder, By, Key, until } = require('selenium-webdriver')
var Promise = require("bluebird")


const scrape = module.exports = (url, sId, pass) => {
  
  const driver = new Builder()
    .forBrowser('chrome')
    .build()

  return new Promise((resolve, reject) => {

    const waitForId        = (id) => driver.wait(until.elementLocated(By.id(id)), 1000)
    const inputCredentials = ()   => driver.findElement(By.id('login')).sendKeys(sId, Key.TAB, pass, Key.RETURN)
    const getHandles       = ()   => driver.getAllWindowHandles()
    const swap             = (w)  => driver.getAllWindowHandles().then((w) => driver.switchTo().window(w[w.length - 1]))
    const wait             = (x)  => driver.sleep(x)
    
    let userData = []

    const access = driver.get(url)
      .then(waitForId('login'))
      .then(waitForId('password'))
      .then(wait(500))
      .then(inputCredentials)
      .then(wait(1000))
      .then(swap)
    
    const gradebook = access
      .then(() => driver.findElement(By.xpath('//*[@data-nav="sfgradebook001.w"]')).click())
      .then(async () => {
        const grades = await driver.findElements(By.css('a[data-title="Assignment Details"]'))
        
        userData.push(await Promise.all(grades.map((x) => x.getAttribute('innerHTML'))))
        resolve(userData)
      })
    
  })
}
  