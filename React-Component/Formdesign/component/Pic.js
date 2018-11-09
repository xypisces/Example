import React from 'react';
import { connect } from 'dva';
import { getAuthInfo } from '../../../../utils/AppStorage';
import { Upload, Button, Form, Input, Checkbox, InputNumber, Radio, Switch, Icon, message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import _ from 'lodash'
let uuid = 1;

class FormRadio extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      fileList: [],
      filemsg: []
    }
  }
  componentWillReceiveProps(nextProps){
    if(_.isEqual(this.props.fields, nextProps.fields) && _.isEqual(this.props.data, nextProps.data)){
      const { updateData } = this.props;
      const values = nextProps.form.getFieldsValue();
      const fields = _.cloneDeep(this.props.fields);
      fields.map((item)=>{
        if(item.status === 1){
          if(item.type === 7){
            item.max_option_num = values.max_option_num
            item.min_option_num = values.min_option_num
          }
          item.is_look = values.is_look?1:0;
          item.is_require = values.is_require?1:0;
          item.title = values.title;
          item.placeholder = values.placeholder;
          const type_extends = []
          if(values.keys.length>0){
            values.keys.map((child,i)=>{
              const img_param = {}
              if(values.img_upload && values.img_upload[i]){
                if(values.img_upload[i][0]){
                  const res = values.img_upload[i][0].response
                  if(res && res.code === 200){
                    img_param.img_id = Number(res.info.id)
                    img_param.url = res.info.url
                  }
                }
              }
              type_extends.push({
                img_desc:values.img_desc ? values.img_desc[i] : '',
                img_name: values.img_name ? values.img_name[i] : '',
                img_url: values.img_upload ? values.img_upload[i]: [],
                ...img_param,
              })
            })
          }
          item.type_extends = type_extends;
        }
      })
      updateData(fields);
    }else{
      if(this.props.data.type !== nextProps.data.type){
        this.props.form.resetFields();
      }
    }
  }
  // 动弹添加删除
  add = () => {
    const { form, data } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    uuid = keys.length;
    const nextKeys = keys.concat(uuid);
    uuid++;
    // can use data-binding to set
    // important! notify form to detect changes
    form.setFieldsValue({
      keys: nextKeys,
    });
  }
  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    // We need at least one passenger
    if (keys.length === 1) {
      message.info('至少需要一个选项')
      return;
    }
    // can use data-binding to set
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }
  normFile = (id,e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList.slice(-1);
  }
  render(){
    // console.log(this.state);
    const fileprop = {
      name: 'file',
      action: '/home/media/upload',
      listType: 'picture-card',
      method: 'POST',
      showUploadList: {
        showPreviewIcon: false
      },
      headers: {
        authorization: getAuthInfo(),
      },
    }
    const { data } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    getFieldDecorator('keys', { initialValue: [...data.type_extends.keys()] });
    const max_num = getFieldValue('max_option_num') || 1;
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <div className='pic_content' key={k}>
          <FormItem label="图片名称" className='pic_item'>
            {getFieldDecorator(`img_name[${k}]`, {
              initialValue: data.type_extends[k] ? data.type_extends[k].img_name : '',
            })(
              <Input placeholder="请输入图片名称" />
            )}
          </FormItem>
          <FormItem label="图片简介" className='pic_item'>
            {getFieldDecorator(`img_desc[${k}]`, {
              initialValue: data.type_extends[k] ? data.type_extends[k].img_desc : '',
            })(
              <Input placeholder="请输入填写图片简介" />
            )}
          </FormItem>
          <FormItem
            label={null}
            className='pic_item'
            extra="支持扩展名：jpg，png... 规格大小: 200x200px"
           >
          {getFieldDecorator(`img_upload[${k}]`, {
            valuePropName: 'fileList',
            getValueFromEvent: this.normFile.bind(this, k),
            initialValue:  data.type_extends[k] ? data.type_extends[k].img_url : [],
          })(
            <Upload {...fileprop} >
                <Icon type="upload" />上传图片
            </Upload>
          )}
          </FormItem>
          <span className='item_icon' onClick={() => this.remove(k)}>删除此选项</span>
        </div>
      );
    });
    return(
      <div>
        <Form layout='vertical'>
          <p className='title'>
            <span className='title_name'>单选控件属性</span>
            <span style={{fontSize:14, display:'flex',alignItems:'center'}}>            
              {getFieldDecorator(`is_require`, { 
                valuePropName: 'checked',
                initialValue: data.is_require == 1,
              })(
                <Switch className='item_switch' style={{ marginRight: '10px'}}/>
              )}
              <span>是否必填</span>
            </span>
          </p>
          <FormItem
            label="名称"
          >
            {getFieldDecorator('title', {
              initialValue: data.title || '',
              rules: [{ 
                message: '请正确填写' 
              }],
            })(
              <Input placeholder="请输入名称" />
            )}
          </FormItem>
          <FormItem
            label="备注"
          >
            {getFieldDecorator('placeholder', {
              initialValue: data.placeholder || '',
              rules: [{ 
                message: '请正确填写' 
              }],
            })(
              <Input placeholder="请输入填写提示" />
            )}
          </FormItem>
          {
            data.type === 7 &&
            <div style={{marginTop:15}}>
              <span>最少选
                {getFieldDecorator(`min_option_num`, { initialValue: data.min_option_num || 0, })(
                <InputNumber min={0} max={max_num - 1} style={{marginLeft:8}}/>
                )}项，
              </span>
              <span>最多选
                {getFieldDecorator(`max_option_num`, { initialValue: data.max_option_num || 0, })(
                <InputNumber min={0} max={data.type_extends.length} style={{marginLeft:8}}/>
                )}项
              </span>
            </div>
          }
          <p style={{ marginTop: '20px' }}>
            <span>
              {getFieldDecorator(`is_look`, { 
                valuePropName: 'checked',
                initialValue: data.is_look == 1,
              })(
                <Switch  className='item_switch' style={{ marginRight: '10px'}}/>
              )}
              <span>允许查看选择结果</span>
            </span>
          </p>
          <div className='step3_form'>
            {formItems}
          </div>
          <Button type="dashed" onClick={this.add} style={{marginTop:'10px'}}>
            <Icon type="plus" />新增图片选项
          </Button>
        </Form>
      </div>
    )
  }
}


export default Form.create()(FormRadio);