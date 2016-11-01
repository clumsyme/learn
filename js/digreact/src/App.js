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
    this.changeState = this.changeState.bind(this)
  }
  changeState() {
    this.setState((prevState, props) => ({
        isMe: !prevState.isMe
      })
    )
  }
  render() {
    let isMe = this.state.isMe
    return (
      <div >
        <button className={'change'} onClick={this.changeState}>Change</button>
        {isMe?(<WelcomeMe />):(<WelcomeWho />)}
      </div>
    )
  }
}

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {value: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(event) {
    this.setState({value: event.target.value})
  }
  handleSubmit(event) {
    alert('Fruit ' + this.state.value + ' Chosen!')
  }
  render() {
    return (
      <div>
        <input
         type='text'
         placeholder='Which Fruit...' 
         value={this.state.value} 
         onChange={this.handleChange} 
        />
        <button onClick={this.handleSubmit}>
          Submitt
        </button>
      </div>
    )
  }
}

function FruitList() {
  const fruits = ['Apple', 'Pears', 'Peach']
  const flist = fruits.map((fruit, index) =>
    <li key={fruit.toString()}>{fruit}</li>
  )
  return (
    <ul>{flist}</ul>
  )
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
        <Form />
        <FruitList />
      </div>
    );
  }
}

export default App;
