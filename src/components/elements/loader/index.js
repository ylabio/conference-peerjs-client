import React, { Component } from 'react';
import { Spin } from 'antd';

import './style.less';

class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <Spin size="large" />
      </div>
    );
  }
}

export default Loader;
