export interface IDriver {
  id: string;
  driverName: string;
  driverCityOrigin: string;
  driverLanguage: 'de' | 'en' | 'nl' | 'fr' | 'es' | 'ar';
  driverPhone: string;
  driverGender: 'male' | 'female';
  driverInfo: string;
  carMake: string;
  kmDriven: number;
  location: { x: number; y: number };
}

export interface IDrivers {
  data: { [id: string]: IDriver };
  selectedDriverId: string | null;
}

export const driverActionType = {
  SUBSCRIBE_DRIVERS: 'SUBSCRIBE_DRIVERS',
  UNSUBSCRIBE_DRIVERS: 'UNSUBSCRIBE_DRIVERS',
  SET_DRIVERS: 'SET_DRIVERS',
  SET_SELECTED_DRIVER_ID: 'SET_SELECTED_DRIVER_ID',
};
