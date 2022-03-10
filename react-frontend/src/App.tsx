import './App.scss';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeDrivers } from 'store/slices/drivers/actions';
import { Editor } from 'components/editor/Editor';
import { InfoPanel } from 'components/info-panel/InfoPanel';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subscribeDrivers());
  }, [dispatch]);
  return (
    <div className="App">
      <InfoPanel />
      <Editor />
    </div>
  );
};

export default App;
