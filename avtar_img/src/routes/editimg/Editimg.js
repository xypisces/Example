import React from 'react';
import { connect } from 'dva';
import { Grid } from 'antd-mobile';
import styles from './editimg.css'

class Editimg extends React.Component {
  constructor(props){
    super(props)
    this.state = {}
  }
  render(){
    const data1 = Array.from(new Array(9)).map(() => ({
      icon: 'https://gw.alipayobjects.com/zos/rmsportal/WXoqXTHrSnRcUwEaQgXJ.png',
    }));
    return (
      <div className={styles.main}>
        <div className={styles.content}>
          <svg className={styles.icon} style={{ fontSize:'80px', color: 'red' }} aria-hidden="true">
              <use xlinkHref="#icon-icon-test"></use>
          </svg>
        </div>
        {/* <div >
          <img style={{height:"200px",width:"200px"}} src={require('../../assets/avtar.jpg')}/>
        </div> */}
      </div>
    );
  }
}

Editimg.propTypes = {
};

export default connect()(Editimg);
