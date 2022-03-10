import { driverActionType } from './types';
import { w3cwebsocket } from 'websocket';

let client: w3cwebsocket;

export const subscribeDrivers = () => (dispatch, getState) => {
  client = new w3cwebsocket('ws://localhost:8080/');
  client.onerror = (err) => {
    console.error(err);
  };
  client.onopen = () => {
    console.log('connection began');
    dispatch({ type: driverActionType.SUBSCRIBE_DRIVERS });
  };

  client.onmessage = (msgEvent) => {
    console.log(msgEvent);
    if (typeof msgEvent.data === 'string') {
      const payload = JSON.parse(msgEvent.data);
      dispatch({ type: driverActionType.SET_DRIVERS, payload });
    }
  };
};

export const unsubscribeDrivers = () => (dispatch, getState) => {
  if (client) {
    client.close();
  }
};

export const setSelectedDriverId = (id) => ({
  type: driverActionType.SET_SELECTED_DRIVER_ID,
  payload: id,
});
