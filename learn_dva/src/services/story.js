import request from '../utils/request';
// import { getAdminInfo } from '../utils/AppStorage';

// export async function getArticle(param) {
//   return request('/api/article/random?dev=1', {
//     method: 'POST',
//     headers: new Headers({
//       'Content-Type': 'application/json; charset=utf-8',
//       // authorization: getAdminInfo(),
//     }),
//     body: JSON.stringify(param),
//   });
// }

// get 请求
export async function getArticle(param) {
    return request('/api/article/random?dev=1');
  }