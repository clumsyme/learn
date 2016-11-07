import React, { Component } from 'react';
import sudokus from './Sudokus'
import SudokuGenerator from './SudokuGenerator'

class Square extends Component {
  render() {
    return (
      <button style={this.props.style} className={this.props.className} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Row extends Component {
  renderSquare(j) {
    var squareStyle,
    i = this.props.row
    if (this.props.highlight.has(parseFloat(i + '.' + j))) {
      squareStyle = this.props.styles.highlight
    }
    if (this.props.filter.has(parseFloat(i + '.' + j))) {
      squareStyle = this.props.styles.filter
    }
    if (parseFloat(i + '.' + j) === this.props.chosen) {
      squareStyle = this.props.styles.chosen
    }
    return <Square style={squareStyle} 
                   className='square' 
                   row={this.props.row}
                   col={j}
                   value={this.props.values[j]} 
                   onClick={() => this.props.onClick(j)}/>;
  }
  render() {
    return (
      <div style={this.props.style} className='row'>
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
      </div>
    );
  }
}

class Board extends Component {
  renderRow(i) {
    return <Row values={this.props.values[i]}
                row={i}
                styles={this.props.styles}
                filter={this.props.filter}
                highlight={this.props.highlight}
                chosen={this.props.chosen}
                onClick={(j) => this.props.onClick(i, j)} />;
  }
  render() {
    return (
      <div className='board'>
          {this.renderRow(0)}
          {this.renderRow(1)}
          {this.renderRow(2)}
          {this.renderRow(3)}
          {this.renderRow(4)}
          {this.renderRow(5)}
          {this.renderRow(6)}
          {this.renderRow(7)}
          {this.renderRow(8)}
      </div>
    );
  }
}

class Control extends Component {
    render() {
        return (
            <li className={this.props.className} onClick={() => this.props.onClick()}>
                {this.props.value}
            </li>
        )
    }
}
// class Menu extends Component {
//     renderControl(className, value) {
//         return <Control className={className} value={value} />
//     }
//     render
// }
class Game extends Component {
  constructor(props) {
    super(props)
    var random = Math.floor(Math.random() * 8),
    grid = sudokus.easy[random],
    sudoku = new SudokuGenerator(grid).generate()
    this.styles = {
        highlight: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: '#00FF00',
        },
        filter: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            color: '#0000FF',
        },
        chosen: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: '#0000FF',
        }
    }
    this.state = {
      values:sudoku[0],
      solution:sudoku[1],
      solved: false,
      current:null,
      possible:null,
      chosen:null,
      filter: new Set(),
      highlight:new Set()
    }
  }
  generate(degree) {
    let puzzles
    switch (degree){
        case 'veryeasy':
            puzzles = sudokus.veryeasy
            break
        case 'easy':
            puzzles = sudokus.easy
            break
        case 'medium':
            puzzles = sudokus.medium
            break
        case 'tough':
            puzzles = sudokus.tough
            break
        case 'verytough':
            puzzles = sudokus.verytough
            break
        case 'extreme':
            puzzles = sudokus.extreme
            break 
        default:
            puzzles = sudokus.easy  
    }
    var random = Math.floor(Math.random() * 8)
    var grid = puzzles[random],
    sudoku = new SudokuGenerator(grid).generate(),
    puzzle = sudoku[0],
    solution = sudoku[1]
    this.setState ({
        values:puzzle,
        solution:solution,
        current:null,
        chosen:null,
        filter:new Set(),
        highlight:new Set()
    })
  }
  checkPossible(i, j) {
      var values = this.state.values
      console.log(values[i])
      var allPossible = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
      var n = (Math.floor(i/3) * 3 + Math.floor(j/3))
      for (let k = 0; k <= 8; k++) {
          if (allPossible.has(values[i][k])) {
              allPossible.delete(values[i][k])
          }
      }
      for (let k = 0; k <= 8; k++) {
          if (allPossible.has(values[k][j])) {
              allPossible.delete(values[k][j])
          }
      }
      var bi = Math.floor(n / 3) * 3,
      bj = (n % 3) * 3
      for (let m = bi; m < bi+3; m++) {
          for (let n = bj; n < bj+3; n++){
              if (allPossible.has(values[m][n])) {
              allPossible.delete(values[m][n])
              }
          }
      }
      this.setState({
          possible:Array.from(allPossible)
      })
      return Array.from(allPossible)
  }
  filter(value) {
      var values = this.state.values
      var filter = new Set()
      for (let m = 0; m < 9; m++) {
          for (let n = 0; n < 9; n++) {
              console.log(values[m][n])
              if (values[m][n] === value) {
                  filter.add(parseFloat(m + '.' + n))
              }
          }
      }
      this.setState({
          filter: filter,
          highlight: new Set(),
          chosen: null
      })
  }
  highlight(i, j) {
    var highlight = new Set()
    for (let k = 0; k < 9; k++) {
        highlight.add(parseFloat(i + '.' + k))
    }
    for (let k = 0; k < 9; k++) {
        highlight.add(parseFloat(k + '.' + j))
    }
    var line = Math.floor(i / 3) * 3,
    row = Math.floor(j / 3) * 3
    for (let ln = line; ln < line + 3; ln++) {
        for (let r = row; r < row + 3; r++) {
            highlight.add(parseFloat(ln + '.' + r))
        }
    }
    this.setState({
        highlight: highlight,
        filter: new Set(),
        chosen: null
    })
  }
  hint() {
      var possibles = []
      for (let i = 0; i < 9; i++) {
          for (let j = 0; j < 9; j++) {
              if (this.state.values[i][j]) {
                  continue
              }
              let possible = this.checkPossible(i, j)
              if (possible.length === 1) {
                  possibles.push('第' + (i+1) + '行第' + (j+1) + '列是' + possible)
              }
          }
      }
      alert(possibles[0])
  }
  solve() {
      var values = this.state.values,
      solution = this.state.solution,
      solved = this.state.solved
      this.setState({
            values:solution,
            solution:values,
            solved:!solved
        })
  }
  handleClick(i, j) {
    var values = this.state.values.slice()
    var thisvalue = values[i].slice()
    if (thisvalue[j] !== null) {
      this.filter(thisvalue[j])
      return
    }
    if (!this.state.current) {
      this.highlight(i, j)
    }
    let current = this.state.current
    this.checkPossible(i, j)
    thisvalue[j] = current
    values[i] = thisvalue
    this.setState({
      values: values,
      current: null,
      chosen:parseFloat(i + '.' + j)
    });    
  }
  handleNumsClick(i) {
    this.filter('' + i)
    this.setState(
      {current: '' + i}
    )
  }
  renderChoice(i) {
    return <Control className="choice" value={i} onClick={() => this.handleNumsClick(i)} />
  }
  renderControl(value) {
    return <Control className="degree" value={value} onClick={() => this.generate(value)} />
  }
  render() {
    return (
      <div className="game">
        <ul className="choices">
          {this.renderChoice(1)}
          {this.renderChoice(2)}
          {this.renderChoice(3)}
          {this.renderChoice(4)}
          {this.renderChoice(5)}
          {this.renderChoice(6)}
          {this.renderChoice(7)}
          {this.renderChoice(8)}
          {this.renderChoice(9)}
        </ul>
        <Board values={this.state.values}
               filter={this.state.filter}
               styles={this.styles}
               chosen={this.state.chosen}
               highlight={this.state.highlight}   
               onClick={(i, j) => this.handleClick(i, j)}/>
        <ul className="controls">
          {this.renderControl("veryeasy")}
          {this.renderControl("easy")}
          {this.renderControl("medium")}
          {this.renderControl("tough")}
          {this.renderControl("verytough")}
          {this.renderControl("extreme")}
          <Control className="hint" value="Hint" onClick={() => this.hint()} />
          <Control className="solve" value="Solve" onClick={() => this.solve()} />
        </ul>
        <div className="game-info">
          <p className="possible" value={this.state.possible}>{this.state.possible}</p>
        </div>
      </div>
    );
  }
}
export default Game
