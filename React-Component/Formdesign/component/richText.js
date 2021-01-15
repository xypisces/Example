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
      const { updateData } = this.props;
      const values = nextProps.form.getFieldsValue();
      const fields = _.cloneDeep(this.props.fields);
      //重组fields值
      fields.map((item)=>{
        if(item.status === 1){
          item.content = values.content;
        }
      })
      updateData(fields);
    }else{
      this.props.form.resetFields();
    }
  }
  render(){
    const { data } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;
    return(
      <div>
        <Form layout='vertical'>
          <p className='title'>
            <span className='title_name'>富文本控件属性</span>
          </p>
          <FormItem
            label="内容"
          >
            {getFieldDecorator('content', {
              initialValue: data.content || '',
              rules: [{ 
                message: '请正确填写' 
              }],
            })(
              <Input placeholder="请输入" />
            )}
          </FormItem>
        </Form>
      </div>
    )
  }
}

export default Form.create()(ItemForm);