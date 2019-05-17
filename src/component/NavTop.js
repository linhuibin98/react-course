import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import action from '../store/action';

/* transition */
import Transition from 'react-transition-group/Transition';

const duration = 300,
      defaultStyle = {
        transition: `opacity ${duration}ms`,
        opacity: 0,
      },
      transitionStyles = {
        entering: { opacity: 0},
        entered: { opacity: 1}
      };

export class NavTop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      in: false
    }
    //=>每一次页面刷新，REDUX中存储的购物车信息都会消失，所以我们需要在页面刷新的时候，执行一个DISPATCH派发，把服务器中存储的购物信息存放到REDUX中（NAV是每一次页面刷新，不管在哪一个路由下都会执行的组件）

    props.queryUnpay();
    props.queryPay();
  }

  handleClick = (evt) => {
    if (evt.target.tagName === 'LI') {
      let type = evt.target.getAttribute('type');   // 获取在 目标li中的 type元素的值
      this.props.queryList({
        type,
        page: 1,          // 切换列表，page重置为 1 
        flag: 'replace'  // 筛选列表，redux中状态为替换
      })
      this.setState({
        in: false
      })
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

          <Transition in={ this.state.in } timeout={{}}>
            {
              state => {
                return (
                  <ul className='filterBox' style={{
                    ...defaultStyle,
                    ...transitionStyles[state],
                    display: this.state.in ? 'block' : 'none'
                  }} onClick={this.handleClick}>
                    <li type='all'>全部课程</li>
                    <li type='vue'>Vue</li>
                    <li type='react'>React</li>
                    <li type='xiaochengxu'>小程序</li>
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
  ...state.course
})

const mapDispatchToProps = {
  ...action.course
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavTop));
