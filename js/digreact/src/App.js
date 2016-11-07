import React, { Component } from 'react';
import sudokus from './Sudokus'

class Square extends Component {
  render() {
    return (
      <button className={this.props.className} onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

class Row extends Component {
  renderSquare(j) {
    return <Square className='square' value={this.props.values[j]} onClick={() => this.props.onClick(j)}/>;
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


class Game extends Component {
  constructor(props) {
    super(props)
    var random = Math.floor(Math.random() * 8),
    grid = sudokus.easy[random],
    sudoku = new SudokuGenerator(grid).generate()
    this.state = {
      values:sudoku[0],
      solution:sudoku[1],
      solved: false,
      current:null,
      possible:null
    }
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

  renderNumSquare(i) {
    return <Square draggable='true' className="choice" value={i} onClick={() => this.handleNumsClick(i)} />
  }

  handleNumsClick(i) {
    this.setState(
      {current: '' + i}
    )
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

  handleClick(i, j) {
    var values = this.state.values.slice()
    var thisvalue = values[i].slice()
    let current = this.state.current
    if (thisvalue[j] !== null) {
      return
    }
    this.checkPossible(i, j)
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
        current:null
    })
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
  render() {
    return (
      <div className="game">
        <div className="choices">
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
        <Board values={this.state.values} onClick={(i, j) => this.handleClick(i, j)}/>
        <ul className="controls">
            <li className="degree" value="veryeasy" onClick={() => this.generate('veryeasy')} >veasy</li>
            <li className="degree" value="easy" onClick={() => this.generate('easy')} >easy</li>
            <li className="degree" value="medium" onClick={() => this.generate('medium')} >medium</li>
            <li className="degree" value="hard" onClick={() => this.generate('tough')} >hard</li>
            <li className="degree" value="veryhard" onClick={() => this.generate('verytough')} >vhard</li>
            <li className="degree" value="extreme" onClick={() => this.generate('extreme')} >hell</li>
            <li className="solve" value="Solve" onClick={() => this.hint()} >hint</li>
            <li className="solve" value="Solve" onClick={() => this.solve()} >showans</li>
        </ul>
        <div className="game-info">
          <p className="possible" value={this.state.possible}>{this.state.possible}</p>
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