const { Builder, By, Key, until } = require('selenium-webdriver')

const chrome = driver => ({
  waitForId       : id => driver.wait(until.elementIsVisible(driver.findElement(By.id(id))), 1000),
  inputCredentials: (u, p) => driver.findElement(By.id('login')).sendKeys(u, Key.TAB, p, Key.RETURN),
  swap            : w => driver.getAllWindowHandles().then((w) => driver.switchTo().window(w[w.length - 1])),
  wait            : t => driver.sleep(t),
  textify         : _ => driver.executeScript('return document.body.innerText')
})


const scrape = module.exports = (url, sId, pass) => {
  
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
      .then(() => driver.findElements(By.name('encses')))
}