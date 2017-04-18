import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import * as styles from './styles'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro" style={styles.ellipsis}>
          1. polished.ellipsis with width of 200px
        </p>
        <div style={styles.size}>
          Size and Darken
        </div>
        <div style={styles.invert}>
          Size and Invert
        </div>
        <div style={styles.borders}>
          borders
        </div>
      </div>
    );
  }
}

export default App;
