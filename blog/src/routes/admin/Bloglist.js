import React from 'react';
import { connect } from 'dva';
import { Button, Table, Icon, Divider } from 'antd';

const { Column, ColumnGroup } = Table;


class Bloglist extends React.Component{

    componentDidMount() {
        this.props.dispatch({ type: 'example/getissues', payload:{} })
    }
    render() {
        console.log(this.props.issueslist);
        const data = [{
            key: '1',
            firstName: 'John',
            lastName: 'Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          }, {
            key: '2',
            firstName: 'Jim',
            lastName: 'Green',
            age: 42,
            address: 'London No. 1 Lake Park',
          }, {
            key: '3',
            firstName: 'Joe',
            lastName: 'Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
          }];
          const columns = [{
            title: '序号',
            dataIndex: 'number',
          },{
            title: '标题',
            dataIndex: 'title',
          }, {
            title: '作者',
            dataIndex: 'author_association',
          }, {
            title: '评论数',
            dataIndex: 'comments',
          }, {
            title: '时间',
            dataIndex: 'created_at',
          }, {
            title: 'Action',
            dataIndex: 'action',
            render: (record,text) => {
                return(
                    <div>
                        <span className="list_edit">编辑</span>
                        <Divider type="vertical" />
                        <span className="list_del">删除</span>
                    </div>
                )
            }
          }];
        return (
            <div>
                <div className="list_title">
                    <Button type="primary">Create New</Button>
                </div>
                <Table
                    className="list_table"
                    columns={columns}
                    dataSource={this.props.issueslist}
                />
            </div>
        );
    }
}

export default connect((state) => {
    return {
        issueslist: state.example.issueslist,
    }
})(Bloglist);