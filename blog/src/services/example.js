import request from '../utils/request';

export function query() {
  return request('/api/users');
}

// export async function getIssues(param) {
//   return request('https://api.github.com/repos/tmallfe/tmallfe.github.io/issues', {
//     method: 'GET',
//     headers: new Headers({
//       'Content-Type': 'application/json; charset=utf-8',
//     }),
//     // body: JSON.stringify(param),
//   });
// }
export async function getIssues(param) {
  return request('/repos/tmallfe/tmallfe.github.io/issues');
}