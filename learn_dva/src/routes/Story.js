import React from 'react';
import { connect } from 'dva';
import styles from './Story.css';
import { Layout, Row, Col, Button } from 'antd';
const { Header, Footer, Sider, Content,  } = Layout;

class Story extends React.Component {

  constructor(props){
    super(props);
    this.state = {

    };
  }

  componentDidMount(){
    this.props.dispatch({type:'story/getStory', payload:{}})
  }
  change = () => {
    this.props.dispatch({type:'story/getStory', payload:{}})    
  }
  render(){
    return (
      <div className={styles.normal}>
        <Layout>
          <Header><span style={{ color: '#fff'}}>Test_dva</span></Header>
          <Content>
            <Row gutter={24}>
              <Col span={12} offset={6}>
                <h1>{this.props.msg.title}</h1>
                <h2>{this.props.msg.author}</h2>
                <div
                dangerouslySetInnerHTML={{ __html: this.props.msg.content }} />
                <Button type="primary" onClick={this.change}>换一篇!!!</Button>
              </Col>
            </Row>
          </Content>
        </Layout>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    msg: state.story.msg,
  };
}

export default connect(mapStateToProps)(Story);
