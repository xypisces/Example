import React from 'react'
import { connect } from 'dva'
import { Button, Input } from 'antd';
import { routerRedux } from 'dva/router'
import './admin.less'
const Search = Input.Search;

class User extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      time:1,
    }
    console.log('constructor')
  }
  componentWillMount() {
    console.log('willmount')
  }
  componentDidMount() {
    this.props.dispatch({ type: 'example/getRandom', payload:{} })
    this.setState({
      time: 2,
    })
    console.log('didmount')
  }
  componentWillReceiveProps(nextProps){
    console.log('willrec', nextProps)
  }
  shouldComponentUpdate(nextProps, nextState){
    console.log('shouldcom',nextProps,nextState)
    return true
  }
  componentWillUpdate() {
    console.log('willupdate')
  }
  componentDidUpdate() {
    console.log('didupdate')
  }
  random = () => {
    this.props.dispatch({ type: 'example/getRandom', payload:{} })
  }
  oneClick = (time) => {
    if(time){
      this.props.dispatch({ type: 'example/getoneDay', payload:{ date: time, } })    
    }else{
      this.props.dispatch({ type: 'example/getRandom', payload:{} })      
    }
  }
  render() {
    const data = this.props.random.data?this.props.random.data:{};
    console.log('this is render');
    return(
      <div>
        <Button type="primary" onClick={this.random} >随机来一篇</Button>
        <Search
          style={{ width: '300px', marginLeft: '20px'}}
          placeholder="input search text"
          onSearch={(value) => {this.oneClick(value)}}
          enterButton
        />
        <h1>{data.title}</h1>
        <h2>{data.author}</h2>
        <h3>{data.date?data.date.curr:null}</h3>
        <div dangerouslySetInnerHTML={{__html: data.content}} />
      </div>
    )
  }
}

export default connect((state) => {
    return {
      random: state.example.random,
    }
})(User)