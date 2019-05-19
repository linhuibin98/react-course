import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert, Button } from 'antd';

export default class courseitem extends Component {
  static defaultProps = {
    data: {},
    isUnpay: false
  }

  static propTypes = {
    data: PropTypes.object,
    isUnpay: PropTypes.bool
  }

  removeUnpay = ev => {
    
  }

  render() {
    let { data: {data, title, isUnpay} } = this.props;
    return (
      <div>
        <ul className='cart-list'>
          {
            !data.length ? (<Alert type='warning' message={ title } />) : (
              data.map((item, index) => {
                let { id, name, pic, dec, price } = item;
                return (
                  <li key={ index }>
                    <input type='checkbox' className='list-check' />
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
            <div className='check'>全选<input type='checkbox' className='checkedAll' /></div>
            <div className='totalbox'>总计：<span className='total'>6000</span></div>
            <div className='btn-list'>
              <Button type='danger' size='small' onClick={ this.removeUnpay }>移除</Button>
              <Button type='primary'>结算</Button>
            </div>
        </div>
          ) : ''
        }
      </div>
    )
  }
}
