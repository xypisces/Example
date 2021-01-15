const puppeteer = require('puppeteer') 

const base = 'https://movie.douban.com/subject/'
const doubanId = '27605698'
// const movieUrl = 'https://movie.douban.com/trailer/234328/'

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
  await page.goto(base + doubanId, {
    waitUntil: 'networkidle2'
  })

  await sleep(1000)

  // await page.waitForSelector('.list-unstyled')

  const result = await page.evaluate(() => {
    var $ = window.$
    var item = $('.related-pic-video')

    if(item && item.length>0){
      var link = item.attr('href')
      var cover = item[0].style.backgroundImage.replace(/url\(|\)/g, '')
      return {
        link,
        cover,
      }
    }
    return {}
  })

  let video;

  if(result.link){
    await page.goto(result.link, {
      waitUntil: 'networkidle2'
    })
    console.log('go to ' + result.link)
    await sleep(2000)

    video = await page.evaluate(() => {
      var $ = window.$
      var it = $('source')
  
      if(it && it.length>0){
        var url = it.attr('src')
        return url
      }
      return ''
    })
  }

  const data = {
    video,
    doubanId,
    cover: result.cover,
  }
  browser.close()

  // console.log(result)
  process.send(data)
  process.exit()
})()
