import { produce } from 'immer';
import { driverActionType, IDrivers } from './types';

const initialState: IDrivers = { data: {} };

export const driversReducer = produce(
  (state: IDrivers = initialState, action) => {
    switch (action.type) {
      case driverActionType.SET_DRIVERS: {
        const drivers = action.payload ?? {};
        state.data = { ...state.data, ...drivers };
        return state;
      }

      default:
        return state;
    }
  }
);
