const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const res = {};
  const db = app.database();
  const auth = app.auth().getUserInfo();
  const uid = auth.uid;
  if (uid) {
    const result = await db
      .collection('userInfo')
      // get() 方法会触发网络请求，往数据库取数据
      .get();
    const { data } = result;
    if (event.score !== null && data[0].score < event.score) {
      // 如果传入分数，并且分数比数据库中的高，则更新分数
      await db.collection('userInfo').update({
        score: event.score,
      });
      res.myHighScore = event.score;
    } else {
      res.myHighScore = data !== 0 ? data[0].score : 0;
    }
    const totalArray = await db
      .collection('userInfo')
      .orderBy('score', 'desc')
      .limit(1)
      .get();

    const total = totalArray.data;
    res.totalScore = total[0].score;
    res.code = 0;
  } else {
    // 如果uid为空，则为非法的，返回404
    res.code = 404;
  }
  return res;
};
