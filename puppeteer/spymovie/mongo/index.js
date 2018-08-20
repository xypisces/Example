const Koa = require('koa')
// const views = require('koa-views')
const { resolve } = require('path')
// import { connect } from './database/init'
const { connect } = require('./database/init')

;(async () => {
  await connect()
})()

const app = new Koa()

app.use(async (ctx, next) => {
  ctx.body = 'hello world'
})

app.listen(4455,()=>{
  console.log('koa is listening at 4455')
})