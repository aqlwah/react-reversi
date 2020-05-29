import React, { useState } from 'react';
import Square from './Square';
import './Board.css';

function Board() {
  // 盤面の状態　8 * 8 の二次元配列
  const [boardState, setBoardState] = useState(
    Array.from(Array(8), (row) => (row = Array(8).fill(null)))
  );

  // 石の状態の定数　黒または白
  const squareState = {
    BLACK: 'black',
    WHITE: 'white',
  };

  // 現在の手番　黒または白を交互に入れていく
  const [currentTurn, setCurrentTurn] = useState(squareState.BLACK);

  // 指定されたマスから反転できる石があるかチェック
  const checkTarget = (rowindex, colindex, turn) => {
    // 反転できるマスのインデックスを保持する配列
    let turnoverTarget = [];
    let tempTurnoverTarget = [];

    // 右方向の反転チェック
    tempTurnoverTarget.length = 0;
    for (let i = colindex + 1; i < boardState[rowindex].length; i++) {
      const target = boardState[rowindex] && boardState[rowindex][i];
      if (!target) {
        break;
      }
      if (target === turn) {
        turnoverTarget = turnoverTarget.concat(tempTurnoverTarget);
        break;
      }
      tempTurnoverTarget.push({ row: rowindex, col: i });
    }

    // 左方向の反転チェック
    tempTurnoverTarget.length = 0;
    for (let i = colindex - 1; i >= 0; i--) {
      const target = boardState[rowindex] && boardState[rowindex][i];
      if (!target) {
        break;
      }
      if (target === turn) {
        turnoverTarget = turnoverTarget.concat(tempTurnoverTarget);
        break;
      }
    }

    // 上方向の反転チェック
    tempTurnoverTarget.length = 0;
    for (let i = rowindex - 1; i >= 0; i--) {
      const target = boardState[i] && boardState[i][colindex];
      if (!target) {
        break;
      }
      if (target === turn) {
        turnoverTarget = turnoverTarget.concat(tempTurnoverTarget);
        break;
      }
      tempTurnoverTarget.push({ row: i, col: colindex });
    }

    // 下方向の反転チェック
    tempTurnoverTarget.length = 0;
    for (let i = rowindex + 1; i < boardState.length; i++) {
      const target = boardState[i] && boardState[i][colindex];
      if (!target) {
        break;
      }
      if (target === turn) {
        turnoverTarget = turnoverTarget.concat(tempTurnoverTarget);
        break;
      }
      tempTurnoverTarget.push({ row: i, col: colindex });
    }

    // 右上方向の反転チェック
    tempTurnoverTarget.length = 0;
    let tempRowindex = rowindex;
    for (let i = colindex + 1; i < boardState[rowindex].length; i++) {
      tempRowindex--;
      const target = boardState[tempRowindex] && boardState[tempRowindex][i];
      if (!target) {
        break;
      }
      if (target === turn) {
        turnoverTarget = turnoverTarget.concat(tempTurnoverTarget);
        break;
      }
      tempTurnoverTarget.push({ row: tempRowindex, col: i });
    }

    // 右下方向の反転チェック
    tempTurnoverTarget.length = 0;
    tempRowindex = rowindex;
    for (let i = colindex + 1; i < boardState[rowindex].length; i++) {
      tempRowindex++;
      const target = boardState[tempRowindex] && boardState[tempRowindex][i];
      if (!target) {
        break;
      }
      if (target === turn) {
        turnoverTarget = turnoverTarget.concat(tempTurnoverTarget);
        break;
      }
      tempTurnoverTarget.push({ row: tempRowindex, col: i });
    }

    // 左上方向の反転チェック
    tempTurnoverTarget.length = 0;
    tempRowindex = rowindex;
    for (let i = colindex - 1; i >= 0; i--) {
      tempRowindex--;
      const target = boardState[tempRowindex] && boardState[tempRowindex][i];
      if (!target) {
        break;
      }
      if (target === turn) {
        turnoverTarget = turnoverTarget.concat(tempTurnoverTarget);
        break;
      }
      tempTurnoverTarget.push({ row: tempRowindex, col: i });
    }

    // 左下方向の反転チェック
    tempTurnoverTarget.length = 0;
    tempRowindex = rowindex;
    for (let i = colindex - 1; i >= 0; i--) {
      tempRowindex++;
      const target = boardState[tempRowindex] && boardState[tempRowindex][i];
      if (!target) {
        break;
      }
      if (target === turn) {
        turnoverTarget = turnoverTarget.concat(tempTurnoverTarget);
        break;
      }
      tempTurnoverTarget.push({ row: tempRowindex, col: i });
    }

    return turnoverTarget;
  };

  // 石の反転
  const turnoverStone = (turnoverTarget) => {
    turnoverTarget.forEach((indexes) => {
      if (indexes) {
        boardState[indexes.row][indexes.col] =
          boardState[indexes.row][indexes.col] === squareState.BLACK
            ? squareState.WHITE
            : squareState.BLACK;
      }
    });

    // boardStateを更新
    setBoardState(boardState);
  };

  // 盤面に石を置く
  const placeStone = (target, rowindex, colindex, turn) => {
    // targetが空でない（すでに石が置かれている）場合は何もしない
    if (target) {
      return;
    }

    // 反転可能なマスを取得する
    const turnoverTarget = checkTarget(rowindex, colindex, turn);

    if (turnoverTarget.length) {
      // 現在の手番の石をマス目に置いてboardStateを更新
      boardState[rowindex][colindex] = turn;
      setBoardState(boardState);

      // 石を反転する
      turnoverStone(turnoverTarget);
    } else {
      alert('そのマスに石を置くことはできません。');
    }

    // 手番を交代
    setCurrentTurn(
      turn === squareState.BLACK ? squareState.WHITE : squareState.BLACK
    );
  };

  // 盤面となるDOM配列
  const squareArray = [];
  boardState.forEach((squareLine, rowindex) => {
    const componentLine = squareLine.map((square, colindex) => {
      return (
        <Square
          state={square}
          key={`${rowindex}${colindex}`}
          onClickHandler={() =>
            placeStone(square, rowindex, colindex, currentTurn)
          }
        />
      );
    });
    squareArray.push(
      <div className="flex-row" key={rowindex}>
        {componentLine}
      </div>
    );
  });
  return <div className="flex-col">{squareArray}</div>;
}

export default Board;
