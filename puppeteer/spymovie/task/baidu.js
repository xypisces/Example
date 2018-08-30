var AipOcrClient = require("baidu-aip-sdk").ocr;

// 设置APPID/AK/SK
var APP_ID = "11693465";
var API_KEY = "FLLo2Z85OYPswwLi4RgqOoG6";
var SECRET_KEY = "TS2fza1Bn9TMTKW7GuHvP6ZSPrZ73xjO";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipOcrClient(APP_ID, API_KEY, SECRET_KEY);

// 调用通用文字识别, 图片参数为远程url图片
// module.exports = function getWord(url){
//   // var url = "https://pic2.zhimg.com/80/v2-74cc28678ce988b2ec7f913dc22653d5_hd.jpg";
//   let data;
//   client.generalBasicUrl(url).then(function(result) {
//     console.log('----url----')
//     console.log(JSON.stringify(result));
//     data = JSON.stringify(result);
//     return data;
//   }).catch(function(err) {
//       // 如果发生网络错误
//       console.log(err);
//   });
// }

module.exports = client;






