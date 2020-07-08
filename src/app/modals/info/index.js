import React, { Fragment, useCallback } from 'react';
import modal from '@store/modal/actions';
import { Button } from 'antd';
import LayoutModal from '@components/layouts/layout-modal';

function Info(props) {
  const callbacks = {
    onCancel: useCallback(async () => {
      await modal.close('Cancel value');
    }, []),
    onSuccess: useCallback(async () => {
      await modal.close('Success value');
    }, []),
    renderFooter: useCallback(() => {
      return (
        <Fragment>
          <Button onClick={callbacks.onSuccess}>OK</Button>
        </Fragment>
      );
    }, []),
  };

  return (
    <LayoutModal
      onClose={callbacks.onCancel}
      footer={callbacks.renderFooter()}
      overflowTransparent={props.overflowTransparent}
      overflowClose={props.overflowClose}
    >
      Modal window
    </LayoutModal>
  );
}

export default React.memo(Info);
