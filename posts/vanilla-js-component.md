---
title: '바닐라 JS로 SPA 만들기 - 컴포넌트'
description: ''
tags:
  - JavaScript
  - 바닐라JS
createdAt: '2023-10-26'
---

자바스크립트 라이브러리인 React를 사용하면서 자바스크립트로 어떻게 SPA(Single-Page Application)을 구현했을까 궁금했었습니다. 그리고 항상 마음 속에는 바닐라 자바스크립트를 잘하는 개발자가 되야지! 라는 생각은 있었지만, 항상 라이브러리를 이용해서 무언가를 구현하기에만 급급했던 거 같습니다.

이번 기회에 영화 검색 사이트를 바닐라 자바스크립트로 구현하면서 바닐라 자바스크립트를 공부해보려고 합니다.

## SPA

SPA는 Single-Page Application의 약자로 하나의 HTML 페이지에서 애플리케이션 실행에 필요한 JavaScript나 CSS를 로드하는 애플리케이션입니다. 하나의 HTML 파일에서 동작하기 때문에 새로운 HTML 파일을 불러오기 위해 재로딩되는 시간이 없습니다. 또한 상태가 변하는 부분만 리렌더링하기 때문에 앱을 사용하는 것과 같은 우수한 사용자 경험을 제공합니다.

SPA는 클라이언트 측에서 *상태 관리*하고, *컴포넌트* 기반으로 아키텍쳐를 구성하는 특징이 있고 오늘은 그 부분에 대해서 구현해 볼 예정입니다.

## 폴더 구조

```bash
📦src
 ┣ 📂components
 ┃ ┣ 📜Counter.js
 ┃ ┗ 📜Header.js
 ┣ 📂core
 ┃ ┗ 📜Component.js
 ┣ 📜App.js
 ┗ 📜main.js
📜index.html
```

## index.html

- SPA에서 유일한 HTML 문서입니다.

```html
<!DOCTYPE html>
<html lang="ko">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script type="module" src="./src/main.js" defer></script>
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

## src/main.js

- 시작점인 파일로 id가 root인 엘리멘트에 App 컴포넌트를 렌더링합니다.

```js
import App from './App';

const root = document.querySelector('#root');
root.append(
  new App().el
);
```

## src/core/Component.js

- SPA의 핵심 중에 하나인 *컴포넌트 클래스* 파일입니다.
- React에서 컴포넌트의 역할을 생각해봤을 때, SPA 위해 클래스 컴포넌트가 해야할 일은 다음과 같습니다.
  - rendering
    - 컨텐츠를 담을 부모 태그를 만들고, 그 안에 컨텐츠를 렌더링 해줍니다.
  - state
    - 컴포넌트의 상태를 담고 있고, 상태가 변하면 re-rendering 해줍니다.
  - props
    - 상위 컴포넌트에서 데이터를 받아 올 수 있습니다.
- 위와 같은 역할을 바탕으로 컴포넌트 클래스를 구현했습니다.

```js
export default class Component {
  constructor({ tagName = 'div', state = {}, props = {} } = {}) {
    this.el = document.createElement(tagName);
    this.state = state;
    this.props = props;
    this.render();
  }

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.render();
  }

  render() {

  }
}
```

## src/Components/Header.js

- 컴포넌트 클래스를 상속해 Header 컴포넌트를 구현했습니다.

```js
import Component from '../core/Component';

export default class Header extends Component {
  constructor() {
    super({
      tagName: 'header',
    })
  }

  render() {
    this.el.innerHTML = `
      <h1>Counter</h1>
    `;
  }
}
```

## src/Components/Counter.js

- 컴포넌트 클래스를 상속해 Counter 컴포넌트를 구현했습니다.
- count 상태가 바뀔 경우, Counter 컴포넌트만 리렌더링 됩니다.

```js
import Component from '../core/Component';

export default class Counter extends Component {
  constructor() {
    super({
      state: {
        count: 0,
      }
    })
  }

  render() {
    this.el.innerHTML = `
      <span>${this.state.count}</span>
      <button class="btn-plus">+1</button>
      <button class="btn-minus">-1</button>
    `;

    const $buttonPlus = this.el.querySelector('.btn-plus');
    const $buttonMinus = this.el.querySelector('.btn-minus');

    $buttonPlus.addEventListener('click', () => {
      this.setState({ count: this.state.count + 1 });
    })

    $buttonMinus.addEventListener('click', () => {
      this.setState({ count: this.state.count - 1 });
    })
  }
}
```

## src/components/Button.js

- Counter 클래스 내에 버튼들이 반복되어서 버튼을 클래스를 구현했습니다.

```js
import Component from '../core/Component';

export default class Button extends Component {
  constructor({ text, onClick }) {
    super({
      tagName: 'button',
      props: {
        text: text,
        onClick: onClick,
      }
    })
  }
  render() {
    this.el.textContent = this.props.text;
    this.el.addEventListener('click', this.props.onClick);
  }
}
```

## src/Components/Counter.js 수정

- Counter 컴포넌트의 코드가 좀 더 간결해졌을 뿐만 아니라, 새로운 버튼도 쉽게 추가할 수 있습니다.

```js
import Component from '../core/Component';
import Button from './Button';

export default class Counter extends Component {
  constructor() {
    super({
      state: {
        count: 0,
      }
    })
  }

  render() {
    this.el.innerHTML = `
      <span>${this.state.count}</span>
    `;

    this.el.append(
      new Button({ text: '+1', onClick: () => this.setState({ count: this.state.count + 1 }) }).el,
      new Button({ text: '-1', onClick: () => this.setState({ count: this.state.count - 1 }) }).el,
      new Button({ text: 'make count zero', onClick: () => this.setState({ count: 0 }) }).el,
    );
  }
}
```

## 결과

```bash
📦src
 ┣ 📂components
 ┃ ┣ 📜Button.js
 ┃ ┣ 📜Counter.js
 ┃ ┗ 📜Header.js
 ┣ 📂core
 ┃ ┗ 📜Component.js
 ┣ 📜App.js
 ┗ 📜main.js
📜index.html
```

![counter 완성](https://raw.githubusercontent.com/jinnkimm7/jin-blog/86e139732cda4b9ce13eb3dc37f55d93b8a2775f/public/images/vanilla-js/component/counter.gif)