import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import './style.less';

class Logo extends Component {
  static propTypes = {
    title: PropTypes.string,
    history: PropTypes.object,
  };

  static defaultProps = {
    title: 'YLab Conference',
  };

  render() {
    const { title, history } = this.props;

    return (
      <div className="logo" onClick={() => history.push('/')}>
        {title}
      </div>
    );
  }
}

export default withRouter(Logo);
