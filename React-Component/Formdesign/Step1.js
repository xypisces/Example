import React from 'react';
import { connect } from 'dva';
import { Button } from 'antd';
import './design.less';

class Step1 extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  drop = (type) => {
    this.props.add(type)
    // this.props.dispatch({
    //   type: 'formdesign/add',
    //   payload: {
    //     type,
    //   }
    // })
  }
  render(){
    const { btnArr } = this.props;
    return(
      <div className='d_step1'>
        <p className='step1_title'>请在下方点击对应标签，然后在服务设计区点击进行操作</p>
        <div>
          {btnArr && btnArr.map((item,i)=>{
            return(
              <Button key={i} className='step_btn' icon={item.icon} onClick={this.drop.bind(this,item.type)} style={item.style}>
                {item.name}
              </Button>
            )
          })}
        </div>
      </div>
    )
  }
}

export default connect()(Step1);