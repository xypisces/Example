// 用于两个系统之间的登录跳转
// route.js
const flag = window.localStorage.getItem('auth')
const checkauth = () => {
  const token = window.localStorage.getItem('auth')
  if(token){
    return <Redirect to="/class-management/list?page=1"></Redirect>
  }else{
    return null;
  }
}
// model.js
export default{
  subscriptions: {
    setup({ dispatch, history }) { 
        return history.listen(({ pathname }) => {
            const href = window.location.href;
            const temp = href.split('token=')
            if(temp[1]){
                window.localStorage.setItem('auth', temp[1]);
                dispatch({ type: 'fetchUserInfo' });
                console.log('userinfotest')
            }else{
                const token = window.localStorage.getItem('auth')
                if(token){
                     dispatch({ type: 'fetchUserInfo' });
                     console.log('success')
                }else{
                    window.location.href = '/admin/sports/Login/login';
                }
            }
        })
    },
  }
}

// 倒计时函数
checkTime = (val) => {
  if(val<10){
    return `0${val}`
  }else{
    return val;
  }
}
getTime = (val) => {
  const t = new Date(val) - Date.parse(new Date());
  const seconds = this.checkTime(Math.floor((t / 1000) % 60)) // 获取描述
  const minutes = this.checkTime(Math.floor((t / 1000 / 60) % 60)) // 获取分钟
  const hours = this.checkTime(Math.floor(t / (1000 * 60 * 60 * 24 ))) //获取时间包括天数
  // const hours = Math.floor((t / (1000 * 60 * 60)) % 24)
  // const days = Math.floor(t / (1000 * 60 * 60 * 24 ))
  if(t<0){
    this.setState({
      arr: ['00','00','00']
    })
    window.clearInterval(Time)
  }else{
    this.setState({
      arr: [`${hours}`,`${minutes}`,`${seconds}`]
    })
  }
}