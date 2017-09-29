import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import logo from './logo.svg';
import './App.css';

const ListRender = (props) => (
  [
    <h1 key="head">Wh's Wrg</h1>,
    <p key="content">Fine</p>,
    <i key="detail">{props.name}</i>
  ]
)

const StringRender = props => "a long time ago in a galaxy far, far away"

const Info = (props) => <h1>hello {props.name}</h1>
const Wev = (props) => `whatever ${props.name}`

const Wrapped = (Comp) => (
  class Infor extends Component {
    render() {
      return <Comp name="Just Me" />
    }
  }
)

const WrappedInfo = Wrapped(Info)
const WrappedWev = Wrapped(Wev)

const N5 = (Comp) => (
  (props) => (
    <Comp n="5" />
  )
)

const Bu = (props) => <button>{props.n}</button>
const Ln = (props) => <p>2<sup>{props.n}</sup></p>

const B5 = N5(Bu)
const T5 = N5(Ln)

const ErrorComp = (props) => (
  <input onChange={e => {
    if (e.target.value === 'hello') {
      throw new Error('Are you hello me??????')
    }
  }} />
)

// const WelcomeYou = Welcome('you')
class App extends Component {
  state = {
    error: '',
    hasError: false,
  }
  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: info,
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {
          this.state.hasError
          ?
          <details>
            <summary>错误啦</summary>
            <p>{this.state.error}</p>
          </details>
          :
          <ErrorComp />
        }
        <ListRender name="Obiwan" />
        <ListRender name="Anakin" />
        <Portals pid="portals">
          <h1>Whta's hte mettar 1</h1>
        </Portals>
        <ListRender name="Han" />
        <br />
        <hr />
        <div id="etf" />
        <StringRender />
        <WrappedInfo />
        <WrappedWev />
        <B5 />
        <T5 />
      </div>
    );
  }
}

class Portals extends Component {
  render() {
    console.warn(document.getElementById(this.props.pid))
    return ReactDOM.createPortal(
      this.props.children,
      document.getElementById(this.props.pid),
    )
  }
}



export default App;
