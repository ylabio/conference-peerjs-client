import React, { useCallback } from 'react';
import { Button } from 'antd';
import useSelectorMap from '@utils/hooks/use-selector-map';
import useInit from '@utils/hooks/use-init';
import conference from '@store/conference/actions';
import room from '@store/room/actions';
import Chat from '../chat';

import './style.less';
import Loader from '@components/elements/loader';
import Empty from '@components/elements/empty';

function ConferenceRoom({ params }) {
  useInit(async () => {
    await room.fetchOne(params.id);
  });

  const select = useSelectorMap(state => ({
    current: state.room.current,
    wait: state.room.wait,
    errors: state.room.errors,
    peers: state.conference.peers,
    connected: state.conference.connected,
  }));

  const callbacks = {
    shareScreenToAll: useCallback(async () => {
      await conference.shareScreenToAll();
    }, []),
  };
  console.log('current', select.current);

  if (select.wait) {
    return (
      <div className="conference">
        <Loader />
      </div>
    );
  }

  if (!select.current) {
    return (
      <div className="conference">
        <Empty />
      </div>
    );
  }

  return (
    <div className="conference">
      <h1>{select.current.title}</h1>
      <div id="peers_video" className="conference__peers-video"></div>
      <Button
        type="primary"
        disabled={!select.connected || select.peers.length === 0}
        onClick={callbacks.shareScreenToAll}
      >
        Share screen
      </Button>
      <Chat />
    </div>
  );
}

export default React.memo(ConferenceRoom);
