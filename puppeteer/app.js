const puppeteer = require('puppeteer');

async function sleep(){
  await setTimeout(()=>{
    console.log('wait')
  },3000)
}

(async () =>{
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('https://mp.weixin.qq.com/')
  await sleep()
  await page.screenshot({path: 'new.png'})
  await page.pdf({path: 'b.pdf', format: 'A4'})
  console.log('success~')
  await browser.close();
})();