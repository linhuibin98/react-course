import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { List, Button } from 'antd';
import action from '../../store/action';
import { exitLogin } from '../../api/course';
import { async } from 'q';


export class Info extends Component {

  componentWillMount() {
    let { userInfo, queryUserInfo } = this.props;
    if (!userInfo) {
      queryUserInfo();
    }
  }

  render() {
    let { userInfo } = this.props;
    if (!userInfo) return '';
    let data = userInfo.data;
    data = [`用户名：${data.nick}`, `Email：${data.email}`, `电话：${data.phone}`]
    return (
      <div>
        <List
          header={<div style={{ textAlign: 'center' }}>个人中心</div>}
          footer={<Button type="danger" size='large' style={{ width: '100%', height: '100%' }} onClick={async () => {
            await exitLogin();
            this.props.history.push('/person');
          }}>退出登录</Button>}
          bordered
          dataSource={data}
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
  ...state.person
})


export default connect(mapStateToProps, action.person)(withRouter(Info))
