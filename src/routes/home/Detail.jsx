import React, { Component } from 'react';
import { connect } from 'react-redux';
import action from '../../store/action';
import { Button } from 'antd';
import { queryInfo, addShopCart, removeShopCart } from '../../api/course';
import qs from 'qs';

class Detail extends Component {
  state = {
    data: null,
    isShop: -1,  //存储该课程是否已经加入到购物车中，-1表示未加入，0表示已加入但未支付，1表示已购买
  }

  async componentDidMount() {
    let { location: { search } } = this.props;
    let { courseId } = qs.parse(search.substr(1)) || {};
    this.courseId = courseId; // 挂载到实例上，其他方法也可以调用
    let result = await queryInfo(parseFloat(courseId));
    if (parseFloat(result.code) === 0) {
      //=>校验当前的课程是已支付还是未支付，或者还未加入购物车
      let { unPay, pay } = this.props.shopCart,
          isShop = -1;
      //=>在REDUX未购买和已购买的集合中筛选是否有当前展示的课程，有的话说明当前课程已经加入到购物车了，没有说明还未加入
      let unPayItem = unPay.find(item => parseFloat(item.id) === parseFloat(courseId));
      let payItem = pay.find(item => parseFloat(item.id) === parseFloat(courseId));
      if (unPayItem) {
        isShop = 0;
      }
      if (payItem) {
        isShop = 1;
      }
      this.setState({
        data: result.data,
        isShop
      })
    }
  }

  handleShopCart = async ev => {
    if (this.state.isShop === -1) {
      let result = await addShopCart(this.courseId);
      if (parseFloat(result.code) === 0) {
        this.props.queryUnpay();
        this.setState({
          isShop: 0
        })
      }
      return;
    }
    let result = await removeShopCart(this.courseId);
    if (parseFloat(result.code) === 0) {
      this.props.queryUnpay();
      this.setState({
        isShop: -1
      })
  }
}

  render() {
    let { data, isShop } = this.state;
    if (!data) return '';
    let { name, dec, price, pic } = data;
    return (
      <div className='baseInfo'>
        <video src='http://www.17sucai.com/preview/1111042/2019-04-16/videoTest/mp4/1.mp4' controls preload='none' poster={ pic } />
        <div className='content'>
          <h3>{ name }</h3>
          <p>{ dec }</p>
          <span>课程价格：{ price }</span><br />
          {
            isShop !== 1 ? (
              <Button type={isShop === -1 ? 'primary' : 'danger'} onClick={ this.handleShopCart }>{isShop === -1 ? '加入购物车' : '移除购物车'}</Button>
            ) : ''
          }
        </div>
      </div>
    )
  }
}

export default connect(state => ({...state.course}), action.course)(Detail);
