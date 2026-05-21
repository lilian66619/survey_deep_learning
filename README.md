# 小组互评问卷系统

## 功能

- 在线问卷
- Firebase 数据库存储
- 自动记录提交时间
- 手机扫码填写
- GitHub Pages 免费部署
- Firebase 后台可导出 CSV/Excel

---

# 第一步：创建 Firebase

打开：

https://firebase.google.com

## 创建项目

例如：

group-survey

---

# 第二步：启用 Firestore Database

进入：

Build → Firestore Database

点击：

Create Database

选择：

Start in test mode

---

# 第三步：获取 Firebase 配置

Project Settings → General → Your Apps

选择 Web App

复制 firebaseConfig

替换 firebase.js 中内容

---

# 第四步：部署到 GitHub Pages

上传所有文件：

- index.html
- style.css
- app.js
- firebase.js

到 GitHub 仓库

开启：

Settings → Pages

Deploy from branch

即可获得网址。

---

# 第五步：导出 Excel

Firestore → survey_results

点击：

Export JSON

或使用 Firebase Extension 导出 CSV。

也可以接 Google Sheets。
