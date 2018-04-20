### 本地缓存策略（localStorge)

首页中几个请求里，展示数据不需要每次都请求一遍数据，所以做本地缓存，根据后台的缓存时间进行判断更新请求

- 新建时间戳加上缓存时间，以及数据做本地缓存
- 每次进到页面进行过期时间的校验

```js
// 设置过期时间
export const saveNewestTime = (str,info) => {
  const t = setTime(info)
  window.localStorage.setItem(str, t);
};

// 校验过期时间
export const getNewestTime = (str) => {
  if (window.localStorage.getItem(str) == null) {
    return 0;
  } else {
    const countTime = Number(window.localStorage.getItem(str));
    // setInterval("this.dealTime(countTime)", 1000);
    const Now = Date.now()
    if(Now >= countTime) {
      return 0;
    }else{
      return 1;
    }
  }
};

// 时间格式化处理
export const setTime = (time) => {
  const t = Date.now()
  const m = Number(time) * 1000
  const result = t + m;
  return result;
}
```
- 如果没有过期，将本地数据通过model存起来
- 如果过期就重新发起请求

```js
 if (getIndexInfo('NewestData') === '' || Number(getNewestTime('NewestTime')) === 0) {
      this.props.dispatch({ type: 'indexInfo/getNewest', payload: { page: 0, page_rows: 24 } });
    } else {
      this.props.dispatch({ type: 'indexInfo/save', payload: { newestData: JSON.parse(getIndexInfo('NewestData')) } });
    }
```