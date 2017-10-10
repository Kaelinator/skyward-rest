const {Builder, By, Key, until} = require('selenium-webdriver')


const scrape = module.exports = (url, sId, pass) => {
  
  /* TODO: Scrape */
  
  const driver = new Builder()
    .forBrowser('chrome')
    .build()

  const waitForId = (id) => driver.wait(until.elementLocated(By.id(id)), 1000)
  const inputCredentials = () => driver.findElement(By.id('login')).sendKeys(sId, Key.TAB, pass, Key.RETURN)
  // const getHandles = () => driver.getAllWindowHandles()
  const switchToPopup = (w) => driver.switchTo(w[w.length - 1])
  

  driver.get(url)
    .then(waitForId('login'))
    .then(waitForId('password'))
    .then(inputCredentials)
    .then(driver.getAllWindowHandles().then(switchToPopup))
    .then(() => driver.findElement(By.id('login')).sendKeys('Hi there'))
    // .then(() => driver.findElement(By.id('PostText')).sendKeys('Hi there'))
  
  
  // driver.quit()
}
