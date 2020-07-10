import React, { Component } from 'react';
import { Empty as AntEmpty } from 'antd';

import './style.less';

class Empty extends Component {
  render() {
    return (
      <div className="empty">
        <AntEmpty />
      </div>
    );
  }
}

export default Empty;
