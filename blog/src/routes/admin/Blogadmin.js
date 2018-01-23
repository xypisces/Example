import React from 'react';
import { connect } from 'dva';
import { Route, Switch, Link, Redirect } from 'dva/router';
import Bloglist from './Bloglist';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import './admin.less';
const { Header, Content, Footer, Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Blogadmin extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      collapsed: false,
      name: 'XXXuyuBlog',
      nickname: 'Blog'
    }
  }
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }
  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" >{this.state.collapsed ? this.state.nickname : this.state.name}</div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <Link className="inline" to="/admin/bloglist">BlogList</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>User</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '20px 20px 0 20px' }}>
            <div style={{ padding: 24, background: '#fff', minHeight: 800 }}>
                <Switch>
                  <Route path="/admin/bloglist" component={Bloglist} />
                  <Redirect exact from="/admin" to="/admin/bloglist" />
                </Switch>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Blog ©2016 Created by Xu Yu
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default connect()(Blogadmin);