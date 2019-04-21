import React, { Component } from 'react';
import './App.css';
import TripSearchPage from './components/TripSearch/TripSearchPage';

class App extends Component {
  render() {
    return (
      <div className="App">          
        <TripSearchPage />
      </div>
    );
  }
}

export default App;
