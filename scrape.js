const { Builder, By, Key, until } = require('selenium-webdriver')


const scrape = module.exports = (url, sId, pass) => {
  
  const driver = new Builder()
    .forBrowser('chrome')
    .build()

  const waitForId        = (id) => driver.wait(until.elementLocated(By.id(id)), 1000)
  const inputCredentials = ()   => driver.findElement(By.id('login')).sendKeys(sId, Key.TAB, pass, Key.RETURN)
  const getHandles       = ()   => driver.getAllWindowHandles()
  const swap             = (w)  => driver.getAllWindowHandles().then((w) => driver.switchTo().window(w[w.length - 1]))
  const wait             = (x)  => driver.sleep(x)

  const access = driver.get(url)
    .then(waitForId('login'))
    .then(waitForId('password'))
    .then(wait(500))
    .then(inputCredentials)
    .then(wait(1000))
    .then(swap)
    
  const gradebook = access
    .then(() => driver.findElement(By.xpath('//*[@data-nav="sfgradebook001.w"]')).click())
    .then(() => driver.findElement(By.id('classGradesOptions_74872_004')).click())
    .then(() => {
      element = driver.findElement(By.id('showAssignmentsLink_74872_004'))
      element.getAttribute('data-show').then((show) => {
        if (show == 'no') {
          element.click()
        }
      })
    })
    .then(() => {
      const grades = driver.findElements(By.css('a[data-title="Assignment Details"]'))
      grades.then((x) => {
        x.forEach((y) => y.getAttribute('innerHTML').then(console.log))
      })
    })
  
}
