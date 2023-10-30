---
title: '바닐라 JS로 SPA 만들기 - 라우터'
description: '바닐라 JS로 SPA를 만들기 위해 라우터를 구현했습니다.'
tags:
  - JavaScript
  - 바닐라JS
createdAt: '2023-10-30'
---

리액트를 사용해서 SPA를 구현할 때 react-router-dom 라이브러리를 이용했지만, 오늘은 hash와 history를 이용해서 바닐라 자바스크립트로 router를 구현해보겠습니다.

## src/core/createRouter.js

먼저 라우터를 생성하는 함수를 구현하겠습니다.

window 이벤트에 popstate를 등록하면 해시 부분이 바뀔 때마다 콜백함수를 호출합니다.

popstate이벤트가 발생할때마다 routerRender라는 함수를 호출해주고, routerRender 함수는 현재 hash 주소 부분을 확인해서 어떤 페이지를 출력할지 찾고, 찾은 페이지를 router-view에 렌더하는 함수입니다.

예를들면, http://localhost:3000/#/about?a=123&b=456의경우 hash에 #/about을 저장해서 해당 컴포넌트를 렌더링해주고, queryString에 객체를 저장하고, queryString을 history.state에 저장해서 필요할 때마다 사용할 수 있도록 합니다.

```js
function routeRender(routes) {
  if (!location.hash) {
    history.replaceState(null, '', '/#/')
  }

  const routerView = document.querySelector('router-view');
  const [hash, queryString = ''] = location.hash.split('?');

  // a=123&b=456
  // ['a=123', 'b=456']
  // {'a': '123, 'b': '456}
  const query = queryString
    .split('&')
    .reduce((acc, cur) => {
      const [key, val] = cur.split('=');
      acc[key] = val;
      return acc;
    }, {});
  // history.state에 객체를 보관합니다.
  history.replaceState(query, '');

  const currentRoute = routes.find(route => new RegExp(`${route.path}/?$`).test(hash));

  routerView.innerHTML = '';
  routerView.append(new currentRoute.component().el);

  window.scrollTo(0, 0);
}

export default function createRoute(routes) {
  return function () {
    window.addEventListener('popstate', () => {
      routeRender(routes);
    })
    routeRender(routes);
  }
}
```

## src/App.js

Navbar 컴포넌트는 항상 존재하고, hash가 바뀔 때마다 router-view에 다른 컴포넌트가 렌더링됩니다.

```js
import Navbar from './components/Navbar';
import Component from './core/Component';

export default class App extends Component {
  render() {
    const routerView = document.createElement('router-view');
    this.el.append(
      new Navbar().el,
      routerView,
    );
  }
}
```

## src/pages/index.js

createRoutue 함수를 사용해서 라우터를 아래와 같이 생성했습니다.

```js
import createRoute from '../core/createRouter';
import Home from './Home';
import About from './About';

export default createRoute([
  { path: '#/', component: Home },
  { path: '#/about', component: About }
])
```

## src/main.js

App 컴포넌트를 먼저 렌더한 이후, 생성한 라우터를 호출합니다.

```js
import App from './App';
import router from './pages/index';

const root = document.querySelector('#root');
root.append(
  new App().el
);

router();
```

## 결과

![라우터](https://raw.githubusercontent.com/jinnkimm7/jin-blog/d5a75e528942745c171863db3f6d0a9d345b1ffc/public/images/vanilla-js/router/router.gif)