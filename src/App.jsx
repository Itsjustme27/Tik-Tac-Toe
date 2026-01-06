import { useState, useEffect } from "react";

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);

  const [xScore, setXScore] = useState(0);
  const [oScore, setOScore] = useState(0);

  function calculateWinner(board) {
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of winningLines) {
      const [a, b, c] = line;

      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return null;
  }

  const winner = calculateWinner(board);

  useEffect(() => {
    if (winner === "X") {
      setXScore((prev) => prev + 1);
    } else if (winner === "O") {
      setOScore((prev) => prev + 1);
    }
  }, [winner]);

  function handleClick(index) {
    if (board[index] !== null || winner) {
      return;
    }

    const newBoard = [...board];
    newBoard[index] = isXTurn ? "X" : "O";

    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  }

  function resetGame() {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div>
        <h1 className="text-3xl font-bold text-center mb-4">Tic Tac Toe</h1>

        <p className="text-center mb-4 text-lg">
          {winner ? `Winner: ${winner}` : `Next Turn: ${isXTurn ? "X" : "O"}`}
        </p>

        <div className="flex justify-between mb-4 text-lg font-semibold">
          <span>X Score: {xScore}</span>
          <span>O Score: {oScore}</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {board.map((value, index) => (
            <div
              key={index}
              onClick={() => handleClick(index)}
              className="w-24 h-24 bg-white border flex items-center justify-center text-3xl font-bold cursor-pointer"
            >
              {value}
            </div>
          ))}
        </div>

        <button
          onClick={resetGame}
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Reset Game
        </button>
      </div>
    </div>
  );
}
export default App;
