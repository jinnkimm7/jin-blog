---
title: 'async, defer | JavaScript'
description: 'HTML5 이후 등장한 script의 async, defer 어트리뷰트에 대해서 정리했습니다.'
tags:
  - 브라우저
  - JavaScript
createdAt: '2023-10-23'
---

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script> // HTML 파싱 중단
    const root = document.querySelector('#root');
    root.append('Hello, World!');
  </script>
</head>

<body>
  <div id="root"></div>
</body>

</html>
```

이전에 포스팅했던 [브라우저의 렌더링 과정](http://localhost:3000/posts/browser-rendering)을 내용을 바탕으로 위 html 코드를 해석해보면, 브라우저는 동기적으로, 즉 순차적으로 HTML, CSS, JS를 파싱합니다. 파싱 중 script 코드를 만나면, 렌더링 엔진이 DOM 트리를 만드는 것을 잠시 중단하고, 자바스크립트 엔진이 자바스크립트를 파싱합니다.

자바스크립트 코드는 DOM에서 id가 root인 요소를 취득하고 문자열 Hello, World!를 추가하라고 조작하고 있습니다. 하지만,  예상했던 결과를 얻지 못하게됩니다. 그 이유는 script 코드가 실행되는 시점에 아직 DOM은 완성되지 않았고, 완성되지 않은 요소를 조작할 수 없기 때문입니다.

script를 body 끝에 위치시키면 문제를 해결할 수 있습니다. 하지만, 자바스크립트에 매우 의존적인 웹사이트 경우 자바스크립트 파일을 fetching하는 시간과 실행하는 시간이 오래 걸리는 단점이 있습니다.

## async와 defer 어트리뷰트

근본적인 문제를 해결하기 위해 HTML5부터 자바스크립트 파싱에 의해 DOM 생성이 중단되는 문제를 해결하고자 async와 defer 어트리뷰트가 등장했습니다.

```html
<script src="/app.js" async></script>
<script src="/app.js" defer></script>
```

async나 defer를 사용하면 HTML 파싱과 자바스크립트 페칭이 비동기적으로 일어난다는 공통점이 있습니다. 둘의 차이점은 무엇일까요?

## async

![async의 동작과정](https://raw.githubusercontent.com/jinnkimm7/jin-blog/901401a0288540fb0a9a7fb591eee8ce209f1cfd/public/images/js/async-defer/1.png)

자바스크립트 로딩이 DOM 생성을 방해하지 않지만, 로딩이 끝난이후, 즉시 스크립트가 실행되서 DOM 생성을 중단시킵니다.

- 장점
  - 파일이 로드되자마자 실행되기 때문에 자바스크립트 파일이 클 경우 사용할 때 유용합니다.
- 단점
  - 자바스크립트 실행 순서가 중요할 경우 문제가 발생할 수 있습니다.
  - DOM이 완전히 생성되지 않았는데 파일이 실행될 수 있습니다.

## defer

![defer의 동작과정](https://raw.githubusercontent.com/jinnkimm7/jin-blog/901401a0288540fb0a9a7fb591eee8ce209f1cfd/public/images/js/async-defer/2.png)

자바스크립트 로딩이 DOM 생성을 방해하지 않고, DOM 생성이 끝난 이후에 자바스크립트가 실행됩니다.

- 장점
  - HTML 파싱 이후, 즉 DOM이 생성된 이후 실행되는 것이 보장됩니다. 
- 단점
  - defer 어트리뷰트를 가진 많은 자바스크립트가 있을때, HTML 파싱이 끝난 이후, 한번에 파일을 실행하기 때문에 속도가 느릴 수 있습니다.

## 결론

async도 장점에도 불구하고, defer를 사용하는 편이 더 안전하고 좋습니다.