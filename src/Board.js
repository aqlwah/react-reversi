import React, { useState } from 'react';
import Square from './Square';
import './Board.css';

function Board() {
  // 盤面の状態　8 * 8 の二次元配列
  const [boardState, setBoardState] = useState(
    Array.from(Array(8), row => (row = Array(8).fill(null)))
  );

  // 石の状態の定数　黒または白
  const squareState = {
    BLACK: 'black',
    WHITE: 'white'
  };

  // 現在の手番　黒または白を交互に入れていく
  const [currentTurn, setCurrentTurn] = useState(squareState.BLACK);

  // 石の反転
  const turnoverStone = (rowindex, colindex, turn) => {
    // 反転するマスのインデックスを保持する配列
    const turnoverTarget = [];

    // 指定されたインデックスをチェックして反転対象か判定するプライベート関数
    const checkTarget = (row, col) => {
      const target = boardState[row] && boardState[row][col];
      // 空白マスに行き当ったら終了
      if (!target) {
        return true;
      }
      // 自分の石だったら反転させて終了
      if (target === turn) {
        turnoverTarget.forEach(indexes => {
          boardState[indexes.row][indexes.col] =
            boardState[indexes.row][indexes.col] === squareState.BLACK
              ? squareState.WHITE
              : squareState.BLACK;
        });
        return true;
      }
      // 相手の石を反転対象として保持
      turnoverTarget.push({ row, col });
    };

    // 右方向の反転チェック
    turnoverTarget.length = 0;
    for (let i = colindex + 1; i < boardState[rowindex].length; i++) {
      if (checkTarget(rowindex, i)) {
        break;
      }
    }

    // 左方向の反転チェック
    turnoverTarget.length = 0;
    for (let i = colindex - 1; i >= 0; i--) {
      if (checkTarget(rowindex, i)) {
        break;
      }
    }

    // 上方向の反転チェック
    turnoverTarget.length = 0;
    for (let i = rowindex - 1; i >= 0; i--) {
      if (checkTarget(i, colindex)) {
        break;
      }
    }

    // 下方向の反転チェック
    turnoverTarget.length = 0;
    for (let i = rowindex + 1; i < boardState.length; i++) {
      if (checkTarget(i, colindex)) {
        break;
      }
    }

    // 右上方向の反転チェック
    turnoverTarget.length = 0;
    let tempRowindex = rowindex;
    for (let i = colindex + 1; i < boardState[rowindex].length; i++) {
      tempRowindex--;
      if (checkTarget(tempRowindex, i)) {
        break;
      }
    }

    // 右下方向の反転チェック
    turnoverTarget.length = 0;
    tempRowindex = rowindex;
    for (let i = colindex + 1; i < boardState[rowindex].length; i++) {
      tempRowindex++;
      if (checkTarget(tempRowindex, i)) {
        break;
      }
    }

    // 左上方向の反転チェック
    turnoverTarget.length = 0;
    tempRowindex = rowindex;
    for (let i = colindex - 1; i >= 0; i--) {
      tempRowindex--;
      if (checkTarget(tempRowindex, i)) {
        break;
      }
    }

    // 左下方向の反転チェック
    turnoverTarget.length = 0;
    tempRowindex = rowindex;
    for (let i = colindex - 1; i >= 0; i--) {
      tempRowindex++;
      if (checkTarget(tempRowindex, i)) {
        break;
      }
    }

    // boardStateを更新
    setBoardState(boardState);
  };

  // 盤面に石を置く
  const placeStone = (target, rowindex, colindex, turn) => {
    // targetが空でない（すでに石が置かれている）場合は何もしない
    if (target) {
      return;
    }

    // 現在の手番の石をマス目に置いてboardStateを更新
    boardState[rowindex][colindex] = turn;
    setBoardState(boardState);

    // 石を反転する
    turnoverStone(rowindex, colindex, turn);

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
