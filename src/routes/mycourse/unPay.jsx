import React, { Component } from 'react';
import CourseItem from './courseitem.jsx';
import { connect } from 'react-redux';

class unPay extends Component {
  
  render() {
    let data = this.props.shopCart.unPay;
    data = {
      data,
      title: '购物车中暂无课程,快去添加吧！'
    }
    return (
      <div className='unpay-list'>
          <CourseItem data={ data } />
      </div>
    )
  }
}

export default connect(state => ({...state.course}))(unPay);
