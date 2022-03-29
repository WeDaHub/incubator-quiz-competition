import React, { useState } from 'react';
import './options.css';

const Options = ({ question, handelTotal }) => {
  const [result, setResult] = useState({
    show: false,
  });
  const [selectdIndex, setSelectedIndex] = useState(-1);
  const handleClick = (item, index) => {
    setResult({
      show: true,
      isRight: item === question.answer,
    });

    if (item === question.answer) {
      handelTotal(question.score);
    }
    setSelectedIndex(index);
  };

  if (question.options.length === 0) {
    return null;
  }
  return (<div className="option-box">
      <div className="option">
        <ul>
        {
          question?.options.map((item, index) => (<li
            className={selectdIndex === index ? 'selectd' : ''}
            key={index}
            onClick={() => handleClick(item, index)}>
              {item}
              <span className=""></span>
            </li>))
        }
        </ul>
       {result.show && <div className="mask"></div>}
      </div>
      {
        result.show && <p className="tag">
          {
            result.isRight ? <span>回答正确, +{question.score}分</span>
              : <span>回答错误</span>
          }
        </p>
      }
    </div>
  );
};

export default Options;
