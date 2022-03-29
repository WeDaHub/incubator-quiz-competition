import React, { useEffect, useState, useCallback } from 'react';
import './App.css';
import { getApp } from './tcb';
import Loading from './components/loading';
import Answer from './components/answer';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [answerList, setAnswerList] = useState([]);
  const app = getApp();
  // 获取数据
  const getData =  useCallback(async () => {
    try {
      const { result } = await app.callFunction({
        name: 'getanswer',
      });
      const { code, data } = result;
      if (code === 0) {
        setLoading(false);
        setAnswerList(data);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    // 匿名登录
    app.auth({
      persistence: 'local',
    })
      .anonymousAuthProvider()
      .signIn()
      .then(result => {
        console.log('result:', result);
        getData();
      })
      .catch(error => {
        console.log('login fail', error);
      });
  }, []);

  return (
    <div className="page">
      <h1>答题比赛</h1>
      {loading && <Loading />}
      <Answer answerList={answerList}/>
    </div>
  );
};

export default App;
