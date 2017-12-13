import dva from 'dva';
import './index.css';

// 1. Initialize
import { browserHistory } from 'dva/router';
const app = dva({
  history: browserHistory,
});

app.model(require("./models/story"));

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
