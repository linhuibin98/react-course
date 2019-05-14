import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form, Icon, Input, Button, Checkbox, Modal
} from 'antd';
import { Link } from 'react-router-dom';

import md5 from 'blueimp-md5';
import { login } from '../../api/course';
import action from '../../store/action';


export class Login extends Component {

   loginTip = (msg) => {
    let secondsToGo = 5;
    
    const modal = Modal.success({
      title: msg.title,
      content: msg.content,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      modal.update({
        content: `该提示将在${secondsToGo}s后自动关闭`,
      });
    }, 1000);

    setTimeout(() => {
      this.props.history.push('/person');
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { username, password} = values;
        password = md5(password);
        let result = await login({
          username,
          password
        });

        if (parseFloat(result.code) === 0) {
          this.props.queryUserInfo();
          this.loginTip({
            title: '登录成功',
            content: '即将跳转...'
          })
          return;
        }
        this.loginTip({
          title: '登录失败',
          content: '请再次输入账号密码'
        })
      }
    });
  }

  render() {
      const { getFieldDecorator } = this.props.form;
      return (
        <Form onSubmit={this.handleSubmit} className="login-form" style={{ padding: '1rem .5rem' }}>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <Link to='/person/register'>register now!</Link>
          </Form.Item>
        </Form>
    );
  }
}
const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  ...action.person
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
