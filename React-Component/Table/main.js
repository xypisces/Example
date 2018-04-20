import React from 'react';
import { connect } from 'dva';
import { Alert, Button, Input, Select, Table, Icon } from 'antd';
import './main.less';
import Head from './head';
import MainTable from './maintable';

/**
 * head.js
 * addHandle -- 添加按钮方法以及是否显示
 * delHandle -- 删除按钮方法以及是否显示
 * clearHandle -- 清空按钮方法以及是否显示
 * selectName -- 筛选名称
 * selectChange -- 筛选方法
 * selectData -- 筛选数据
 * selectWidth -- 筛选框宽度，默认为120
 * searchHandle -- 搜索方法
 * searchWidth -- 搜索框宽度 默认为250
 * importHandle -- 导入方法
 * exportHandle -- 导出方法
 */
/**
 * table.js
 * titleName -- 表格顶部名称 数组形式传入，如 ['2013','莞城']
 * alertMsg -- 表格上面的提示语
 * rowSelection -- 列表项是否可以选择
 * columns -- 表格配置项
 * data -- 表格数据
 * loading -- 切换时候的loading状态
 * pagination -- 分页的操作
 */
class Xymain extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedRowKeys: [], // Check here to configure the default 
      current: 3,
      loading: false,
    }
  }
  selectChange = (value) => {
    console.log(`selected ${value}`);
  }
  searchHandle = (value) => {
    console.log(value);
  }
  addHandle = () => {
    console.log('adddadd')
  }
  delHandle = () => {
    console.log('deldeldel')
  }
  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }
  onChange = (page) => {
    console.log(page);
    this.setState({
      current: page,
      loading: true,
    });
    setTimeout(()=> {
      this.setState({
        loading: false,
      });
    },1000)
  }
  goBack = () => {
    console.log('goback')
  }
  render(){
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'Age',
      dataIndex: 'age',
    }, {
      title: 'Address',
      dataIndex: 'address',
    }];
    const data = [];
    for (let i = 0; i < 46; i++) {
      data.push({
        key: i,
        name: `Edward King ${i}`,
        age: 32,
        address: `London, Park Lane no. ${i}`,
      });
    }
    const { loading, selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const selectData = ['莞城','松山湖']
    const titleName = ['前端开发部', '校外机构']
    return(
      <div className='contents'>
        {/* <p className='x_goback'><Icon type="left-circle-o" style={{marginRight: '5px'}} onClick={this.goBack}/>返回</p> */}
        <Head
          addHandle={this.addHandle}
          delHandle={this.delHandle}
          selectChange={this.selectChange}
          selectName='所属部门'
          selectData={selectData}
          searchHolder="input search text"
          searchHandle={this.searchHandle}
        />
        <MainTable
          titleName = {titleName}
          alertMsg="Informational Notes"
          rowSelection={rowSelection}
          columns={columns}
          data={data}
          loading={this.state.loading}
          pagination = {{
            current: this.state.current,
            onChange: this.onChange,
            total: 50
          }}
        />
      </div>
    )
  }
}

export default connect()(Xymain);