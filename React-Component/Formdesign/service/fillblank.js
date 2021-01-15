import React from 'react';
import { connect } from 'dva';
import { Form, Input, Radio, Icon, Button, Checkbox, Row, Col } from 'antd';
import _ from 'lodash'
import '../design.less';

const RadioGroup = Radio.Group;
class Itemform extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            colorType: 1,
        }
    }
    color = (index,data) => {
        const { datas,updateData } = this.props;     
        datas.map((item,i)=>{
            if(index == i){
                item.status = 1
            }else{
                item.status = 0
            }
        })
        updateData(datas)
    }
    delone = (index) => {
        const { datas, updateData } = this.props;
        datas.splice(index, 1)
        updateData(datas)
    }
    render(){
        const boderColor = {
            border: '2px dashed #1089ee',
        }
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
          };
        const radioStyle_fill = {
            display: 'block',
            height: '60px',
            lineHeight: '30px',
          };
        const borderStyle = {border:'2px dashed #1089ee'}
        const { text, index, data } = this.props;
        return(
        <div>
            <div className='form_content' style={data.status == 1 ? boderColor : null} onClick={(e)=>{e.preventDefault();this.color(index, data)}} >
                <Icon type="close-circle-o" className='form_icon' onClick={(e)=>{e.stopPropagation();this.delone(index)}}/>
                <p className='form_title'>
                    <span className='form_star'>{data.is_require === 1 ? '*': null}</span>
                    <span>{index+1}.</span>
                    <span className='form_name'>{text}</span>
                    <span>{data.type === 3 ? '【填空题】':'【排序题】'}</span>
                </p>
                {
                  data.type === 3 &&
                  <Input disabled style={{ width: 300, marginLeft: 20}}/>
                }
                {
                  data.type_extends && 
                  <RadioGroup>
                    {data.type_extends.map((item,i)=>{
                        return (
                            <Radio style={item.is_fill === 1?radioStyle_fill:radioStyle} value={false} key={i}>
                            <span>{item.option_name}</span>
                            {item.is_fill === 1&&
                                <div style={{marginLeft: 20}}>
                                {item.fill_require === 1 &&
                                <span className='form_star'>*</span>}
                                    <Input disabled size='small' style={{ width: 100}}/>
                                </div>}
                            </Radio>
                        )
                    })}
                </RadioGroup>
                }
                
            </div>
        </div>
        )
    }
}

export default Itemform;