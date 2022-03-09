import './App.css';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { subscribeDrivers } from 'store/slices/drivers/actions';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(subscribeDrivers());
  }, [dispatch]);
  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
