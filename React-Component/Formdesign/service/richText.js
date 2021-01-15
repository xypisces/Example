import React from 'react';
import { connect } from 'dva';
import { Form, Input, Radio, Icon, Button, Checkbox, Row, Col } from 'antd';
import CKEditor from "react-ckeditor-wrapper";
import LzEditor from 'react-lz-editor'
import _ from 'lodash'
import '../design.less';
const { TextArea } = Input;
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
                    <span>【富文本】</span>
                </p>
                {/* <CKEditor
                  config={{
                    height: 100,
                    readOnly: true,
                    toolbar: 'Basic',
                    filebrowserImageUploadUrl: '/home/media/upload',
                    removeDialogTabs: 'image:advanced;link:advanced',
                  }}
                  value={data.content || ''}
                  onClick={(e)=>{e.stopPropagation()}}
                  onChange={null}
                  scriptUrl={'http://219.222.189.166:1550/ckeditor/ckeditor.js'}
                /> */}
                {/* <div style={{height:250, overflow: 'hidden'}}>
                    <LzEditor disabled
                    cbReceiver={()=>{return null}}
                    active={true}
                    fullScreen={false}
                    importContent={data.content || ''}/>
                </div> */}
                <TextArea rows={4} defaultValue={data.content || ''} disabled/>
            </div>
        </div>
        )
    }
}

export default Itemform;