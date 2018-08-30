const cp = require('child_process')
const { resolve } = require('path')
const { connect, initSchema } = require('../mongo/database/init')
const mongoose = require('mongoose')

;(async() => {
  const script = resolve(__dirname, './zhihu.js')
  const child = cp.fork(script, [])
  let invoked = false

  await connect()
  initSchema()

  child.on('error', err => {
    if(invoked) return
    invoked = true
    console.log(err)
  })

  child.on('exit', code => {
    if(invoked) return
    invoked = true
    let err = code === 0 ? '脚本结束' : new Error('exit code' + code)
    console.log(err)
  })

  child.on('message', data => {
    // let result = data.result;
    // console.log(data)
    console.log('进行数据入库...')
    const Pic = mongoose.model('Pic')
    // const pic = new Pic()
    if(data && data.length > 0){
      Pic.create(data).then(()=>{
        console.log('--入库完毕---')
      })
      // data.map((item) => {
      //   pic.picId = item.picId
      //   pic.word = item.word
      //   pic.link = item.link
      //   pic.href = item.href
      //   pic.save().then((data)=>{
      //     console.log(`${data.picId} is save`)
      //   })
      // })
    }
  })
})()