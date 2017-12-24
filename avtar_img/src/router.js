import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Selectimg from './routes/selectimg/Selectimg'
import Editimg from './routes/editimg/Editimg'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={IndexPage} />
        <Route path="/selectimg" exact component={Selectimg} />
        <Route path="/editimg" exact component={Editimg} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
