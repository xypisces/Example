import React from 'react';
import { Button, Col, Table, Input, Alert, Checkbox, Form, DatePicker, Select, } from 'antd';
import './media.less';

const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
/**
 * formSetting --- form自身配置
 * childStyle --- 控件通用className
 * itemStyle --- formItem通用className
 * formChild --- 用于渲染的formitem
 * - itemOptions --- formitem的自身配置
 * - value --- 属性值
 * - fieldOptions --- filed的配置项
 * - required --- 是否必填
 * - type --- 控件类型
 * - childOptions --- 控件自身属性
 * -- mapOptions --- 控件子元素自身属性
 */
export default class BaseForm extends React.Component{
  render(){
    const { getFieldDecorator } = this.props.form;
    const { formSetting={}, formChild=[], childStyle=null, itemStyle=null } = this.props;
    return (
      <Form {...formSetting}>
        {formChild && formChild.map((item,i)=>{
          const { itemOptions={}, value=i, fieldOptions={}, message=undefined, required=true, type='input', childOptions={},
        mapOptions=[]} = item;
          let child;
          switch(type){
            case 'input':
              child = (<Input className={childStyle} placeholder={message || `请输入${itemOptions.label}`} {...childOptions}/>)
              break;
            case 'datepicker':
              child = (<DatePicker {...childOptions} />)
              break;
            case 'checkbox':
              child = (<CheckboxGroup {...childOptions} />)
              break;
            // case 'select':
            //   child = (<Select {...childOptions}>
            //               {childOptions.options.map((item,i)=>{
            //                 return (
            //                   <Option value={item} key={i} {...mapOptions[i]}>{item}</Option>
            //                 )
            //               })}
            //             </Select>)
            //   break;
            case 'textarea':
              child = (<TextArea {...childOptions} />)
              break;
            default:
              child = (<span>no match anything</span>)
              break;
          }
          if(type === 'select'){
            return (
              <FormItem
                key={i}
                className={itemStyle}
                {...itemOptions}
                >
                {getFieldDecorator(`unit`, {
                  rules: [{
                    required: required, 
                    message: message || `请输入${itemOptions.label}`,
                  }],
                  ...fieldOptions,
                })(
                  <Select {...childOptions}>
                    {childOptions.options.map((item,i)=>{
                      return (
                        <Option value={item} key={i} {...mapOptions[i]}>{item}</Option>
                      )
                    })}
                  </Select>
                )}
              </FormItem>
            )
          }
          return (
            <FormItem
              key={i}
              className={itemStyle}
              {...itemOptions}
              >
              {getFieldDecorator(`${value}`, {
                rules: [{
                  required: required, 
                  message: message || `请输入${itemOptions.label}`,
                }],
                ...fieldOptions,
              })(
                child
              )}
            </FormItem>
          )
        })}
      </Form>
    )
  }
}