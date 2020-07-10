import React, { Component } from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

class LayoutFooter extends Component {
  render() {
    return (
      <Footer style={{ textAlign: 'center' }}>
        YLab Conference ©2020 Created by{' '}
        <a href="https://github.com/proteye" target="_blank">
          @proteye
        </a>
      </Footer>
    );
  }
}

export default LayoutFooter;
