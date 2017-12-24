import dva from 'dva';
import './index.css';

// 1. Initialize
import createHistory from 'history/createBrowserHistory';
const app = dva({
  history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
