const qiniu = require('qiniu')
const nanoid = require('nanoid')
const config = require('../config/qiniu')

const bucket = config.qiniu.bucket
const mac = new qiniu.auth.digest.Mac(config.qiniu.AK, config.qiniu.SK);
const cfg = new qiniu.conf.Config()
var client = new qiniu.rs.BucketManager(mac, cfg);

module.exports = uploadToQiniu = async (url, key) => {
  return new Promise((resolve,reject) => {
    client.fetch(url, bucket, key, (err, respBody, respInfo) => {
      if (err) {
        reject(err);
        //throw err;
      } else {
        if (respInfo.statusCode == 200) {
          // console.log(respBody.key);
          // console.log(respBody.hash);
          // console.log(respBody.fsize);
          // console.log(respBody.mimeType);
          resolve({key})
        } else {
          reject(err);
        }
      }
    });
  })
}

// ;(async () => {
//   let pic = [{
//     word: '你甚至还不认识我我有一辈子可以认识你',
//     link: 'https://pic2.zhimg.com/80/v2-74cc28678ce988b2ec7f913dc22653d5_hd.jpg',
//   }]
//   pic.map(async item => {
//     if(item.link && !item.key){
//       try{
//         console.log('开始传图片')
//         let pickey = await uploadToQiniu(item.link, nanoid() + '.jpg')
//         if(pickey.key){
//           item.key = pickey.key;
//         }
//         console.log('---success---')
//         console.log(item)
//       }catch(err){
//         console.error(err)
//       }
//     }
//   })
// })()