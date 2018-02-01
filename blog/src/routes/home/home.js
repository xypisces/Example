import React from 'react'
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Input, Button } from 'antd';
import Comment from './comment'
import List from './list'
import './home.less';

const { TextArea } = Input;
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      commentlist: []
    }
  }
  formateDate = () => {
    const date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    if(month < 10) {
        month = '0' + month
    }
    if (day < 10) {
        day = '0' + date
    }
    return `${year}-${month}-${day}`;
  }
  onsubmit = (name, comment) => {
    const data = this.formateDate()
    this.state.commentlist.push({
      username: name,
      comments: comment,
      time: data,
    })
    this.setState({})
  }
  delete = (index) => {
    this.state.commentlist.splice(index,1)
    this.setState({})
  }
  render() {
    return(
      <div>
        <Comment onsubmit={this.onsubmit}/>
        <List
          delete = {this.delete} 
          commentlist={this.state.commentlist}/>
      </div>
    )
  }
}

export default connect()(Home);