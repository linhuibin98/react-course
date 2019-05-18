import React, { Component } from 'react'
import { connect } from 'react-redux';
import CourseItem from './courseitem.jsx';
import { checkLogin } from '../../api/course';
import { Alert } from 'antd';
import { Link } from 'react-router-dom';

class Pay extends Component {
  state = {
    isLogin: false
  }

  async componentWillMount() {
    let result = await checkLogin();  // 检查是否登录
    let isLogin = parseFloat(result.code) === 0 ? true : false;
    this.setState({ isLogin });
  }

  render() {
    let data = this.props.shopCart.pay;
    data = {
      data,
      title: '暂无已购课程,快去挑选课程吧！'
    }

    if (!this.state.isLogin) return (
      <Link to='/person/login'><Alert type='warning' message='当前还未登陆,请登陆后查看已购课程>>' /></Link>
    );

    return (
      <div>
        <CourseItem data={ data } />
      </div>
    )
  }
}

export default connect(state => ({...state.course}))(Pay);
