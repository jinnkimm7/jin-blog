---
title: '바닐라 JS로 SPA 만들기 - 스토어'
description: '바닐라 JS로 Store 컴포넌트를 간단하게 구현하였습니다.'
tags:
  - JavaScript
  - 바닐라JS
createdAt: '2023-10-28'
---

리액트의 핵심 중 하나는 *상태관리*입니다. 부모-자식 컴포넌트끼리 상태를 주고 받을 수 있지만, 부모-자식 관계가 점차 깊어질 경우 코드가 복잡해지는 경우가 있습니다. 이 단점을 해결하기 위해 전역적으로 상태를 관리해주는 라이브러리들(Redux, Recoil ...)이 많이 있습니다. 오늘은 전역으로 상태를 관리해 바로 사용할 수 있는 Store를 간단하게 구현해보도록 하겠습니다.

## src/components/Header.js

우선 스토어를 만들기전 Header 컴포넌트를 재사용성 있게 사용하기 위해 수정했습니다.

```js
import Component from '../core/Component';

export default class Header extends Component {
  constructor({ text }) {
    super({
      tagName: 'header',
      props: {
        text: text,
      }
    })
  }
  render() {
    this.el.innerHTML = `
      <h1>${this.props.text}</h1>
    `;
  }
}
```

## src/core/Store.js

이제 본격적으로 Store 컴포넌트부터 구현해보겠습니다.

Store 컴포넌트의 역할은 다음과 같습니다.
- 외부로부터 상태를 받아서 저장합니다.
- 외부 컴포넌트가 저장된 상태를 필요로하면, 저장된 상태를 컴포넌트에 전달합니다.
- 저장된 상태가 변경되면 상태를 변경해줍니다.

위의 역할을 하기위해 *옵저버 패턴*을 이용했습니다. Store의 상태가 변하면 변화를 감지해야만 컴포넌트는 subscribe() 메서드를 이용하면 됩니다.

```js
export default class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) { // 외부에서 받아온 객체 데이터(state)의 정보를 this.state에 넣어줍니다.
      Object.defineProperty(this.state, key, {
        // getter: this.state의 key를 사용할 때 동작되는 함수 => 상태 전달하기
        get: () => state[key],
        // setter: this.state의 key를 새로운 값을 할당할 때 동작되는 함수
        // => 상태를 변경해주고, 콜백을 실행합니다.
        set: val => { 
          state[key] = val;
          this.observers[key]();
        },
      })
    }
  }

  // key: 감시할 state,
  // cb: 감시하고 있는 state가 변경되면 콜백할 함수를 this.observers에 저장합니다.
  subscribe(key, cb) {
    this.observers[key] = cb;
  }
}
```

Store 클래스를 한 번 사용해보겠습니다.

## src/store/message.js

전역으로 상태를 관리해줄 message 데이터를 생성합니다.

```js
import Store from '../core/Store';

export default new Store({
  message: 'Hello, Store!',
});
```

## src/components/Input.js

Input 컴포넌트를 생성하고, input 태그의 value 초기값을 Store에 저장된 message를 할당했습니다. input 이벤트가 발생하면, 변경된 message 상태를 스토어에 저장합니다.

```js
import Component from '../core/Component';
import messageStore from '../store/message';

export default class Input extends Component {
  constructor() {
    super({
      tagName: 'input',
    })
  }

  render() {
    this.el.value = messageStore.state.message; // Store의 getter 함수 실행
    this.el.addEventListener('input', () => {
      messageStore.state.message = this.el.value; // Store의 setter 함수 실행
    })
  }
}
```

## src/components/Message.js

Message 컴포넌트에서도 Store에 있는 message 상태를 받아올 수 있습니다. h2 태그의 content에 message의 상태를 할당하고, message 상태가 변경된다면, Message 컴포넌트를 리렌더링해 변경된 상태를 보여주게됩니다.

```js
import Component from '../core/Component';
import messageStore from '../store/message';

export default class Message extends Component {
  constructor() {
    super({
      tagName: 'h2',
    })
    messageStore.subscribe('message', () => {
      this.render();
    })
  }
  render() {
    this.el.textContent = messageStore.state.message;
  }
}
```

## 문제점

Message 컴포넌트를 하나 더 추가하면, observers[key]에는 하나의 함수만 등록되기 때문에 이전에 존재하고 있었던 Message 컴포넌트는 제 기능을 하지 못하는 버그를 만나게 됩니다. 디버깅을 하기 위해 해당 상태에 하나의 함수가 아닌 여러 함수를 등록할 수 있도록 코드를 수정해야 합니다.

```js
export default class Store {
  constructor(state) {
    this.state = {};
    this.observers = {};
    for (const key in state) {
      Object.defineProperty(this.state, key, {
        get: () => state[key],
        set: val => {
          state[key] = val;
          // 수정한 코드
          this.observers[key].forEach(obserber => obserber(val));
        },
      })
    }
  }

  subscribe(key, cb) {
    // 수정한 코드
    Array.isArray(this.observers[key])
      ? this.observers[key].push(cb)
      : this.observers[key] = [cb];
  }
}
```

## 결과

```bash
┣📦src
┃ ┣ 📂components
┃ ┃ ┣ 📜Header.js
┃ ┃ ┣ 📜Input.js
┃ ┃ ┗ 📜Message.js
┃ ┣ 📂core
┃ ┃ ┣ 📜Component.js
┃ ┃ ┗ 📜Store.js
┃ ┣ 📂store
┃ ┃ ┗ 📜message.js
┃ ┣ 📜App.js
┣ ┗ 📜main.js

```

![store](https://raw.githubusercontent.com/jinnkimm7/jin-blog/5213bfe18ce8457d7d67db5465cba7aa52cee3e6/public/images/vanilla-js/store/store.gif)