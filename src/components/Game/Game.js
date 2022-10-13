import React from 'react';
import Board from '../Board/Board';
import classes from './Game.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { makeMove, jumpToMove } from './gameSlice';

function Game() {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const handleClick = (i) => {
    const history = game.history.slice(0, game.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    return dispatch(makeMove(i));
  };

  const jumpTo = (step) => {
    dispatch(jumpToMove(step));
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const current = game.history[game.stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = game.history.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button className={classes.gameMoves} onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (game.xIsNext ? 'X' : 'O');
  }

  return (
    <div>
      <h1 className={classes.title}> Tic Tac Toe </h1>
      <div className={classes.game}>
        <div className={classes.gameBoard}>
          <Board squares={current.squares} onClick={(i) => handleClick(i)} />
        </div>
        <div className={classes.gameInfo}>
          <div className={classes.status}>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  );
}

export default Game;
