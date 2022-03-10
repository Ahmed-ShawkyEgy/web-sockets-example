import { createSelector } from 'reselect';
import { IDrivers } from './types';

type driversSlice = { drivers: IDrivers };

export const driversPathsSelector = (store: driversSlice) =>
  store.drivers.pathData;

export const driversSelector = (store: driversSlice) =>
  Object.values(store.drivers.data);

export const selectedDriverIdSelector = (store: driversSlice) =>
  store.drivers.selectedDriverId;

export const selectedDriverSelector = createSelector(
  [(store: driversSlice) => store.drivers.data, selectedDriverIdSelector],
  (drivers, id) => drivers[id ?? ''] ?? null
);
