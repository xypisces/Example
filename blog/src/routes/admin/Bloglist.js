import React from 'react';
import { connect } from 'dva';


class Bloglist extends React.Component{
    render() {
        return (
            <div>
                <h1> Hello world!! </h1>
            </div>
        );
    }
}

export default connect()(Bloglist);