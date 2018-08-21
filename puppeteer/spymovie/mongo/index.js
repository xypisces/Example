const Koa = require('koa')
// const views = require('koa-views')
const { resolve } = require('path')
const mongoose = require('mongoose')
const { connect, initSchema } = require('./database/init')


;(async () => {
  await connect()
  initSchema()
  const Pic = mongoose.model('Pic')
  const arr = [{picId:2,word:'nmpp',link:'asd'},{picId:3,word:'nmp1p',link:'as1d'}]
  Pic.create(arr).then((data)=>{
    console.log(data)
    console.log('data is save')
  })
  // const pic = new Pic()
  // pic.picId = 1
  // pic.word = '你甚至还不认识我我有一辈子可以认识你'
  // pic.link = 'v2-74cc28678ce988b2ec7f913dc22653d5_hd.jpg'
  // pic.save().then((data)=>{
  //   console.log(`${data.picId} is save`)
  // })
})()

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'hello world'
})

app.listen(4455,()=>{
  console.log('koa is listening at 4455')
})