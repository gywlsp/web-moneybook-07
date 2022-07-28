<div id="top"></div>
<!-- PROJECT LOGO -->
<br />
<div align="center">

  <a href="https://github.com/woowa-techcamp-2022/web-todo-1">
    <img src="https://user-images.githubusercontent.com/6129764/181508211-78468de0-ac3f-4220-a1c3-b614e9fb5dc3.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Moneybook</h3>
  <p align="center">
    우아한테크캠프 5기 3~4주차 미션 - 가계부
    <br><br>
    <a href="http://52.78.145.140:3000/">👀 View Demo</a>
    <br>
    <a href="https://github.com/woowa-techcamp-2022/web-moneybook-07/wiki">🔗 Project Wiki</a>
  </p>
</div>

<!-- ABOUT THE PROJECT -->
## About The Project
<img width="1431" alt="image" src="https://user-images.githubusercontent.com/6129764/181509172-baff06d8-76be-432d-b36f-394898c65149.png">

2022 우아한테크캠프 5기 3~4주차 미션 - 가계부 입니다.

프로젝트 진행기간 총 10일 중 9일을 **pair programming**으로 개발했습니다.

### Built With

* Vanilla JavaScript
  * [History API](https://developer.mozilla.org/ko/docs/Web/API/History_API)를 이용해 SPA 구현
  * [Canvas API](https://developer.mozilla.org/ko/docs/Web/API/Canvas_API)를 이용해 도넛 차트, 라인 차트 구현
  * [requestAnimationFrame Web API](https://developer.mozilla.org/ko/docs/Web/API/Window/requestAnimationFrame)를 이용한 애니메이션 구현
    
    ![화면 기록 2022-07-28 오후 10 23 24](https://user-images.githubusercontent.com/6129764/181516955-51e6a2f0-4bdb-44b7-b1d1-ddf25ba0350b.gif)
* [Webpack](https://webpack.js.org/)
* [MySQL](https://www.mysql.com/)
* [pm2](https://pm2.keymetrics.io/), crontab을 활용한 무중단 배포

## Getting Started

이 프로젝트를 로컬에서 세팅하는 방법을 소개합니다.

### Prerequisites

* npm
  ```sh
  $ npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   $ git clone git@github.com:woowa-techcamp-2022/web-moneybook-07.git
   ```
2. Install NPM packages
   ```sh
   $ npm install
   ```
3. `.env` 파일을 만들고 Database 설정을 입력합니다.
   ```sh
   $ touch .env
   ```
   ```
   # .env
   DB_HOST=
   DB_USER=
   DB_NAME=
   DB_PASSWORD=
   DB_PORT=
   ```
4. client build & run project
   ```sh
   $ npm run build
   $ npm run start
   ```
   
<!-- ROADMAP -->
## Roadmap

- [x] 도넛 차트
- [x] 라인 차트
- [x] 스크롤 탑 버튼 
- [x] loading indicator
- [ ] 404 Not Found Page


