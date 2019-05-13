import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { List, Button } from 'antd';

import { getUserInfo } from '../../api/course';

export class Info extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }

  async componentDidMount() {
    let { data } = await getUserInfo();
    this.setState({
      data: [`用户名：${data.nick}`, `Email：${data.email}`, `电话：${data.phone}`]
    })
  }

  render() {
    return (
      <div>
        <List
          header={<div style={{ textAlign: 'center' }}>个人中心</div>}
          footer={<Button type="danger" size='large' style={{ width: '100%', height: '100%' }}>退出登录</Button>}
          bordered
          dataSource={this.state.data}
          renderItem={item => (
            <List.Item>
              {item}
            </List.Item>
          )}
      />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Info))
