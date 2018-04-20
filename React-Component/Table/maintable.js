import React from 'react';
import { Alert, Table } from 'antd';
import './main.less';

/**
 * 
 * titleName -- 表格顶部名称 数组形式传入，如 ['2013','莞城']
 * alertMsg -- 表格上面的提示语
 * rowSelection -- 列表项是否可以选择
 * columns -- 表格配置项
 * data -- 表格数据
 * loading -- 切换时候的loading状态
 * pagination -- 分页的操作
 * rowkey -- 表格的索引，默认为key值
 */

function MainTable(props){
  return(
    <main className='x_main'>
      {
        props.titleName &&
        <div className='x_title'>
          {props.titleName.map((item,i) => {
            return(
              <span key={i} className='x_span'>{item}</span>
            )
          })}
        </div>
      }
      {
        props.alertMsg &&
        <Alert message={props.alertMsg} type="info" showIcon />
      }
      <Table
        rowKey={props.rowkey || 'key'}
        className='x_table'
        rowSelection={props.rowSelection ? props.rowSelection : null}
        columns={props.columns} 
        dataSource={props.data || []}
        loading = {props.loading || false}
        pagination={props.pagination ? props.pagination : false }
        />
    </main>
  )
}

export default MainTable;