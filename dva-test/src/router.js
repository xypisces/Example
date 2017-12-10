import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Article from './routes/article';



function RouterConfig({ history }) {
  return (
    <Router history={history}>
        <div>
        <Route path="/" exact component={IndexPage} />
        <Route path="/page" component={Article} />
        </div>
    </Router>
  );
}

export default RouterConfig;
