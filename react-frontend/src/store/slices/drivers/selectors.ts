import { IDrivers } from './types';

type driversSlice = { drivers: IDrivers };

export const driversSelector = (store: driversSlice) =>
  Object.values(store.drivers.data);
