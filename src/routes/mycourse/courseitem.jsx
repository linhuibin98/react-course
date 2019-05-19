import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Button, message } from 'antd';
import { connect } from 'react-redux';
import action from '../../store/action';
import { removeShopCart, checkLogin } from '../../api/course';

class Courseitem extends Component {
  static defaultProps = {
    data: {},
    isUnpay: false
  }

  static propTypes = {
    data: PropTypes.object,
    isUnpay: PropTypes.bool,
    checkAll: PropTypes.bool
  }

  removeUnpay = () => {
    let {data: { data }} = this.props;
    data.map( async item => {
      if (item.check) {
        await removeShopCart(item.id);
        this.props.queryUnpay();
      }
      return item;
    })
  }

  onChecked = ev => {
    let courseId = ev.target.getAttribute('courseid');
    this.props.isChecked(courseId);
  }

  checkedAll = () => {
    this.props.isChecked(-1);
  }

  onSetter = async () => {
    let result = await checkLogin();
    if (result.code === 0) {
      console.log('已经登录');
      return
    }
    message.error('您还未登录, 请登陆后购买')
  }

  render() {
    let { data: {data, title, isUnpay, checkAll} } = this.props;
    return (
      <div>
        <ul className='cart-list'>
          {
            !data.length ? (<Link to='/home/list'><Alert type='warning' message={ title } /></Link>) : (
              data.map((item, index) => {
                let { id, name, pic, dec, price, check } = item;
                return (
                  <li key={ index }>
                    <input type='checkbox' checked={ check } className='list-check' courseid={ id } onChange={ this.onChecked }  />
                    <Link to={{
                      pathname: '/home/detail',
                      search: `?courseId=${id}`
                    }}>
                      <h3>{ name }</h3>
                      <div className='content'>
                        <div className='list-img'>
                          <img src={ pic } alt='' />
                        </div>
                        <div className='desc'>
                          <p>{ dec }</p>
                          <p>价格：<span style={{ color: 'red' }}>{ price }</span></p>
                        </div>
                      </div>
                    </Link>
                  </li>
                )
              })
            )
          }
        </ul>
        {
          isUnpay && data.length ? (
          <div className='manage'>
            <div className='check'>全选<input type='checkbox' className='checkedAll' checked={ checkAll } onChange={ this.checkedAll } /></div>
            <div className='totalbox'>总计：<span className='total'>6000</span></div>
            <div className='btn-list'>
              <Button type='danger' size='small' onClick={ this.removeUnpay }>移除</Button>
              <Button type='primary' onClick={ this.onSetter }>结算</Button>
            </div>
        </div>
          ) : ''
        }
      </div>
    )
  }
}


export default connect(null, action.course)(Courseitem);