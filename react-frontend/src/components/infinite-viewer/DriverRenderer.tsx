import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDriverId } from 'store/slices/drivers/actions';
import { selectedDriverIdSelector } from 'store/slices/drivers/selectors';
import { IDriver } from 'store/slices/drivers/types';

interface propTypes {
  driver: IDriver;
}

export const DriverRenderer = ({ driver }: propTypes) => {
  const dispatch = useDispatch();
  const { id } = driver;
  const { x, y } = driver.location;
  const selectedDriverId = useSelector(selectedDriverIdSelector);

  const isSelected = selectedDriverId === id;

  const onClick = () => {
    dispatch(setSelectedDriverId(id));
  };

  return (
    <React.Fragment>
      <circle
        cx={x}
        cy={y}
        r={20}
        stroke={isSelected ? '#0094ff' : 'white'}
        fill="#0094ff"
        fillOpacity={isSelected ? 0.4 : 0}
        onClick={onClick}
      ></circle>
    </React.Fragment>
  );
};
