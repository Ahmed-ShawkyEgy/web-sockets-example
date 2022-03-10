import { IViewer } from './types';

type viewerSlice = { viewer: IViewer };

export const viewerLocSelector = (store: viewerSlice) => store.viewer.location;

export const viewerZoomSelector = (store: viewerSlice) => store.viewer.zoom;
