import React from 'react';
import './App.css';
import Juices from './components/Juices';

export default  function App(props) {
  return (
    <div className="App">
      <div className="App-header">
        <h2>React Juicer</h2>
      </div>
      <p className="App-intro">
        Let's make some juice!
      </p>
      <Juices />
    </div>
  );
}
