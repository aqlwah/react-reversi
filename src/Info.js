import React from 'react';
import './Board.css';
import './Info.css';

function Info(props) {
  // 現在の手番をもとに適用するCSSクラスを決定する
  const turnClass = {
    black: 'turn turn-black',
    white: 'turn turn-white',
  };

  return (
    <div className="flex-col wrapper infoarea">
      <div className="flex-col info">
        <span className="header">現在の手番</span>
        <span className={turnClass[props.turn]}>{props.turn}</span>
      </div>
      <div className="flex-col info">
        <span className="header">現在の石数</span>
        <div className="flex-row">
          <div className="count-header count-header-black">黒</div>
          <div className="count-cell">{props.blackCount}</div>
        </div>
        <div className="flex-row">
          <div className="count-header count-header-white">白</div>
          <div className="count-cell">{props.whiteCount}</div>
        </div>
      </div>
    </div>
  );
}

export default Info;
