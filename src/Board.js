import React from 'react';
import Square from './Square';
import './Board.css';

function Board() {
  const squareArray = [];
  for (let i = 0; i < 8; i++) {
    squareArray.push(
      <div className="flex-row">
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
        <Square />
      </div>
    );
  }
  return <div className="flex-col">{squareArray}</div>;
}

export default Board;
