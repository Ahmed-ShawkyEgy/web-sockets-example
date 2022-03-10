import React from 'react';
import { IDriver } from 'store/slices/drivers/types';

interface propTypes {
  driver: IDriver;
}

export const DriverRenderer = ({ driver }: propTypes) => {
  const { x, y } = driver.location;

  return (
    <React.Fragment>
      <circle cx={x} cy={y} r={10} stroke={'white'}></circle>
    </React.Fragment>
  );
};
