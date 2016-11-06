import React, { Component } from 'react';
// import logo from './logo.svg';
import sudokus from './Sudokus'

class Square extends Component {
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Row extends Component {
  renderSquare(j) {
    return <Square value={this.props.values[j]} onClick={() => this.props.onClick(j)}/>;
  }
  render() {
    return (
      <div className='row'>
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
                onClick={(j) => this.props.onClick(i, j)} />;
  }
  render() {
    return (
      <div className='board'>
        <div className="playboard">
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
      </div>
    );
  }
}


class Game extends Component {
  constructor(props) {
    super(props)
    var random = Math.floor(Math.random() * 8),
    grid = sudokus.easy[random],
    sudoku = new SudokuGenerator(grid).generate()
    this.state = {
      values:sudoku[0],
      solution:sudoku[1],
      current:null
    }
  }

  renderNumSquare(i) {
    return <Square value={i} onClick={() => this.handleNumsClick(i)} />
  }

  handleNumsClick(i) {
    this.setState(
      {current: i}
    )
  }

  handleClick(i, j) {
    var values = this.state.values.slice()
    var thisvalue = values[i].slice()
    let current = this.state.current
    console.log(thisvalue, current)
    if (thisvalue[j] !== null) {
      return
    }
    thisvalue[j] = current
    values[i] = thisvalue
    this.setState({
      values: values,
      current: null
    });    
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
    }
    var random = Math.floor(Math.random() * 8)
    var grid = puzzles[random],
    sudoku = new SudokuGenerator(grid).generate(),
    puzzle = sudoku[0],
    solution = sudoku[1]
    console.log(puzzle)
    this.setState ({
        values:puzzle,
        solution:solution,
        current:null
    })
  }
  solve() {
      var solution = this.state.solution
      this.setState({
          values:solution
      })
  }
  render() {
    return (
      <div className="game">
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
        </div>
        <div className="game-board">
          <Board values={this.state.values}  onClick={(i, j) => this.handleClick(i, j)}/>
        </div>
        <div className="degree">
            <button className="easy" onClick={() => this.generate('veryeasy')}>veryeasy</button>
            <button className="mid" onClick={() => this.generate('easy')}>easy</button>
            <button className="hard" onClick={() => this.generate('medium')}>medium</button>
            <button className="easy" onClick={() => this.generate('tough')}>hard</button>
            <button className="mid" onClick={() => this.generate('verytough')}>veryhard</button>
            <button className="hard" onClick={() => this.generate('extreme')}>extreme</button>
            <button className="solve" onClick={() => this.solve()}>Solve</button>
        </div>
        <div className="game-info">
          <div>{/* */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
export default Game

// ========================================

class SudokuGenerator {
    constructor(grid) {
        this.grid = grid
        this.nums = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
        this.chars = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
    }
    shuffleArray(array) {
        for (let i = array.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [array[i - 1], array[j]] = [array[j], array[i - 1]];
        }
    }
    shuffleGrid() {
        var nums, chars, shuffledNums, shuffledChars,
            index1, index2, index3, index, rotate,
            numMap, charMap, tempGrid, grid
        grid = this.grid
        nums = this.nums.slice()
        chars = this.chars.slice()
        index1 = [0, 1, 2]
        index2 = [3, 4, 5]
        index3 = [6, 7, 8]
        // shuffle symbols
        shuffledNums = nums.slice()
        shuffledChars = []
        this.shuffleArray(shuffledNums)
        for (let num of shuffledNums) {
            shuffledChars.push(chars[parseInt(num, 10)-1])
        }
        numMap = new Map()
        charMap = new Map()
        for (let i=0; i<9; i++) {
            numMap.set(nums[i], shuffledNums[i])
        }
        for (let i=0; i<9; i++) {
            charMap.set(chars[i], shuffledChars[i])
        }
        tempGrid = ''
        for (let c of grid) {
            if (numMap.has(c)) {
                tempGrid += numMap.get(c)
            }else {
                tempGrid += charMap.get(c)
            }
        }
        grid = tempGrid
        // shuffle rows
        this.shuffleArray(index1)
        this.shuffleArray(index2)
        this.shuffleArray(index3)
        index = index1.concat(index2).concat(index3)
        tempGrid = ''
        for (let i of index) {
            tempGrid += grid.slice(i*9, i*9+9)
        }
        grid = tempGrid
        // shuffle cols
        this.shuffleArray(index1)
        this.shuffleArray(index2)
        this.shuffleArray(index3)
        index = index1.concat(index2).concat(index3)
        tempGrid = ''
        for (let i = 0; i<9; i++) {
            for (let j of index){
                tempGrid += grid.slice(i*9, i*9+9)[j]
            }
        }
        grid = tempGrid
        // shuffle blockRows
        this.shuffleArray(index1)
        tempGrid = ''
        for (let i of index1) {
            tempGrid += grid.slice(i*3*9, i*3*9+27)
        }
        grid = tempGrid
        // shuffle blockCols
        this.shuffleArray(index1)
        tempGrid = ''
        for (let i = 0; i < 9; i++) {
            for (let j of index1){
                tempGrid += grid.slice(i*9, i*9+9).slice(j*3, j*3+3)
            }
        }
        grid = tempGrid
        // rotate left | none | right
        tempGrid = ''
        rotate = [-1, 0, 1][Math.floor(Math.random()*3)]
        if (rotate === 0){

        }else if (rotate === -1) {
            for (let i = 8; i >= 0; i--) {
                for (let j = 0; j <=8; j++) {
                    tempGrid += grid[j*9+i]
                }
            }
            grid = tempGrid
        }else {
            for (let i = 0; i <= 8; i++) {
                for (let j = 8; j >= 0; j--) {
                    tempGrid += grid[j*9+i]
                }
            }
            grid = tempGrid
        }
        return grid
    }

    generate() {
        var numSet = new Set(this.nums)
        var charSet = new Set(this.chars)
        var map = new Map()
        for (let i = 0; i <= 8; i++) {
            map.set(this.chars[i], this.nums[i])
        }
        var pattern = this.shuffleGrid()
        console.log(pattern)
        var puzzle = []
        for (let i = 0; i <= 8; i++) {
            let row = []
            for (let j = 0; j <= 8; j++) {
                if (numSet.has(pattern[9*i+j])) {
                    row.push(pattern[9*i+j])
                }else {
                    row.push(null)
                }
            }
            puzzle.push(row)
        }
        var solution = []
        for (let i = 0; i <= 8; i++) {
            let row = []
            for (let j = 0; j <= 8; j++) {
                if (charSet.has(pattern[9*i+j])) {
                    row.push(map.get(pattern[9*i+j]))
                }else {
                    row.push(pattern[9*i+j])
                }
            }
            solution.push(row)
        }
        return [puzzle, solution]
    }
}