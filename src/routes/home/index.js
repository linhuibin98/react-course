import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import List from './List.jsx';
import Detail from './Detail.jsx';

export class Home extends Component {

  render() {
    return (
      <div className='container'>
        <Switch>
          <Route path='/home/list' component={ List } />
          <Route path='/home/detail' component={ Detail } />
          <Redirect to='/home/list' />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
