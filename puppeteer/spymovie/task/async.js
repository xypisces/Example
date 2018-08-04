
const dosync = (sth, time) => new Promise(resolve => {
  setTimeout(()=>{
    console.log(sth + '用了' + time + '毫秒')
    resolve()
  },time)
})

const doasync = (sth, time, cb) => {
  setTimeout(()=>{
    console.log(sth + '用了' + time + '毫秒')
    cb && cb()
  },time)
}

const Xw ={dosync,doasync}
const Lw ={dosync,doasync}

;(async () => {
  console.log('case1: 小王去卫生间')
  await Lw.dosync('老王在刷牙', 1000)
  console.log('小王等老王刷完牙')
  await Xw.dosync('小王拉屎', 2000)
  console.log('小王拉完屎了')

  console.log('case2: 小王又去卫生间')
  Lw.doasync('老王在刷牙', 1000, ()=> {
    Xw.doasync('小王拉屎', 2000)
  })
  console.log('小王刷知乎')
})()