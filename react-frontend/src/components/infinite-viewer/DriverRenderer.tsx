import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDriverId } from 'store/slices/drivers/actions';
import {
  driversPathsSelector,
  selectedDriverIdSelector,
} from 'store/slices/drivers/selectors';
import { IDriver } from 'store/slices/drivers/types';

interface propTypes {
  driver: IDriver;
}

export const DriverRenderer = ({ driver }: propTypes) => {
  const dispatch = useDispatch();
  const { id } = driver;
  const { x, y } = driver.location;
  const selectedDriverId = useSelector(selectedDriverIdSelector);

  const driversPaths = useSelector(driversPathsSelector);

  const myPaths = driversPaths[id] ?? [];

  const isSelected = selectedDriverId === id;

  const renderPath = () => {
    let d = 'M ';

    myPaths.forEach(({ x, y }) => {
      d += `${x} ${y} `;
    });
    return (
      <path
        d={d}
        stroke="yellow"
        strokeOpacity="0.25"
        strokeWidth="5"
        fill="none"
      />
    );
  };

  const onClick = () => {
    dispatch(setSelectedDriverId(id));
  };

  return (
    <React.Fragment>
      {renderPath()}
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
