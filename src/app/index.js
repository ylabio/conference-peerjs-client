import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useInit from '@utils/hooks/use-init';
import useSelectorMap from '@utils/hooks/use-selector-map';
import session from '@store/session/actions';

import RoutePrivate from '@containers/route-private';
import Modals from '@app/modals';
import Main from '@app/main';
import About from '@app/about';
import Login from '@app/login';
import Rooms from '@app/rooms';
import Conference from '@app/conference';
import NotFound from '@app/not-found';

import 'antd/dist/antd.css';
import '@theme/style.less';
import Loader from '@components/elements/loader';

function App() {
  const select = useSelectorMap(state => ({
    session: state.session,
  }));

  useInit(async () => {
    await session.remind();
  });

  if (select.session.wait) {
    return <Loader />;
  }

  return (
    <Fragment>
      <Helmet>
        <title>PeerJS & React & Redux</title>
      </Helmet>
      <Switch>
        <Route path="/" exact={true} component={Main} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <RoutePrivate path="/rooms" failpath="/login" exact={true} component={Rooms} />
        <RoutePrivate path="/rooms/:id" failpath="/login" exact={true} component={Conference} />
        <Route component={NotFound} />
      </Switch>
      <Modals />
    </Fragment>
  );
}

export default React.memo(App);
