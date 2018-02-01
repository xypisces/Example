import React from 'react'
import { Input, Button, message } from 'antd';
import './home.less';

const { TextArea } = Input;
class Comment extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      comment: '',
    }
  }
  componentDidMount(){
    const name = window.localStorage.getItem('inputname')
    if(name){
      this.setState({
        username: name,
      })
      this.refs.textarea.focus();
    }else{
      this.refs.textinput.focus();
    }
  }
  areachange = (e) => {
    this.setState({
      comment: e.target.value,
    })
  }
  inputchange = (e) => {
    this.setState({
      username: e.target.value,
    })
  }
  savename = (e) => {
    window.localStorage.setItem('inputname', e.target.value)
  }
  submit = () => {
    if(!this.state.username){
      message.info('请输入用户名')
    } else if(!this.state.comment) {
      message.info('请输入用户评论')
    } else {
      this.props.onsubmit(this.state.username,this.state.comment)
    }
  }
  render() {
    return(
      <div className='home_content'>
        <div className='home_div'>
          <p className='home_p'>用户名：</p>
          <Input
            ref='textinput'
            className="home_input"
            onBlur={this.savename}
            value={this.state.username}
            onChange={this.inputchange} />
        </div>
        <div className='home_div'>
          <p className='home_p'>评论内容：</p>
          <TextArea ref='textarea' rows={4} className="home_input" value={this.state.comment} onChange={this.areachange}/>
        </div>
        <Button type="primary" className='home_btn' onClick={this.submit}>提交</Button>
      </div>
    )
  }
}

export default Comment;