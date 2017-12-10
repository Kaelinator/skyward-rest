// const scrape = require('./scrape.js')
// const Promise = require('bluebird')

// const skyward = module.exports = 
//     (url) =>
//         (sId, pass, target) => scrape(url, sId, pass, target)

// const pretty = (d) => JSON.stringify(d, null, 2)

// skyward('https://skyward.kleinisd.net/')('s592100', 'pis.12345', 'Q2')
//     .then(Promise.all)
//     .then(pretty)
//     .then(console.log)
//     .catch(err => console.log(err))
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest

let req = new XMLHttpRequest()

req.open('POST', 'https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/skyporthttp.w', false)
req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
req.send(`requestAction=eel&method=extrainfo&codeType=tryLogin&codeValue=s531758&hCompName=SKY-SIS-WEB3&hOSName=Windows%20NT&login=s531758&password=ASDF%3Blkj&SecurityMenuID=0&HomePageMenuID=0&nameid=-1&hNavSearchOption=all&hSecCache=0%20items%20in%200%20entities&CurrentProgram=skyportlogin.w&CurrentVersion=010166&SuperVersion=012076&PaCVersion=05.17.10.00.06&Browser=Chrome&BrowserVersion=62&BrowserPlatform=Win32&TouchDevice=false&noheader=yes&duserid=-1&hIPInfo=10.0.200.199&HomePage=sepadm01.w&loginID=-1&hUseCGIIP=yes&hScrollBarWidth=17&UserSecLevel=5&UserLookupLevel=5&AllowSpecial=false&hAnon=bjlbYpAByijcxUsV&hNotificationsJSON=%5B%5D&pState=TX&pCountry=US&hDisplayBorder=true&hAlternateColors=true&screenWidth=1920&screenHeight=1080&hforgotLoginPage=seplog01&userAgent=Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F62.0.3202.94%20Safari%2F537.36&osName=Windows%2010&brwsInfo=Chrome%2062&subversion=62&supported=true&pageused=Desktop&recordLimit=30&disableAnimations=yes&hOpenSave=no&hAutoOpenPref=no&hButtonHotKeyIDs=bCancel&hButtonHotKeys=B&hLoadTime=.033&cUserRole=&fwtimestamp=${Date.now()}`)
// <li>dwd^sessionid^wfaacl^13672473^stuId^sID^2^sfhome01.w^false^no ^no^no^^cjgaaacinJiyimlm^JhjbdcladCbCKiLQ</li>
console.log(req.response)
if (req.response !== '<li>Invalid login or password.</li>') {
    
    req = new XMLHttpRequest()
    let x = req.response
    .slice(4, -5)
    .split('^')
    console.log(x)
    
    req.open('POST', 'https://skyward.kleinisd.net/scripts/wsisa.dll/WService=wsEAplus/httploader.p?file=sfgradebook001.w', false)
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8')
    req.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
    
    req.send(`action=viewGradeInfoDialog&gridCount=1&fromHttp=yes&stuId=${x[4]}&entityId=004&corNumId=72270&track=0&section=01&gbId=1633625&bucket=TERM+6&subjectId=&dialogLevel=1&isEoc=no&ishttp=true&sessionid=${x[1]}%15${x[2]}&javascript.filesAdded=jquery.1.8.2.js%2Cqsfmain001.css%2Csfgradebook.css%2Cqsfmain001.min.js%2Csfgradebook.js%2Csfprint001.js%2Cfusion.js&encses=pjdcvGlpnffcchba&dwd=${x[0]}&wfaacl=${x[2]}&requestId=${Date.now()}`)
    console.log(req.response)
}
// 
// action=viewGradeInfoDialog&gridCount=1&fromHttp=yes&stuId=74872&entityId=004&corNumId=72270&track=0&section=01&gbId=1633625&bucket=TERM+5&subjectId=&dialogLevel=1&isEoc=no&ishttp=true&sessionid=234056%1529434954&javascript.filesAdded=jquery.1.8.2.js%2Cqsfmain001.css%2Csfgradebook.css%2Cqsfmain001.min.js%2Csfgradebook.js%2Csfprint001.js&encses=dlDlpnjclppkNklU&dwd=117028&wfaacl=29434954&requestId=1512878938838
//511903^1023806^29435572^13672971^74872^s531758^2^sfhome01.w^false^no ^no^no^^KlibkljfcliCcjda^kdcNGdijhdbYUgfa
//NGlakakWkkuWjjsi
//MYbfbSpiskiblHkc

//<li>97061^194122^29436045^13673225^74872^s531758^2^sfhome01.w^false^no ^no^no^^ECFajlljeakklzid^cIXbflfPXgalaoiN</li>
//aSjbjfircphcdajb