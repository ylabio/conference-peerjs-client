import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';

import './style.less';

class Error extends Component {
  static propTypes = {
    path: PropTypes.string,
    errors: PropTypes.any,
  };

  renderItems() {
    const { path, errors } = this.props;

    if (!errors && !(errors instanceof Array) && !(errors instanceof Object)) {
      return null;
    }
    const errorItems = errors instanceof Array ? errors : [errors];
    const items = [];

    errorItems.map(item => {
      if (!item || !item.message) {
        return;
      }

      if (
        path === '*' ||
        (item.path && item.path.indexOf(path) === 0 && path.length > 0) ||
        (item.path.length === 0 && path.length === 0) ||
        (!item.path && !path)
      ) {
        items.push(<Alert key={item.code} message={item.message} type="error" />);
      }
    });

    return items;
  }

  render() {
    return <div className="error">{React.Children.toArray(this.renderItems())}</div>;
  }
}

export default Error;
