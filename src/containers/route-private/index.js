import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';
import Loader from '@components/elements/loader';
import useSelectorMap from '@utils/hooks/use-selector-map';

function RoutePrivate(props) {
  const { component: Component, ...routeProps } = props;

  const select = useSelectorMap(state => ({
    session: state.session,
  }));

  routeProps.render = useCallback(
    props => {
      if (select.session.wait) {
        return <Loader />;
      } else if (select.session.exists) {
        return <Component {...props} />;
      } else {
        return <Redirect to={{ pathname: routeProps.failpath, state: { from: props.location } }} />;
      }
    },
    [select, Component],
  );

  return <Route {...routeProps} />;
}

RoutePrivate.propTypes = {
  component: PropTypes.any.isRequired,
  failpath: PropTypes.string,
};

RoutePrivate.defaultProps = {
  failpath: '/login',
};

export default React.memo(RoutePrivate);
