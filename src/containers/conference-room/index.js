import React, { useCallback, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Switch, Space } from 'antd';
import { AudioOutlined, VideoCameraOutlined } from '@ant-design/icons';
import useSelectorMap from '@utils/hooks/use-selector-map';
import useInit from '@utils/hooks/use-init';
import conference from '@store/conference/actions';
import room from '@store/room/actions';
import peer from '@store/peer/actions';
import Chat from '../chat';
import Loader from '@components/elements/loader';
import Empty from '@components/elements/empty';

import './style.less';

function ConferenceRoom({ history, params }) {
  useInit(async () => {
    await room.fetchOne(params.id);
    const result = await peer.fetchByRoom(params.id);
    await conference.connect({ roomPeers: result.items });
  });

  useEffect(() => {
    return function cleanup() {
      conference.disconnect();
    };
  }, [history.location.pathname]);

  const select = useSelectorMap(state => ({
    current: state.room.current,
    wait: state.room.wait,
    errors: state.room.errors,
    peers: state.peer.items,
    mediaConfig: state.conference.mediaConfig,
    connected: state.conference.connected,
  }));

  const callbacks = {
    shareScreenToAll: useCallback(async () => {
      await conference.shareScreenToAll();
    }, []),
    onMediaConfigChange: useCallback(
      async mediaConfig => {
        const config = { ...select.mediaConfig, ...mediaConfig };
        console.log('config', config);
        await conference.mediaConfigChange(config);
      },
      [select.mediaConfig],
    ),
  };
  // console.log('mediaConfig', select.mediaConfig);

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
      <Space className="conference__header" size="large">
        <h1>{select.current.title}</h1>
        <Space>
          <AudioOutlined />
          <Switch
            defaultChecked={select.mediaConfig.audio}
            onChange={checked => callbacks.onMediaConfigChange({ audio: checked })}
          />
        </Space>
        <Space>
          <VideoCameraOutlined />
          <Switch
            defaultChecked={select.mediaConfig.video}
            onChange={checked => callbacks.onMediaConfigChange({ video: checked })}
          />
        </Space>
      </Space>
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

export default React.memo(withRouter(ConferenceRoom));
