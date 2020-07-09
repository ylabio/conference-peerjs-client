import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Spin, Alert } from 'antd';
import Error from '@components/elements/error';

import './style.less';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 8 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 8 },
};

class FormLogin extends Component {
  static propTypes = {
    wait: PropTypes.bool,
    errors: PropTypes.any,
    onSubmit: PropTypes.func.isRequired,
  };

  onFinish = values => {
    this.props.onSubmit({ ...values });
  };

  onFinishFailed = err => {
    console.error('Failed:', err);
  };

  render() {
    const { wait, errors } = this.props;

    return (
      <Spin spinning={wait} delay={500}>
        <Form
          {...layout}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
          onFinishFailed={this.onFinishFailed}
        >
          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Please input your login!' }]}
          >
            <Input placeholder="Username or email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>

          {errors && (
            <Form.Item {...tailLayout}>
              <Error errors={errors} path="*" />
            </Form.Item>
          )}

          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" disabled={wait}>
              Log in
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}

export default FormLogin;
