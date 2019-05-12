import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, NavLink } from 'react-router-dom';
import { Icon } from 'antd';

export class NavBottom extends Component {
  static propTypes = {
    
  }

  render() {
    return (
      <div className='footerNavBox'>
        <ul className='footer-group'>
          <li className='footer-group-item'>
            <NavLink to='/home'>
              <Icon type='home' />
              <span>首页</span>
            </NavLink>
          </li>
          <li className='footer-group-item'>
            <NavLink to='/mycourse'>
              <Icon type='solution' />
              <span>我的课程</span>
            </NavLink>
          </li>
          <li className='footer-group-item'>
            <NavLink to='/person'>
              <Icon type='user' />
              <span>个人中心</span>
            </NavLink>
          </li>
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavBottom));
