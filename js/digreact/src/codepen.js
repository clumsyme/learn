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

const sudokus = {   
    easy: "39AHG6DEBE2GC1D6IHF48EIBCAG8A3BDGEFI7FI1EHBC425DIFCH7AIHBG35AD6ACFD89G25DGEF2AI83",
    medium: "4E6AIHG23G8CBFDAEI1I257CFHD5GIF32D1HB6H4AECIG3DAG8I5FBHA53BG9D6F2GIDAH3EIC4HE6BG1",
    hard: "H7I1EF2DCEA4CIBHG63FBH7DEAIBHG4CEFI11DFGH93BEIC5BFAD8G4ECI1HG6BG2AFD39EHFI85BGAC4"
}


class Square extends React.Component {
    render() {
        return (
            <button style={this.props.style} className={this.props.className} onClick={() => this.props.onClick()}>
                {this.props.value}
            </button>
        );
    }
}

class Row extends React.Component {
    renderSquare(j) {
        var squareStyle,
            i = this.props.row,
            cord = i + '.' + j,
            chosen = this.props.chosen
        if (this.props.origin.has(cord)) {
            if (this.props.highlight.has(cord)) {
                squareStyle = this.props.styles.originHighlight
            } else if (this.props.filter.has(cord)) {
                squareStyle = this.props.styles.originFilter
            } else {
                squareStyle = this.props.styles.origin
            }
        } else {
            if (this.props.highlight.has(cord)) {
                squareStyle = this.props.styles.highlight
            }
            if (this.props.filter.has(cord)) {
                squareStyle = this.props.styles.filter
            }
        }
        if (chosen && (cord === chosen[0] + '.' + chosen[1])) {
            squareStyle = this.props.styles.chosen
        }
        return <Square style={squareStyle}
            className='square'
            row={this.props.row}
            col={j}
            value={this.props.values[j]}
            onClick={() => this.props.onClick(j)} />;
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

class Board extends React.Component {
    renderRow(i) {
        return <Row values={this.props.values[i]}
            origin={this.props.origin}
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
class Control extends React.Component {
    render() {
        return (
            <li style={this.props.style} className={this.props.className} onClick={() => this.props.onClick()}>
                {this.props.value}
            </li>
        )
    }
}
class Game extends React.Component {
    constructor(props) {
        super(props)
        var grid = sudokus.easy,
        sudoku = new SudokuGenerator(grid).generate(),
        puzzle = sudoku[0]
        this.solution = sudoku[1]
        const origin = new Set()
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (puzzle[i][j]) {
                    origin.add(i + '.' + j)
                }
            }
        }
        this.styles = {
            highlight: {
                backgroundColor: 'rgba(52, 168, 83, 0.2)',
                animation: 'highlight 2s'
            },
            filter: {
                boxShadow: '3px 3px 1px rgba(0, 0, 0, 0.8)',
                backgroundColor: 'rgba(255, 13, 126, 0.2)',
                color: '#4285f4',
            },
            chosen: {
                backgroundColor: 'rgba(155, 204, 20, 0.3)',
            },
            origin: {
                backgroundColor: 'rgba(200, 200, 200, 0.1)',
                color: '#ea4335'
            },
            originHighlight: {
                backgroundColor: 'rgba(52, 168, 83, 0.2)',
                color: '#ea4335'
            },
            originFilter: {
                backgroundColor: 'rgba(255, 13, 126, 0.2)',
                color: '#ea4335'
            },
            control: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ea4335'
            },
            peep: {
                backgroundColor: 'rgba(251, 188, 5, 0.2)'
            },
            check: {
                filter: 'blur(0)'
            },
            conflict: {
                backgroundColor: 'rgba(255, 0, 0, 0.1)',
                fontWeight: 800
            },
            originConflict: {
                backgroundColor: 'rgba(255, 0, 0, 0.3)',
                color: '#ea4335'
            },
            chosenConflict: {
                backgroundColor: 'rgba(255, 0, 0, 0.6)',
                fontWeight: 800
            },
            hint: [
                {
                    transition: 'background-color 0.5s',
                    backgroundColor: 'rgba(52, 168, 83, 0.2)'
                },
                {
                    transition: 'background-color 0.5s',
                    backgroundColor: 'rgba(251, 188, 5, 0.2)'
                },
                {
                    transition: 'background-color 0.5s',
                    backgroundColor: 'rgba(255, 13, 126, 0.2)'
                }
            ]
        }
        this.state = {
            values: puzzle,
            level: 'EASY',
            origin: origin,
            peep: false,
            possible: null,
            chosen: null,
            filter: new Set(),
            highlight: new Set(),
            conflict: new Set(),
            check: false,
            helps: 3
        }
    }
    generate(level) {
        let puzzles
        switch (level) {
            case 'EASY':
                puzzle = sudokus.easy
                break
            case 'MEDIUM':
                puzzle = sudokus.medium
                break
            case 'HARD':
                puzzle = sudokus.hard
                break
            default:
                puzzle = sudokus.easy
        }
        var sudoku = new SudokuGenerator(puzzle).generate(),
            puzzle = sudoku[0]
        this.solution = sudoku[1]
        const origin = new Set()
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (puzzle[i][j]) {
                    origin.add(i + '.' + j)
                }
            }
        }
        this.setState({
            values: puzzle,
            level: level,
            peep: false,
            origin: origin,
            chosen: null,
            possible: null,
            filter: new Set(),
            highlight: new Set(),
            conflict: new Set(),
            check: false,
            helps: 3
        })
    }
    checkPossible(i, j) {
        var values = this.state.values
        var allPossible = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
        for (let k = 0; k <= 8; k++) {
            if (k === j) {continue}
            if (allPossible.has(values[i][k])) {
                allPossible.delete(values[i][k])
            }
        }
        for (let k = 0; k <= 8; k++) {
            if (k === i) {continue}
            if (allPossible.has(values[k][j])) {
                allPossible.delete(values[k][j])
            }
        }
        var bi = Math.floor(i / 3) * 3,
            bj = Math.floor(j / 3) * 3
        for (let m = bi; m < bi + 3; m++) {
            for (let n = bj; n < bj + 3; n++) {
                  if (m === i && n === j) {
                      continue
                  }
                if (allPossible.has(values[m][n])) {
                    allPossible.delete(values[m][n])
                }
            }
        }
        return allPossible
    }
    filter(value) {
        var values = this.state.values
        var filter = new Set()
        for (let m = 0; m < 9; m++) {
            for (let n = 0; n < 9; n++) {
                if (values[m][n] === value) {
                    filter.add(m + '.' + n)
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
        var values = this.state.values
        var highlight = new Set()
        for (let k = 0; k < 9; k++) {
            if (values[i][k]) {
                highlight.add(i + '.' + k)
            }
        }
        for (let k = 0; k < 9; k++) {
            if (values[k][j]) {
                highlight.add(k + '.' + j)
            }
        }
        var line = Math.floor(i / 3) * 3,
            row = Math.floor(j / 3) * 3
        for (let ln = line; ln < line + 3; ln++) {
            for (let r = row; r < row + 3; r++) {
                if (values[ln][r]) {
                    highlight.add(ln + '.' + r)
                }
            }
        }
        this.setState({
            highlight: highlight,
            filter: new Set()
        })
    }
    help() {
        var solution = this.solution,
            values = this.state.values.slice(),
            chosen = this.state.chosen,
            helps = this.state.helps
        if (!chosen.length || this.state.origin.has(chosen[0] + '.' + chosen[1]) || !this.state.helps) {
            return
        } else {
            var solutionValue = solution[chosen[0]][chosen[1]]
            values[chosen[0]][chosen[1]] = solutionValue
            helps -= 1
            this.setState({
                values: values,
                helps: helps
            })
        }
    }
    check() {
        this.setState({
            check: true
        })
    }
    solve() {
        if (this.state.peep) {
            return
        }
        var r = confirm("Are you sure to view the answer? The puzzle will be terminated.")
        if (!r) {
            return
        } else {
            var solution = this.solution,
                peep = this.state.peep
            this.setState({
                values: solution,
                peep: !peep
            })
        }

    }
    handleClick(i, j) {
        var values = this.state.values.slice()
        var thisvalue = values[i].slice()
        let chosen
        if (this.state.origin.has(i + '.' + j)) {
            this.filter(thisvalue[j])
            return
        } else {
            this.highlight(i, j)
            chosen = [i, j]
            var possible = Array.from(this.checkPossible(i, j).toString())
            this.setState({
                chosen: chosen,
                possible: possible,
                filter: new Set(),
                check: false
            });
        }
    }
    handleNumsClick(i) {
        if (this.state.peep) {return}
        var chosen = this.state.chosen
        if (!chosen) {
            this.filter('' + i)
        } else {
            var values = this.state.values.slice()
            if (this.state.origin.has([chosen[0]][chosen[1]])) {
                this.setState({
                    chosen: null,
                    highlight: new Set()
                })
                return
            }
            if (i === 'X') {
                values[chosen[0]][chosen[1]] = null
            } else {
                values[chosen[0]][chosen[1]] = '' + i
            }
            var conflict = new Set()
            for (let i = 0; i < 9; i++) {
                for (let j = 0; j < 9; j++) {
                    if (!values[i][j]) {
                        continue
                    }else {
                        var thisvalue = values[i][j],
                        possible = this.checkPossible(i, j)
                        if (!possible.has(thisvalue)) {
                            conflict.add(i + '.' + j)
                        }   
                    }
                }
            }
            this.setState(
                {
                    values: values,
                    highlight: new Set(),
                    conflict: conflict
                    // chosen: null
                }
            )
            if (!this.state.peep && values.toString() === this.solution.toString()) {
                alert('You did it!')
                this.setState({
                    peep: true
                })
            }    
        }
    }
    renderChoice(i) {
        return <Square className="choice" value={i} onClick={() => this.handleNumsClick(i)} />
    }
    renderControl(value) {
        var controlStyle = (value === this.state.level)?this.styles.control:undefined
        return <Control style={controlStyle} className="level" value={value} onClick={() => this.generate(value)} />
    }
    render() {
        var peepStyle = this.state.peep?this.styles.peep:undefined
        var checkStyle = this.state.check?this.styles.check:undefined
        var hintStyle = this.styles.hint[2 - this.state.helps]
        var choices = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
            (i) => {
                <Square className="choice" value={i} onClick={() => this.handleNumsClick(i)} />
            }
        )
        return (
            <div className="game">
                <ul className="controls">
                    {this.renderControl("EASY")}
                    {this.renderControl("MEDIUM")}
                    {this.renderControl("HARD")}
                    }
                </ul>
                <div className="main">
                    <div className="left">
                        <Square className="delete" value="X" onClick={() => this.handleNumsClick("x")} />
                        <div style={checkStyle} className="checktext">
                            <p value={this.state.possible}>{this.state.possible}</p>
                        </div>
                        <Square className="check" value="C" onClick={() => this.check()} />
                    </div>
                    <Board values={this.state.values}
                        origin={this.state.origin}
                        filter={this.state.filter}
                        conflict={this.state.conflict}
                        styles={this.styles}
                        chosen={this.state.chosen}
                        highlight={this.state.highlight}
                        onClick={(i, j) => this.handleClick(i, j)} />
                    <div className="right">

                        <Square className="solve" style={peepStyle} value="?" onClick={() => this.solve()} />
                        <Square className="hint" style={hintStyle} value={this.state.helps} onClick={() => this.help()} />
                    </div>
                </div>
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
            </div>
        );
    }
}
ReactDOM.render(
  <Game />,
  document.getElementById('sudoku')
);