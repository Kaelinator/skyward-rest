const {Builder, By, Key, until} = require('selenium-webdriver')

const scrape = module.exports = (url, sId, pass) => {

  /* TODO: Scrape */

  const driver = new Builder()
      .forBrowser('chrome')
      .build()

  driver.get(url)
    .then(() => driver.wait(until.titleIs('Login - Powered by Skyward'), 1000))
    .then(() => driver.findElement(By.name('login')).sendKeys(sId, Key.TAB, pass, Key.RETURN))
  
  
  // driver.quit()
}
