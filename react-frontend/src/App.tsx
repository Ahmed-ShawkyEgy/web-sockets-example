import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeDrivers } from 'store/slices/drivers/actions';
import { InfiniteViewerWrapper } from 'components/infinite-viewer/InfiniteViewer';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subscribeDrivers());
  }, [dispatch]);
  return (
    <div className="App">
      <InfiniteViewerWrapper />
    </div>
  );
};

export default App;
