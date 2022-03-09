import { produce } from 'immer';
import { driverActionType } from './types';

const initialState = { data: [] };

export const driversReducer = produce((state = initialState, action) => {
  switch (action.type) {
    case driverActionType.SET_DRIVERS: {
      state.data = action.payload;
      return state;
    }

    default:
      return state;
  }
});
