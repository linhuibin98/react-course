import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';

export class MyCourse extends Component {
  state = {
    current: 'unpay'
  }

  handleClick = ev => {
    this.setState({
      current: ev.key
    })
  }

  render() {
    return (
      <div className='container'>
        <div className='menu-box'>
          <Menu selectedKeys={ [this.state.current] } onClick={ this.handleClick } mode='horizontal'>
            <Menu.Item key='unpay'>未支付</Menu.Item>
            <Menu.Item key='pay'>已支付</Menu.Item>
          </Menu>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCourse)
