import { produce } from 'immer';
import { driverActionType, IDrivers } from './types';

const initialState: IDrivers = { data: {}, selectedDriverId: null };

export const driversReducer = produce(
  (state: IDrivers = initialState, action) => {
    switch (action.type) {
      case driverActionType.SET_DRIVERS: {
        const drivers = action.payload ?? {};
        state.data = { ...state.data, ...drivers };
        return state;
      }

      case driverActionType.SET_SELECTED_DRIVER_ID: {
        state.selectedDriverId = action.payload;
        return state;
      }

      default:
        return state;
    }
  }
);
