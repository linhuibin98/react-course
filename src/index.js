import React from 'react';
import ReactDOM from 'react-dom';
// redux... store
import { Provider } from 'react-redux';
import store from './store';

//router
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom';

//routes
import Home from './routes/home';
import MyCourse from './routes/mycourse';
import Person from './routes/person';

//component
import NavTop from './component/NavTop';
import NavBottom from './component/NavBottom';

//antd
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';

//css
import './static/css/reset.min.css';
import './static/css/common.less';


ReactDOM.render((
  <Provider store={ store }>
    <HashRouter>
      <LocaleProvider locale={ zh_CN }>
        <div>
          <NavTop />
          <Switch>
            <Route path='/home' exact component={ Home } />
            <Route path='/person' component={ Person } />
            <Route path='/mycourse' component={ MyCourse } />
            <Redirect from='/' to='/home' />
          </Switch>
          <NavBottom />
        </div>
      </LocaleProvider>
    </HashRouter>
  </Provider>
), document.getElementById('root'));
