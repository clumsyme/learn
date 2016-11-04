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
    this.state = {
      squares:Array(9).fill(''),
      next: 1
    };
    this.handleClick = this.handleClick.bind(this)
  }
  renderSquare(i) {
    return <Square value={this.state.squares[i]} onClick={() => this.handleClick(i)}/>;
  }

  handleClick(i) {
    const squares = this.state.squares
    let next = this.state.next
    if (squares[i] != '') {
      return
    }
    squares[i] = next
    next = next===9?1:next+1
    this.setState({
      squares: squares,
      next: next,
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
  renderMinBoard(i) {
    return <MinBoard />;
  }

//   handleClick(i) {
//     // const squares = this.state.squares[i].slice();
//     // if (calculateWinner(squares) || squares[i]) {
//     //   return;
//     // }
//     // squares[i] = this.state.xIsNext ? 'X' : 'O';
//     this.setState({
//       squares: Array(9).fill(Array(9).fill('0')),
//       xIsNext: !this.state.xIsNext,
//     });
// }

  render() {
    return (
      <div className='board'>
        <div className="status">{status}</div>
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
