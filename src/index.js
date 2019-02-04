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
const Board = ({squares, xIsNext, onClick}) => {
  const renderSquare = i => (
    <Square
      value={squares[i]}
      onClick={() => onClick(i)}
    />
  );
  const winner = calculateWinner(squares);
  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + getPlay(xIsNext);
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      xIsNext: true,
      stepNumber: 0,
    }
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length-1].squares;
    if (calculateWinner(current) || current[i]) {
      return;
    }

    const play = getPlay(this.state.xIsNext);
    this.setState({
      history: [
         ...history,
         {squares: current.map((square, index) =>
          index === i
            ? play
            : square
        )},
      ],
      xIsNext: !this.state.xIsNext,
      stepNumber: this.state.stepNumber + 1
    });
  }

  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.history[this.state.stepNumber].squares}
            xIsNext={this.state.xIsNext}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{/* TODO */}</div>
          <ol>
          {this.state.history.map((step, move) => (
            <li key={move}>
              <button onClick={() => this.jumpTo(move)}>
                {move ? 'Go to move #' + move : 'Go to game start'}
              </button>
            </li>
          ))}
          </ol>
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
