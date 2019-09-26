import React, { Component } from 'react';
import Card from './Card';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>IoT Card Reader</h1>
        <Card />
      </div>
    );
  }
}

export default App;
