import React from 'react';
import { Button, Input, Select, DatePicker, Upload } from 'antd';
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
const Option = Select.Option;
const Search = Input.Search;

/**
 *
 * addHandle -- 添加按钮方法以及是否显示
 * delHandle -- 删除按钮方法以及是否显示
 * clearHandle -- 清空按钮方法以及是否显示
 * selectName -- 筛选名称
 * selectChange -- 筛选方法
 * selectData -- 筛选数据
 * selectWidth -- 筛选框宽度，默认为120
 * searchHandle -- 搜索方法
 * searchHolder -- 搜索提示语
 * searchWidth -- 搜索框宽度 默认为250
 * TimeValue -- 筛选时间初始值，不传默认为空
 * TimeChange -- 筛选时间更改方法
 * importHandle -- 导入方法 // 已删除
 * upload_data -- 导入参数
 * exportHandle -- 导出方法
 */
const dateFormat = 'YYYY-MM-DD';
function Head(props){
  return(
    <header className='header'>
      <div>
        {
          props.addHandle &&
          <Button type="primary" className='x_btn' onClick={props.addHandle}>添加</Button>
        }
        {
          props.delHandle &&
          <Button type="danger" className='x_delbtn' onClick={props.delHandle}>删除</Button>
        }
        {
          props.clearHandle &&
          <Button type="danger" className='x_delbtn' onClick={props.clearHandle}>清空</Button>
        }
      </div>
      <div>
        {
          props.selectName &&
          <span>{props.selectName}</span>
        }
        {
          props.selectChange &&
          <Select
            dropdownMatchSelectWidth={false}
            className='x_select' defaultValue="" style={{ width: props.selectWidth ? props.selectWidth : 120 }} onChange={props.selectChange}>
          <Option value="">全部</Option>
          {
            props.selectData && props.selectData.map((item,i)=>{
              return(
                <Option value={item} key={i}>{item}</Option>
              )
            })
          }
        </Select>
        }
        {
          props.TimeChange &&
          <RangePicker
            className='x_select'
            defaultValue={props.TimeValue ? [moment(props.TimeValue[0], dateFormat), moment(props.TimeValue[1], dateFormat)] : null}
            format={dateFormat}
            onChange={props.TimeChange}
          />
        }
        {
          props.searchHandle &&
          <Search
          className='x_search'
          placeholder={props.searchHolder}
          onSearch={value => props.searchHandle(value)}
          style={{ width: props.searchWidth ? props.searchWidth : 250 }}
        />
        }
        <div style={{ float: 'right', display: 'flex'}}>
          {
            props.upload_data &&
            <Upload {...props.upload_data}>
              <Button className='x_import'>导入</Button>
            </Upload>
          }
          {
            props.exportHandle &&
            <span>
            <Button className='x_import' onClick={props.exportHandle}>导出</Button>
            </span>
          }
        </div>
      </div>
    </header>
  )
}

export default Head;
