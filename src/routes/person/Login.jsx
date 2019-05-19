import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Form, Icon, Input, Button, Checkbox, message
} from 'antd';
import { Link } from 'react-router-dom';

import md5 from 'blueimp-md5';
import { login } from '../../api/course';
import action from '../../store/action';

message.config({
  top: 50,
  duration: 1,
  maxCount: 3,
});


export class Login extends Component {


  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let { username, password} = values;
        password = md5(password);
        let result = await login({
          name: username,
          password
        });

        if (parseFloat(result.code) === 0) {
          this.props.queryUserInfo();
          message.success('登录成功');
          this.props.queryUnpay();
          this.props.queryPay();
          this.props.history.push('/person/info');
          return;
        }
        message.error('登录失败, 账号或密码错误...请重新输入');
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
  ...action.person,
  ...action.course
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm)
