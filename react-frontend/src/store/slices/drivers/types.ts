export interface IDriver {
  driverName: string;
  driverCityOrigin: string;
  driverLanguage: string;
  driverPhone: string;
  driverGender: string;
  driverInfo: string;
  carMake: string;
  kmDriven: number;
  location: { x: number; y: number };
}

export const driverActionType = {
  SUBSCRIBE_DRIVERS: 'SUBSCRIBE_DRIVERS',
  UNSUBSCRIBE_DRIVERS: 'UNSUBSCRIBE_DRIVERS',
  SET_DRIVERS: 'SET_DRIVERS',
};
