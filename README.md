# 答题比赛H5

## 线上演示地址
https://hello-cloudbase-6g6me2l6003c92be-1305969009.tcloudbaseapp.com/react-starter/index.html


## 项目说明
在线答题的H5，可以查看本次答题的得分，我的历史答题最高分，全网答题最高分。

## 云开发能力
用到了云函数，数据库，静态网站托管能力。通过更新数据库记录个人历史最高分和全网最高分



## 开发命令及配置

### 本地开发

```
npm run start
```

注意事项：本地开发时在根目录下新建环境变量文件.env，添加自定义的环境变量REACT_APP_ENV_ID：云环境ID，REACT_APP_REGION：云环境地区，在tcb.js和cloudbaserc.json会用到
### 上线部署

```
npm run deploy
```
