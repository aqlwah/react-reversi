import React from 'react';
import './Message.css';
import squareState from './Board';

function Message(props) {
  const winner = props.turn === squareState.BLACK ? '白' : '黒';
  const loser = props.turn === squareState.BLACK ? '黒' : '白';
  return (
    <div className={`popup ${props.isGameEnd ? 'shown' : ''}`}>
      <div className="win">{winner}の勝ちです！</div>
      <span className="lose">{loser}は石を置くことができなくなりました。</span>
    </div>
  );
}

export default Message;
