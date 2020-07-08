import React, { useCallback } from 'react';
import modal from '@store/modal/actions';
import * as modals from './config.js';
import useSelectorMap from '@utils/hooks/use-selector-map';

function Modals() {
  const select = useSelectorMap(state => ({
    modal: state.modal,
  }));

  const callbacks = {
    getModal: useCallback(() => {
      const props = {
        ...select.modal.params,
        close: result => {
          return modal.close(result);
        },
      };
      if (select.modal.show) {
        if (modals[select.modal.name]) {
          const Component = modals[select.modal.name];
          return <Component {...props} />;
        }
      } else {
        return null;
      }
    }, [select]),
  };

  return callbacks.getModal();
}

export default React.memo(Modals);
