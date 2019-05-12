import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Switch, Route, Redirect } from 'react-router-dom'

/* component */
import Info from './Info.jsx';
import Tip from './Tip.jsx';
import Login from './Login.jsx';
import Register from './Register.jsx';

export class Person extends Component {
  static propTypes = {

  }

  render() {
    return (
      <div className='container'>
      <Switch>
          <Route path='/person/info' render={() => {
            return (<Info />)
          }}/>
          <Route path='/person/login' component={ Login } />
          <Route path='/person/register' component={ Register } />
          <Redirect to='/person/info' />
      </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Person)
