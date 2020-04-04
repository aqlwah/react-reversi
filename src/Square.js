import React from 'react';
import './Square.css';

function Square(props) {
  // 石の状態をもとに適用するCSSクラスを決定する
  const stoneStateClass = {
    black: 'stone black',
    white: 'stone white'
  };

  return (
    <div className="square" onClick={() => props.onClickHandler()}>
      <div className={stoneStateClass[props.state]} />
    </div>
  );
}

export default Square;
