import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
import { Switch, Route, Redirect } from 'react-router-dom';
import Unpay from './unPay.jsx';
import Pay from './pay.jsx';

export class MyCourse extends Component {
  state = {
    current: 'unpay'
  }

  handleClick = ev => {
    this.setState({
      current: ev.key
    })
    this.props.history.push(ev.key === 'pay' ? '/mycourse/pay' : '/mycourse/unpay');
  }

  render() {
    return (
      <div className='container'>
        <div className='menu-box'>
          <Menu selectedKeys={ [this.state.current] } onClick={ this.handleClick } mode='horizontal'>
            <Menu.Item key='unpay'>未支付</Menu.Item>
            <Menu.Item key='pay'>已支付</Menu.Item>
          </Menu>
          <Switch>
            <Route path='/mycourse/unpay' component={ Unpay } />
            <Route path='/mycourse/pay' component={ Pay }/>
            <Redirect to='/mycourse/unpay' />
          </Switch>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCourse)
