const puppeteer = require('puppeteer') 

const url = 'http://www.mp4pa.com/index.html'

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

;(async () => {
  console.log('movie is start to spy')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
  })

  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })

  await sleep(5000)

  await page.waitForSelector('.list-unstyled')

  const result = await page.evaluate(() => {
    var $ = window.$
    var items = $('.list-unstyled .weixin')
    var links = []

    if(items.length>=1){
      items.each((i, item) => {
        let it = $(item)
        let url = it.find('a').attr('href')
        let val = it.find('a').text()

        links.push({
          url,
          val,
        })
      })
    }
    return links
  })

  browser.close()

  // console.log(result)
  process.send({result})
  process.exit()
})()
