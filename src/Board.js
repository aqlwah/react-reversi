import React from 'react';
import Square from './Square';

function Board() {
  const squareArray = [];
  for (let i = 0; i < 8; i++) {
    squareArray.push(
      <div>
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
  return <div>{squareArray}</div>;
}

export default Board;
