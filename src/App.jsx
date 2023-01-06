import { useState } from "react";

function Square({ value, onSquareClick, color }) {
  let background;
  if (color) background = color;
  return (
    <button style={{ background }} onClick={onSquareClick} className="square">
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay, colors, status }) {
  function handleClick(i, row, col) {
    const nextSquares = squares.slice();

    if (nextSquares[i] || calculateWinner(nextSquares)) {
      return;
    }
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }

    onPlay(nextSquares, row, col);
  }

  let board = [];
  for (let row = 1; row <= 3; row++) {
    let rowSquare = [];
    for (let col = 1; col <= 3; col++) {
      const cell = col + (row - 1) * 3 - 1;
      rowSquare.push(
        <Square
          key={cell}
          value={squares[cell]}
          color={colors[cell]}
          onSquareClick={() => handleClick(cell, row, col)}
        />
      );
    }
    board.push(
      <div key={row} className="board-row">
        {rowSquare}
      </div>
    );
  }

  return (
    <>
      <div className="status">{status}</div>
      {board}
    </>
  );
}

let countRender = 0;

export default function Game() {
  console.log(++countRender, new Date())
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [eachMoves, setEachMoves] = useState([null]);
  const [currentMove, setCurrentMove] = useState(0);
  const [order, setOrder] = useState(true);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const winner = calculateWinner(currentSquares);
  let status;
  const currentColors = Array(9).fill(null);

  if (winner) {
    status = "Winner: " + currentSquares[winner[0]];
    for (let i = 0; i < winner.length; i++) {
      let index = winner[i];
      currentColors[index] = "lime";
    }
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  if (history.length == 10) {
    status = <>{"No Player win the game! "}</>;
  }

  function handlePlay(nextSquares, row, col) {
    let nextHistory;
    let nextMove;
    if (order) {
      nextMove = [...eachMoves.slice(0, currentMove + 1), [row, col]];
      nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    } else {
      nextMove = [[row, col, ...eachMoves.slice(currentMove, history.length)]];
      nextHistory = [
        nextSquares,
        ...history.slice(currentMove, history.length),
      ];
    }
    setHistory(nextHistory);
    setEachMoves(nextMove);
    if (order) setCurrentMove(nextHistory.length - 1);
    else setCurrentMove(0);
  }

  function reloadGame() {
    let nextHistory = [Array(9).fill(null)];
    let nextMove = [null];
    setHistory(nextHistory);
    setEachMoves(nextMove);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function changeOrder() {
    let nextHistory = [...history.slice().reverse()];
    let nextMove = [...eachMoves.slice().reverse()];
    setHistory(nextHistory);
    setEachMoves(nextMove);
    setOrder(!order);
    setCurrentMove(nextHistory.length - 1 - currentMove);
  }

  const moves = eachMoves.map((cell, move) => {
    let description;
    let info;
    // if (order) {
    //   if (move > 0) {
    //     description = "Go to move #" + move;
    //   } else {
    //     description = "Go to game start";
    //   }
    // } else {
    //   if (move < history.length - 1) {
    //     description = "Go to move #" + (history.length - 1 - move);
    //   } else {
    //     description = "Go to game start";
    //   }
    // }

    if (cell) {
      description = `Go to move (${cell.join(",")})`;
    } else {
      description = "Go to game start";
    }

    if (move == currentMove) {
      if (cell) info = `You are at move (${cell.join(",")})`;
      else info = "Game Start";
    } else {
      info = <button onClick={() => jumpTo(move)}>{description}</button>;
    }

    return <li key={move}>{info}</li>;
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          colors={currentColors}
          status={status}
          xIsNext={xIsNext}
          squares={currentSquares}
          onPlay={handlePlay}
        />
      </div>
      <div className="game-info">
        <button onClick={changeOrder}>Change Order</button>
        <button onClick={reloadGame}>Reload Game</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

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

  for (let x = 0; x < lines.length; x++) {
    const [a, b, c] = lines[x];
    if (squares[a] && squares[b] === squares[a] && squares[c] === squares[a]) {
      return lines[x];
    }
  }

  return null;
};
