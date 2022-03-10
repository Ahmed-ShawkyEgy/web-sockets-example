import { viewerActionTypes } from './types';

export const setViewerLocationX = (v) => ({
  type: viewerActionTypes.SET_LOCATION,
  payload: { x: v },
});

export const setViewerLocationY = (v) => ({
  type: viewerActionTypes.SET_LOCATION,
  payload: { y: v },
});

export const setViewerLocation = (x, y) => ({
  type: viewerActionTypes.SET_LOCATION,
  payload: { x, y },
});

export const setViewerZoom = (v) => ({
  type: viewerActionTypes.SET_ZOOM,
  payload: v,
});
