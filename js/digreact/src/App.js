import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class WelcomeMe extends Component {
  render() {
    return <h1>Welcome Yan.</h1>
  }
}
class WelcomeWho extends Component {
  render() {
    return <h1>Who Are You?</h1>
  }
}
class Welcome extends Component {
  constructor(props) {
    super(props)
    this.state = {isMe: false}
  }
  render() {
    if (this.state.isMe) {
      return (
        <div>
          <WelcomeMe />
        </div>
      )
    }
    return (
      <div>
        <WelcomeWho />
      </div>
    )
  }
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Welcome />
      </div>
    );
  }
}

export default App;
