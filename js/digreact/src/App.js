import React, { Component } from 'react';
// import logo from './logo.svg';

class Square extends Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class MinBoard extends Component {
  constructor() {
    super();
    // this.state = {
    //   squares:Array(9).fill(null)
    // };
    this.handleClick = this.handleClick.bind(this)
  }
  renderSquare(j) {
    return <Square value={this.props.values[this.props.index][j]} onClick={() => this.handleClick(j)}/>;
  }

  handleClick(j) {
    const values = this.props.values.slice()
    console.log(values)
    let current = this.props.current,
    index = this.props.index,
    setBoardState = this.props.setBoardState
    if (values[index][j] != null) {
      return
    }
    values[index][j] = current
    setBoardState({
      values: values,
      current: current
    });    
  }

  render() {
    return (
      <div className='mboard'>
        <div className="mboard-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="mboard-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="mboard-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Board extends Component {
  constructor(props) {
    super(props)
    var array = new Array(9).fill(null)
    this.state = {
      values: [array.slice(), array.slice(), array.slice(), 
               array.slice(), array.slice(), array.slice(),
               array.slice(), array.slice(), array.slice(),
               ],
      current:null
    }
    this.setState = this.setState.bind(this)
  }
  renderMinBoard(i) {
    return <MinBoard values={this.state.values}
                     current={this.state.current}
                     index={i}
                     setBoardState={this.setState}
                     onClick={() => this.handleClick(i)}/>;
  }
  renderNumSquare(i) {
    return <Square value={i} onClick={() => this.handleNumsClick(i)} />
  }
  handleNumsClick(i) {
    this.setState(
      {current: i}
    )
  }

  render() {
    return (
      <div className='board'>
        <div className="nums">
          {this.renderNumSquare(1)}
          {this.renderNumSquare(2)}
          {this.renderNumSquare(3)}
          {this.renderNumSquare(4)}
          {this.renderNumSquare(5)}
          {this.renderNumSquare(6)}
          {this.renderNumSquare(7)}
          {this.renderNumSquare(8)}
          {this.renderNumSquare(9)}
        </div><br />
        <div className="board-row">
          {this.renderMinBoard(0)}
          {this.renderMinBoard(1)}
          {this.renderMinBoard(2)}
        </div>
        <div className="board-row">
          {this.renderMinBoard(3)}
          {this.renderMinBoard(4)}
          {this.renderMinBoard(5)}
        </div>
        <div className="board-row">
          {this.renderMinBoard(6)}
          {this.renderMinBoard(7)}
          {this.renderMinBoard(8)}
        </div>
      </div>
    );
  }
}


class Game extends Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
export default Game

// ========================================

// ReactDOM.render(
//   <Game />,
//   document.getElementById('container')
// );

// function calculateWinner(squares) {
//   const lines = [
//     [0, 1, 2],
//     [3, 4, 5],
//     [6, 7, 8],
//     [0, 3, 6],
//     [1, 4, 7],
//     [2, 5, 8],
//     [0, 4, 8],
//     [2, 4, 6],
//   ];
//   for (let i = 0; i < lines.length; i++) {
//     const [a, b, c] = lines[i];
//     if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
//       return squares[a];
//     }
//   }
//   return null;
// }
