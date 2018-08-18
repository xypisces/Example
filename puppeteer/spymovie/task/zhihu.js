const puppeteer = require('puppeteer') 

const base = 'https://www.zhihu.com/question/55080074'

const client = require('./baidu');

const sleep = time => new Promise(resolve => {
  setTimeout(resolve, time)
})

async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 1000;
          var timer = setInterval(() => {
              var scrollHeight = 500000;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}

;(async () => {
  console.log('zhihu is start to spy')
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    dumpio: false,
  })

  const page = await browser.newPage()
  await page.goto(base, {
    waitUntil: 'networkidle2'
  })

  await sleep(1000)

  // await autoScroll(page);
  
  const result = await page.evaluate(() => {
    var y = window.scrollY;
    var item = window.document.getElementsByTagName('figure')
    if(item && item.length>0){
      var link = item.length
      var title = item[0].getElementsByClassName('origin_image')[0].getAttribute('data-src')
      return {
        link,
        title,
        y,
      }
    }
    return {}
  })

  let word;
  await client.generalBasicUrl(result.title).then(function(data) {
    console.log('----url----')
    // console.log(JSON.stringify(data));
    word = data;
    return data;
  }).catch(function(err) {
      // 如果发生网络错误
      console.log(err);
  });
  console.log(word.words_result)
  browser.close()
  console.log('result')
  process.send(result)
  process.exit()
})()
