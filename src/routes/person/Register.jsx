import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from 'antd';

import md5 from 'blueimp-md5';
import { userRegister } from '../../api/course';


export class Register extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        values.nick = values.name;
        values.password = md5(values.password);
        let result = await userRegister(values);
        if (parseFloat(result.code) === 0) {
          this.props.history.push('/person/info');
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit} className='register-form'>
        <Form.Item
          label={
            <span>
              用户名&nbsp;
              <Tooltip title="What do you want others to call you?">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入用户名', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="密码" hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label='邮箱'>
          {
            getFieldDecorator('email', {
              rules: [
                {
                  type: 'email',
                  message: '邮箱格式错误',
                },
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ],
            })(<Input />)
          }
        </Form.Item>
        <Form.Item label="手机号">
        {getFieldDecorator('phone', {
          rules: [{ required: true, message: '请输入手机号' }],
        })(<Input />)}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const mapStateToProps = (state) => ({
  
})

const mapDispatchToProps = {
  
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(Register);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedRegistrationForm)
