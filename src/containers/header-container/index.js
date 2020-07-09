import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import detectActive from '@utils/detect-active';
import sessionActions from '@store/session/actions';

import { Layout, Menu } from 'antd';
const { Header } = Layout;
import Logo from '@components/elements/logo';

class HeaderContainer extends Component {
  static propTypes = {
    session: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      items: detectActive(
        [
          { title: 'Home', to: '/', active: false },
          { title: 'About', to: '/about', active: false },
          // { title: 'Login', to: '/login', active: false },
        ],
        props.location,
      ),
    };
  }

  componentDidUpdate(nextProps) {
    const { items } = this.state;
    const { location } = this.props;

    if (location !== nextProps.location) {
      this.setState({
        items: detectActive(items, nextProps.location),
      });
    }
  }

  render() {
    const { history, location, session } = this.props;
    const { items } = this.state;

    return (
      <Header>
        <Logo />
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          defaultSelectedKeys={['/']}
        >
          {items.map(item => (
            <Menu.Item key={item.to} onClick={() => history.push(item.to)}>
              {item.title}
            </Menu.Item>
          ))}
          {!session.exists && (
            <Menu.Item key={'/login'} onClick={() => history.push('/login')}>
              Login
            </Menu.Item>
          )}
          {session.exists && [
            <Menu.Item key={'/rooms'} onClick={() => history.push('/rooms')}>
              Rooms
            </Menu.Item>,
            <Menu.Item key={'/logout'} onClick={() => sessionActions.clear()}>
              Logout
            </Menu.Item>,
          ]}
        </Menu>
      </Header>
    );
  }
}

export default compose(
  withRouter,
  connect(state => ({
    session: state.session,
  })),
)(HeaderContainer);
