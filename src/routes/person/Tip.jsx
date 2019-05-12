import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Alert, Button } from 'antd';

export class Tip extends Component {

  render() {
    return (
      <div className='warning-tip'>
        <Alert type='warning' message='未登录提醒' description='尊敬的用户,您当前还未登录,登录后才可以查看个人信息' />
        <Button type='dashed' onClick={ev => {
          this.props.history.push('/person/register');
        }}>立即注册</Button>
        <Button type='dashed' onClick={ev => {
          this.props.history.push('/person/login');
        }}>立即登录</Button>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Tip))
