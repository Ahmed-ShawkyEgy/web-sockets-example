import { produce } from 'immer';
import { viewerActionTypes, IViewer } from './types';

const initialState: IViewer = { location: { x: 0, y: 0 }, zoom: 1 };

export const viewerReducer = produce(
  (state: IViewer = initialState, action) => {
    switch (action.type) {
      case viewerActionTypes.SET_LOCATION: {
        state.location = { ...state.location, ...action.payload };
        return state;
      }

      case viewerActionTypes.SET_ZOOM: {
        state.zoom = action.payload;
        return state;
      }

      default:
        return state;
    }
  }
);
