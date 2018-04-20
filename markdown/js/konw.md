### 全局登录认证

因为系统需要从另一个系统进行登录认证，解决办法是登录后重定向url地址并返回token数据，然后携带token进行发起请求，判断用户是否登录。

dva中subscriptions函数可以监听url变化，在进入系统时，先判断地址栏是否有token,有的话则存起来，没有的话则重定向到登录地址，然后在route进行渲染时再进行重定向到具体页面

```js
setup({ dispatch, history }) { 
    return history.listen(({ pathname }) => {
        const href = window.location.href;
        const temp = href.split('token=')
        if(temp[1]){
            window.localStorage.setItem('auth', temp[1]);
        }else{
            const token = window.localStorage.getItem('auth')
            if(token){
                console.log('success login')
            }else{
                window.location.href = '/admin/sports/Login/login';
                // console.log('fail')
            }
        }
    })
},
```
```js
 const checkauth = () => {
    const token = window.localStorage.getItem('auth')
    if(token){
      return <Redirect to="/class-management/list?page=1"></Redirect>       
    }else{
      return null;
    }
  }
  <Route render={checkauth}/>
```