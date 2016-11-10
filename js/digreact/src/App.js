import React, { Component } from 'react';
import sudokus from './Sudokus'
import SudokuGenerator from './SudokuGenerator'
import logo from './logo.png'
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

class Board extends Component {
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

class Control extends Component {
    render() {
        return (
            <li style={this.props.style} className={this.props.className} onClick={() => this.props.onClick()}>
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
            sudoku = new SudokuGenerator(grid).generate(),
            puzzle = sudoku[0],
            solution = sudoku[1]
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
                // border: '1px solid #fbbc05',
                // margin: '-1px'
                // color: '#00FF00',
            },
            filter: {
                // transition: 'transform 1s ease',
                // transform: 'rotate(1turn)',
                boxShadow: '3px 3px 1px rgba(0, 0, 0, 0.8)',
                backgroundColor: 'rgba(255, 13, 126, 0.2)',
                color: '#4285f4',
            },
            chosen: {
                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                // boxShadow: '3px 3px 3px 3px rgba(0, 0, 0, 0.8)',
                color: '#fbbc05',
            },
            origin: {
                backgroundColor: 'rgba(200, 200, 200, 0.1)',
                color: '#ea4335'
            },
            originHighlight: {
                backgroundColor: 'rgba(52, 168, 83, 0.2)',
                // border: '1px solid #fbbc05',
                // margin: '-1px',
                color: '#ea4335'
            },
            originFilter: {
                backgroundColor: 'rgba(255, 13, 126, 0.2)',
                boxShadow: '3px 3px 1px rgba(0, 0, 0, 0.9)',
                color: '#ea4335'
            },
            control: {
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                color: '#ea4335'
            },
            peep: {
                backgroundColor: 'rgba(251, 188, 5, 0.2)',
                color: 'black',
                disabled: 'true',
            },
            check: {
                filter: 'blur(0)'
            },
            hint: [
                {
                    backgroundColor: 'rgba(52, 168, 83, 0.2)'
                },
                {
                    backgroundColor: 'rgba(251, 188, 5, 0.2)'
                },
                {
                    backgroundColor: 'rgba(255, 13, 126, 0.2)'
                }
            ]
        }
        this.state = {
            values: puzzle,
            solution: solution,
            degree: '简单',
            origin: origin,
            peep: false,
            possible: null,
            chosen: null,
            filter: new Set(),
            highlight: new Set(),
            check: false,
            helps: 3
        }
    }
    generate(degree) {
        let puzzles
        switch (degree) {
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
            default:
                puzzles = sudokus.easy
        }
        var random = Math.floor(Math.random() * puzzles.length)
        var grid = puzzles[random],
            sudoku = new SudokuGenerator(grid).generate(),
            puzzle = sudoku[0],
            solution = sudoku[1]
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
            solution: solution,
            degree: degree,
            peep: false,
            origin: origin,
            chosen: null,
            possible: null,
            filter: new Set(),
            highlight: new Set(),
            check: false,
            helps: 3
        })
    }
    checkPossible(i, j) {
        var values = this.state.values
        var allPossible = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9'])
        //   var n = (Math.floor(i/3) * 3 + Math.floor(j/3))
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
        //   var bi = Math.floor(n / 3) * 3,
        //   bj = (n % 3) * 3
        var bi = Math.floor(i / 3) * 3,
            bj = Math.floor(j / 3) * 3
        for (let m = bi; m < bi + 3; m++) {
            for (let n = bj; n < bj + 3; n++) {
                //   if (m === i && n === j) {
                //       continue
                //   }
                if (allPossible.has(values[m][n])) {
                    allPossible.delete(values[m][n])
                }
            }
        }
        //   this.setState({
        //       possible:Array.from(allPossible)
        //   })
        return Array.from(allPossible)
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
        var solution = this.state.solution,
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
        /* 自动查找填充
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (values[i][j]) {
                    continue
                }
                let possible = this.checkPossible(i, j)
                if (possible.length === 1) {
                    var hint = [i, j]
                    values[i][j] = possible[0]
                    this.setState({
                        values:values,
                        chosen:hint,
                        highlight: new Set(),
                        filter: new Set(),
                        possible:null
                    })
                    return
                }else if (possible.length === 2) {
                    possibles.push([possible, [i, j]])
                }
            }
        }
        if (possibles.length) {
            var hinti = possibles[0][1],
            possiblen = possibles[0][0],
            ps = ''
            console.log('hint' + hint)
            for (let p of possiblen) {
                ps += (p + '? ')
            }
            this.setState({
                possible:ps,
                highlight:new Set(),
                filter: new Set(),
                chosen:hinti
            })
            return
        }
        possible = "题目有点难，请先点击方块，再点击提示查看"
        this.setState({
            possible:possible
        })
        */
    }
    check() {
        this.setState({
            check: true
        })
        //   var chosen = this.state.chosen,
        //   values = this.state.values.slice()
        //   console.log('chosen' + chosen)
        //   if (chosen && !values[chosen[0]][chosen[1]] && !this.state.possible) {
        //     //   
        //       var possible = this.checkPossible(chosen[0], chosen[1])
        //       this.setState({
        //           possible:possible
        //       })
        //     //   console.log('ok')
        //   }
    }
    //   hint() {
    //       var chosen = this.state.chosen,
    //       values = this.state.values.slice()
    //       console.log('chosen' + chosen)
    //       if (chosen && !values[chosen[0]][chosen[1]] && !this.state.possible) {
    //         //   
    //           var possible = this.checkPossible(chosen[0], chosen[1])
    //           this.setState({
    //               possible:possible
    //           })
    //         //   console.log('ok')
    //       }else {
    //           var possibles = []
    //           for (let i = 0; i < 9; i++) {
    //               for (let j = 0; j < 9; j++) {
    //                     if (values[i][j]) {
    //                         continue
    //                     }
    //                     let possible = this.checkPossible(i, j)
    //                     if (possible.length === 1) {
    //                         var hint = [i, j]
    //                         values[i][j] = possible[0]
    //                         // console.log(values[i][j])
    //                         // console.log(typeof possible[0])
    //                         this.setState({
    //                             values:values,
    //                             chosen:hint,
    //                             highlight: new Set(),
    //                             filter: new Set(),
    //                             possible:null
    //                         })
    //                         return
    //                     }else if (possible.length === 2) {
    //                         possibles.push([possible, [i, j]])
    //                     }
    //                 }
    //             }
    //             if (possibles.length) {
    //                 var hinti = possibles[0][1],
    //                 possiblen = possibles[0][0],
    //                 ps = ''
    //                 console.log('hint' + hint)
    //                 for (let p of possiblen) {
    //                     ps += (p + '? ')
    //                 }
    //                 this.setState({
    //                     possible:ps,
    //                     highlight:new Set(),
    //                     filter: new Set(),
    //                     chosen:hinti
    //                 })
    //                 return
    //             }
    //             possible = "题目有点难，请先点击方块，再点击提示查看"
    //             this.setState({
    //                 possible:possible
    //             })
    //       }
    //   }
    solve() {
        if (this.state.peep) {
            return
        }
        var r = confirm("你确定查看答案么？查看后将不能继续解题。")
        if (!r) {
            return
        } else {
            var values = this.state.values,
                solution = this.state.solution,
                peep = this.state.peep
            this.setState({
                values: solution,
                solution: values,
                peep: !peep
            })
        }

    }
    handleClick(i, j) {
        var values = this.state.values.slice()
        var thisvalue = values[i].slice()
        let chosen
        if (values[i][j]) {
            this.filter(thisvalue[j])
            return
        } else {
            this.highlight(i, j)
            chosen = [i, j]
            var possible = this.checkPossible(i, j).toString()
            console.log(possible)
            this.setState({
                chosen: chosen,
                possible: possible,
                filter: new Set(),
                check: false
            });
        }
    }
    handleNumsClick(i) {
        var chosen = this.state.chosen
        if (!chosen) {
            this.filter('' + i)
        } else {
            var values = this.state.values.slice()
            if (i === 'x') {
                values[chosen[0]][chosen[1]] = null
            } else {
                values[chosen[0]][chosen[1]] = '' + i
            }
            this.setState(
                {
                    values: values,
                    highlight: new Set(),
                    chosen: null
                }
            )
            console.log('v-----' + values.toString())
            console.log('s-----' + this.state.solution.toString())
            if (values.toString() === this.state.solution.toString()) {
                alert('恭喜你，完成了这个难题！')
            }
        }


    }
    renderChoice(i) {
        return <Square className="choice" value={i} onClick={() => this.handleNumsClick(i)} />
    }
    renderControl(value) {
        let controlStyle
        console.log(this.state.degree + '-' + value)
        if (value === this.state.degree) {
            controlStyle = this.styles.control
        }
        return <Control style={controlStyle} className="degree" value={value} onClick={() => this.generate(value)} />
    }
    render() {
        if (this.state.peep) {
            var peepStyle = this.styles.peep
        }
        if (this.state.check) {
            var checkStyle = this.styles.check
        }
        var hintStyle = this.styles.hint[2 - this.state.helps]
        return (
            <div className="game">
                <div className="header">
                    <img className="logo" alt="playSudoku" src={logo} />
                    <ul className="controls">
                        {this.renderControl("非常简单")}
                        {this.renderControl("简单")}
                        {this.renderControl("中等")}
                        {this.renderControl("困难")}
                        {this.renderControl("非常困难")}
                    </ul>
                </div>
                <div className="main">
                    <div className="left">
                        <Square className="delete" value="x" onClick={() => this.handleNumsClick("x")} />
                        <div style={checkStyle} className="checktext">
                            <p value={this.state.possible}>{this.state.possible}</p>
                        </div>
                        <Square className="check" value="C" onClick={() => this.check()} />
                    </div>
                    <Board values={this.state.values}
                        origin={this.state.origin}
                        filter={this.state.filter}
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
export default Game
            //   {this.renderChoice('X')}
        // <div className="game--info">
        //   <p className="possible" value={this.state.possible}>{this.state.possible}</p>
        // </div>