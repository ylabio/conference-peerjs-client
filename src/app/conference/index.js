import React from 'react';
import { Layout } from 'antd';
import Header from '@containers/header-container';
import Content from '@components/layouts/layout-content';
import Footer from '@components/layouts/layout-footer';
import ConferenceRoom from '@containers/conference-room';

function Conference(props) {
  return (
    <Layout className="layout">
      <Header />
      <Content>
        <ConferenceRoom {...props.match} />
      </Content>
      <Footer />
    </Layout>
  );
}

export default React.memo(Conference);
