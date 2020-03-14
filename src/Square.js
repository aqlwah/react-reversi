import React, { useState } from 'react';
import './Square.css';

function Square() {
  // TODO: 石の状態はBoardで管理する
  //       一旦表示用になんか出しておく
  const randomState = Math.floor(Math.random() * 3); // mock: 0,1,2いずれかの値をランダムに返す

  // 石の状態をもとに適用するCSSクラスを決定する
  const stoneStateClass = {
    0: null,
    1: 'stone black',
    2: 'stone white'
  };

  // Hooksを使って石の状態を保持 => setStoneStateで値を書き換えて再レンダリング
  const [stoneState, setStoneState] = useState(randomState);
  const placeStone = () => {
    if (randomState) {
      return; // randomStateが0じゃない場合は何もしない
    }
    setStoneState(Math.floor(Math.random() * 2 + 1));
  };

  return (
    <div className="square" onClick={placeStone}>
      <div className={stoneStateClass[stoneState]} />
    </div>
  );
}

export default Square;
