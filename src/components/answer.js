import React, { useState, useEffect } from 'react';
import './answer.css';
import Options from './options';
import { getApp } from '../tcb';

const Answer = ({ answerList }) => {
  const [total, setTotal] = useState(0);
  const [myScore, setMyScore] = useState(0);
  const [myHighScore, setMyHighScore] = useState(0);

  const handelTotal = (score) => {
    const totalScore = myScore + score;
    setMyScore(totalScore);
    getCloudeScore(totalScore);
  };
  // 调用得分云函数
  const getCloudeScore = async (totalscore) => {
    const app = getApp();
    try {
      const res = await app.callFunction({
        name: 'totalscore',
        data: {
          score: totalscore,
        },
      });
      const { result } = res;
      const { code, totalScore, myHighScore } = result;
      if (code === 0) {
        setTotal(totalScore);
        setMyHighScore(myHighScore);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    getCloudeScore();
  }, []);

  if (answerList.length === 0) {
    return null;
  }

  return (<>
    <div className="answer-box">
      {
        answerList.map((item, index) => (<div className="answer" key={index}>
            <h2>{item?.title}</h2>
            <Options question={item} handelTotal={handelTotal} />
          </div>))
      }
    </div>
    <div className="score-box">
      <div className="inner">
        <span>本次分数:<strong>{myScore}</strong>分</span>
        <span>我的最高分:<strong>{myHighScore}</strong>分</span>
        <span>全网最高分:<strong>{total}</strong>分</span>
      </div>
    </div>
  </>);
};

export default Answer;
