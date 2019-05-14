import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

/* component */
import Info from './Info.jsx';
import Tip from './Tip.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

/* api */
import { checkLogin } from '../../api/course';

export class Person extends Component {
  constructor(props) {
    super();
    this.state = {
      isLogin: false
    }
  }

  async componentWillMount() {
    let result = await checkLogin();
    let isLogin = parseFloat(result.code) === 0 ? true : false;
    this.setState({ isLogin });
  }

  async componentWillReceiveProps() {
    let result = await checkLogin();
    let isLogin = parseFloat(result.code) === 0 ? true : false;
    this.setState({ isLogin });
  }

  render() {
    return (
      <div className='container'>
      <Switch>
          { /* render中不能出现异步操作 */ }
          <Route path='/person/info' render={ this.isLogin }/>
          <Route path='/person/login' component={ Login } />
          <Route path='/person/register' component={ Register } />
          <Redirect to='/person/info' />
      </Switch>
      </div>
    )
  }
  /* =>路由的验证和渲染是同步的，不允许在校验中出现异步，因为这样在异步没有完成之前，根本不知道道染谁，语法不支持这样的操作 */
   isLogin = () => {
    if (this.state.isLogin) {
      return <Info />
    }
    return <Tip />
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Person)
