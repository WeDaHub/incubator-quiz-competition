const cloud = require("@cloudbase/node-sdk");

exports.main = async (event, context) => {
  const app = cloud.init({
    env: cloud.SYMBOL_CURRENT_ENV,
  });
  const auth = app.auth().getUserInfo();
  const uid = auth.uid;
  const res = {};
  if (uid) {
    //  1. 获取数据库引用
    const db = app.database();
    // 2. 构造查询语句
   const result = await db
    .collection('answers')
    // get() 方法会触发网络请求，往数据库取数据
    .get();
    res.data = result.data;
    res.code = 0;
  } else {
    // 如果uid为空，则为非法的，返回404
    res.code = 404;
  }
  return res;
};
