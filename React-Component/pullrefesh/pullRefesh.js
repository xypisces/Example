import React from 'react';
import _ from 'lodash';
import { ActivityIndicator } from 'antd-mobile';


/**
 *
 * callback  下拉加载需要执行的函数 -- 必须是promise函数
 * stopLoading  停止下拉加载的行为
 */
class Pullrefesh extends React.Component{
  state = {
    loading: false,
  }
  checkScroll =  _.throttle(() => {
    const pageYOffset = window.pageYOffset
    const innerHeight = window.innerHeight
    const scrollHeight = window.document.documentElement.scrollHeight
    if(pageYOffset+innerHeight >= scrollHeight){
      const { stopLoading=false, callback=undefined } = this.props;
      const { loading } = this.state;
      if(!callback){
        return true //判断有没有触发函数
      }
      if(stopLoading){
        return true // 判断是否停止下拉
      }
      if(loading){
        return true; // 判断是否正在请求
      }
      this.setState({
        loading: true,
      },()=>{
        callback().then(()=>{
          this.setState({
            loading: false,
          })
        })
      })
    }
  }, 300)
  componentDidMount(){
    window.addEventListener('scroll', this.checkScroll);
  }

  componentWillUnmount(){
    window.removeEventListener('scroll', this.checkScroll);
  }

  render(){
    const styles = {
      refesh_loading:{
        marginTop: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }
    }
    const { loading=false } = this.state;
    if(loading){
      return(
        <div>
          <div style={styles.refesh_loading}>
            <ActivityIndicator />
            <span style={{ marginLeft: 15, color:'gray', fontSize: 28 }}>加载中...</span>
          </div>
        </div>
      )
    }else{
      return null;
    }
  }
}

export default Pullrefesh