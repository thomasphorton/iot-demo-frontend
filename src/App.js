import React, { Component } from 'react';
import SubWindow from './SubWindow';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>IoT Card Reader</h1>
        <SubWindow />
      </div>
    );
  }
}

export default App;
