import React from 'react';
import { connect } from 'dva';
import { Button, Form, Input, Checkbox, InputNumber, Radio, Switch, Icon, message } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
import _ from 'lodash'
let uuid = 1;

class ItemForm extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }
  componentWillReceiveProps(nextProps){
    if(_.isEqual(this.props.fields, nextProps.fields) && _.isEqual(this.props.data, nextProps.data)){
      const { updateData, data } = this.props;
      const values = nextProps.form.getFieldsValue();
      const fields = _.cloneDeep(this.props.fields);
      //重组fields值
      fields.map((item)=>{
        if(item.status === 1){
          item.is_require = values.is_require?1:0;
          item.title = values.title;
          item.placeholder = values.placeholder;
          const type_extends = []
          if(data.type === 4){
            values.keys.map((child,i)=>{
              type_extends.push({
                option_name:values.option_name[i] || '',
              })
            })
            item.type_extends = type_extends;
          }else if ( data.type === 3 && data.ratio !== undefined){
            item.ratio = values.ratio;
          }
        }
      })
      updateData(fields);
    }else{
      this.props.form.resetFields();
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
  // 检验数据
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  render(){
    const { data } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    let formItems;
    if(data.type == 4){
      getFieldDecorator('keys', { initialValue: [...data.type_extends.keys()] });
      const keys = getFieldValue('keys');
      formItems = keys.map((k, index) => {
        return (
          <div className='form_item' key={k}>
            {getFieldDecorator(`option_name[${k}]`, { 
              validateTrigger: ['onChange', 'onBlur'],
              initialValue: data.type_extends[k] ? data.type_extends[k].option_name : '',
            })(
              <Input placeholder="请输入" className='item_input' style={{width: 180}}/>
            )}
            <span className='item_icon' onClick={() => this.remove(k)}>删除</span>
          </div>
        );
      });
    }
    return(
      <div>
        <Form layout='vertical'>
          <p className='title'>
            <span className='title_name'>排序控件属性</span>
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
            label="填写提示"
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
            (data.type === 3 && data.ratio !== undefined) &&
            <div style={{marginBottom:15}}>
              <span>题目分数:
                {getFieldDecorator(`ratio`, { initialValue: data.ratio || 0, })(
                <InputNumber min={0} max={100} style={{marginLeft:8}}/>
                )}
              </span>
            </div>
          }
          {
            data.type == 4 &&
            <div>
            <div className='step3_form'>
              <p className='form_title'>
                <span style={{width: 110}}>选项文字</span>
                <span>操作</span>
              </p>
              {formItems}
            </div>
            <Button type="dashed" onClick={this.add} style={{marginTop:'10px'}}>
              <Icon type="plus" />添加选项
            </Button>
            </div>
          }
        </Form>
      </div>
    )
  }
}

export default Form.create()(ItemForm);