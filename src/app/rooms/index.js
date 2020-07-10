import React from 'react';
import { Layout } from 'antd';
import Header from '@containers/header-container';
import Content from '@components/layouts/layout-content';
import Footer from '@components/layouts/layout-footer';
import RoomList from '@containers/room-list';

function Rooms() {
  return (
    <Layout className="layout">
      <Header />
      <Content>
        <RoomList />
      </Content>
      <Footer />
    </Layout>
  );
}

export default React.memo(Rooms);
