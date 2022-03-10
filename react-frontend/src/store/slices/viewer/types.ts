export const viewerActionTypes = {
  SET_LOCATION: 'SET_LOCATION',
  SET_ZOOM: 'SET_ZOOM',
};

export interface IViewer {
  location: { x: number; y: number };
  zoom: number;
}
