import './InfoPanel.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import { selectedDriverSelector } from 'store/slices/drivers/selectors';
import { FcBusinessman, FcBusinesswoman } from 'react-icons/fc';
import { IoLocationOutline } from 'react-icons/io5';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { AiFillCar } from 'react-icons/ai';
import { IoIosSpeedometer } from 'react-icons/io';
import { FaRulerHorizontal, FaRulerVertical } from 'react-icons/fa';

export const InfoPanel = () => {
  const driver = useSelector(selectedDriverSelector);

  if (!driver)
    return (
      <div className="info-panel empty">
        <h1>Click on a driver to view their info</h1>
      </div>
    );

  const renderSex = () => {
    const sex = driver.driverGender;

    return sex === 'male' ? (
      <FcBusinessman size={26} />
    ) : (
      <FcBusinesswoman size={26} />
    );
  };

  return (
    <div className="info-panel">
      <div className="header">
        <div className="sex">{renderSex()}</div>
        <div className="title">
          <div className="name">{driver.driverName}</div>
          <div className="info">{driver.driverInfo}</div>
        </div>
      </div>

      <div className="row">
        <IoLocationOutline /> {driver.driverCityOrigin}
      </div>

      <div className="row">
        <BsFillTelephoneFill /> {driver.driverPhone}
      </div>

      <div className="row">
        <AiFillCar /> {driver.carMake}
      </div>

      <div className="row">
        <IoIosSpeedometer />
        {formatNumber(driver.kmDriven)} KM
      </div>

      <div className="row co-ordinates">
        <div className="title">Position:</div>
        <div className="positions">
          <div>
            <FaRulerHorizontal />
            {formatNumber(driver.location.x) + ' m'}
          </div>
          <div>
            <FaRulerVertical />
            {formatNumber(driver.location.y) + ' m'}
          </div>
        </div>
      </div>
    </div>
  );
};

const formatNumber = (inputNumber) => {
  let formattedNumber = Number(inputNumber)
    .toFixed(2)
    .replace(/\d(?=(\d{3})+\.)/g, '$&,');
  let splitArray = formattedNumber.split('.');
  if (splitArray.length > 1) {
    formattedNumber = splitArray[0];
  }
  return formattedNumber;
};
