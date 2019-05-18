import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
 
export default class courseitem extends Component {
  static defaultProps = {
    data: {}
  }

  static propTypes = {
    data: PropTypes.object
  }

  render() {
    let { data: {data, title} } = this.props;
    return (
      <div>
        <ul className='cart-list'>
          {
            !data.length ? (<Alert type='warning' message={ title } />) : (
              data.map((item, index) => {
                let { id, name, pic, dec, price } = item;
                return (
                  <li key={ index }>
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
      </div>
    )
  }
}
