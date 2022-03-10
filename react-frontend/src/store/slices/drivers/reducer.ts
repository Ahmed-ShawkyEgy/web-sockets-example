import { produce } from 'immer';
import { driverActionType, IDrivers } from './types';

const MAX_PATH_LENGTH = 10;

const initialState: IDrivers = {
  data: {},
  selectedDriverId: null,
  pathData: {},
};

export const driversReducer = produce(
  (state: IDrivers = initialState, action) => {
    switch (action.type) {
      case driverActionType.SET_DRIVERS: {
        const drivers = action.payload ?? {};
        state.data = { ...state.data, ...drivers };

        // Push new drivers locations to their history
        for (let driver of Object.values(state.data ?? {})) {
          const id = driver.id;
          if (!drivers[id]) continue;
          if (!state.pathData[id]) state.pathData[id] = [];
          const newLocation: any = drivers[id].location;
          state.pathData[id].push(newLocation);
          if (state.pathData[id].length > MAX_PATH_LENGTH)
            state.pathData[id].shift();
        }
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
