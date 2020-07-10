import React, { Fragment, useCallback } from 'react';
import { Layout } from 'antd';
import Header from '@containers/header-container';
import Content from '@components/layouts/layout-content';
import Footer from '@components/layouts/layout-footer';
import FormLogin from '@components/forms/form-login';
import useSelectorMap from '@utils/hooks/use-selector-map';
import formLogin from '@store/form-login/actions';
import history from '@app/history';

function Login(props) {
  const select = useSelectorMap(state => ({
    formLogin: state.formLogin,
  }));

  const callbacks = {
    onSubmitForm: useCallback(async data => {
      await formLogin.submit(data);
      history.goPrivate();
    }, []),
  };

  return (
    <Layout className="layout">
      <Header />
      <Content>
        <FormLogin
          wait={select.formLogin.wait}
          errors={select.formLogin.errors}
          onSubmit={callbacks.onSubmitForm}
        />
      </Content>
      <Footer />
    </Layout>
  );

  return (
    <LayoutPage header={<HeaderContainer />}>
      <LayoutContent>
        <Fragment>
          <h1>Login page</h1>
          <FormLogin
            data={select.formLogin.data}
            errors={select.formLogin.errors}
            wait={select.formLogin.wait}
            onChange={callbacks.onChangeForm}
            onSubmit={callbacks.onSubmitForm}
          />
        </Fragment>
      </LayoutContent>
    </LayoutPage>
  );
}

export default React.memo(Login);
