const puppeteer = require('puppeteer') 

const base = 'https://www.zhihu.com/question/55080074'

const client = require('./baidu');
const nanoid = require('nanoid')
const uploadToQiniu = require('./qiniu')

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

  await autoScroll(page);
  
  const result = await page.evaluate(() => {
    // var y = window.scrollY;
    var AllData = []
    var AllNode = window.document.getElementsByTagName('figure')
    if(AllNode && AllNode.length>0){
      for(let i=0; i<AllNode.length; i++){
        var picId = i + 1
        var it = AllNode[i]
        if(it.getElementsByClassName('VagueImage')[0] !== undefined){
          var link=it.getElementsByClassName('VagueImage')[0].getAttribute('data-src')
        }else if(it.getElementsByTagName('img')[0] !== undefined){
          var link=it.getElementsByTagName('img')[0].getAttribute('src')
        }else{
          var link=''
          continue;
        }
        AllData.push({
          link,
          picId,
        })
      }
      return AllData;
    }
    return {}
  })

  for(let i=0; i<result.length; i++){
    var item = result[i]
    try{
      var word = [];
      console.log('开始解析图片')
      word = await client.generalBasicUrl(item.link).then(function(data) {
        if(data.words_result && data.words_result.length>0){
          data.words_result.map(item => word.push(item.words))
        }
        return word;
      }).catch(function(err) {
          console.log(err); // 如果发生网络错误
      })
      item.word = word.join(',');
      console.log(item.word)
      console.log('开始传图片')
      var pickey = await uploadToQiniu(item.link, nanoid() + '.jpg')
      if(pickey.key){
        item.href = pickey.key;
      }
      console.log(item.href)
    }catch(err){
      console.error(err)
    }
  }
  // result.map((item) => {
  //   try{
  //     var word = [];
  //     console.log('开始解析图片')
  //     word = await client.generalBasicUrl(item.link).then(function(data) {
  //       if(data.words_result && data.words_result.length>0){
  //         data.words_result.map(item => word.push(item.words))
  //       }
  //       return word;
  //     }).catch(function(err) {
  //         console.log(err); // 如果发生网络错误
  //     })
  //     item.word = word.join(',');
  //     console.log('开始传图片')
  //     var pickey = await uploadToQiniu(item.link, nanoid() + '.jpg')
  //     if(pickey.key){
  //       item.href = pickey.key;
  //     }
  //   }catch(err){
  //     console.error(err)
  //   }
  //   return item
  // })
  


  // uploadToQiniu
  // let word = [];
  // await client.generalBasicUrl(result.title).then(function(data) {
  //   // console.log('----url----')
  //   // console.log(data)
  //   if(data.words_result && data.words_result.length>0){
  //     data.words_result.map(item => word.push(item.words))
  //   }
  //   return word;
  // }).catch(function(err) {
  //     // 如果发生网络错误
  //     console.log(err);
  // });
  // console.log(word.join(','))
  // console.log(word)
  browser.close()
  // console.log('result')
  process.send(result)
  process.exit()
})()
