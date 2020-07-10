import React from 'react';
import { Layout } from 'antd';
import Header from '@containers/header-container';
import Content from '@components/layouts/layout-content';
import Footer from '@components/layouts/layout-footer';

function Main() {
  return (
    <Layout className="layout">
      <Header />
      <Content>
        <h1>HOME</h1>
        <p>Web application for audio-video conferences.</p>
      </Content>
      <Footer />
    </Layout>
  );
}

export default React.memo(Main);
