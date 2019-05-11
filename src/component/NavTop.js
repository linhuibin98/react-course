import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';

/* transition */
import Transition from 'react-transition-group/Transition';

const duration = 300,
      defaultStyle = {
        transition: `opacity ${duration}ms`,
        opacity: 0
      },
      transitionStyles = {
        entering: { opacity: 0 },
        entered: { opacity: 1 }
      };

export class NavTop extends Component {
  constructor(props) {
    super();
    this.state = {
      in: false
    }
  }

  render() {
    return (
      <div className='headerNavBox'>
        { /* 首页的导航 */ }
        <div className='homeBox'>
          <div className='baseBox'>
            <h1 className='logo'>努力学习</h1>
            <Icon className='icon' type='bars' style={{ fontSize: '.6rem' }} onClick={ this.changeIn } />
          </div>

          <Transition in={ this.state.in }>
            {
              state => {
                return (
                  <ul className='filterBox' style={{
                    ...defaultStyle,
                    ...transitionStyles[state]
                  }}>
                    <li>全部课程</li>
                    <li>Vue</li>
                    <li>React</li>
                    <li>小程序</li>
                  </ul>
                )
              }
            }
          </Transition>
          
        </div>
      </div>
    )
  }

  changeIn = () => {
    this.setState({
      in: !this.state.in
    })
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavTop));
