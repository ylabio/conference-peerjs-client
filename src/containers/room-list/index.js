import React, { useCallback, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Card, Col, Row } from 'antd';
import { chunk } from 'lodash';
import useSelectorMap from '@utils/hooks/use-selector-map';
import useInit from '@utils/hooks/use-init';
import room from '@store/room/actions';
import Empty from '@components/elements/empty';
import Loader from '@components/elements/loader';

import './style.less';

function RoomList(props) {
  useInit(async () => {
    await room.fetchAll();
  });

  const select = useSelectorMap(state => ({
    items: state.room.items,
    wait: state.room.wait,
    errors: state.room.errors,
  }));

  const callbacks = {
    goToRoom: useCallback(async id => {
      props.history.push(`/rooms/${id}`);
    }, []),
  };

  const renderItems = useMemo(
    () => (
      <div>
        {chunk(select.items, 4).map((row, index) => {
          return (
            <Row key={index} gutter={[16, 24]}>
              {row.map(room => {
                return (
                  <Col key={room._id} span={6}>
                    <Card
                      title={room.title}
                      bordered={true}
                      hoverable
                      onClick={() => callbacks.goToRoom(room._id)}
                    >
                      {room.description}
                    </Card>
                  </Col>
                );
              })}
            </Row>
          );
        })}
      </div>
    ),
    [select.items],
  );

  return (
    <div className="room-list">
      <h1>CONFERENCE ROOMS</h1>
      {select.wait && <Loader />}
      {select.items.length === 0 && <Empty />}
      {select.items.length > 0 && renderItems}
    </div>
  );
}

export default React.memo(withRouter(RoomList));
