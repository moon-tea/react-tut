import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//TODO: put in utils
const getPlay = xIsNext => xIsNext ? 'X' : 'O';
const calculateWinner = squares => ([
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ].reduce((acc, [a,b,c]) =>
    squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      ? squares[a]
      : acc || null
  , null));

//TODO: put in own file
const Square = ({value, onClick}) => (
  <button
      className="square"
      onClick={onClick}
      children={value}
    />
);

//TODO: put in own file, pass in or import getPlay and calculateWinner
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    };
  }

  handleClick(i) {
    if (calculateWinner(this.state.squares) || this.state.squares[i]) {
      return;
    }
    const play = getPlay(this.state.xIsNext);

    this.setState({
      squares: this.state.squares.map(
        (square, index) =>
          index === i
            ? play
            : square
      ),
      xIsNext: !this.state.xIsNext
    });
  }

  renderSquare(i) {
    return <Square
      value={this.state.squares[i]}
      onClick={() => this.handleClick(i)}
    />;
  }

  render() {
    const winner = calculateWinner(this.state.squares);
    const status = winner
      ? 'Winner: ' + winner
      : 'Next player: ' + getPlay(this.state.xIsNext);
    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
