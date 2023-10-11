---
title: '브라우저의 렌더링 과정'
description: '브라우저의 렌더링 과정에 대해서 공부하고 정리한 포스팅입니다.'
tags:
  - 브라우저
  - 렌더링
createdAt: '2023-10-11'
---

## 궁금했던 이유

자바스크립트가 처음 등장했을 때는 브라우저만이 자바스크립트의 유일한 사용처였지만, Node.js가 등장하면서 브라우저가 아닌 환경에서도 자바스크립트를 실행할 수 있게 되었습니다.  하지만, 아직도 자바스크립트가 가장 많이 사용되는 분야는 웹 브라우저 환경에서 동작하는 웹페이지 어플리케이션의 클라이언트 사이드입니다. 

클라이언트 사이드의 자바스크립트는 HTML, CSS와 함께 실행되어 `파싱` 하고 `렌더링` 해주는데, 프론트엔드 개발자로서 필수적으로 알아야하는 지식이라고 생각했고, 정리해보려고합니다.

## 브라우저

브라우저는 사용자가 서버에 요청한 자원들을 보여주는 어플리케이션입니다.

![브라우저의 구성요소](https://raw.githubusercontent.com/jinnkimm7/jin-blog/2cf3636a2187b2d255485345344114c9a46eea42/public/images/browser/browser-rendering/1.png)

브라우저의 구성요소는 위 사진과 같이 구성되었지만, 오늘은 브라우저 렌더링 과정에 대해서 공부해볼 것이기 때문에 렌더링에 필요한 구성요소에 대해서만 알아보겠습니다.

- 렌더링 엔진은 요청된 컨텐츠를 보여줍니다. 예를들면, 만약 요청된 컨텐츠가 HTML이라면, 렌더링 엔진은 HTML, CSS 등을 `파싱` 하고 파싱된 컨텐츠들을 스크린에 보여줍니다.
- 자바스크립트 인터프리터는 자바스크립트 코드를 파싱하고 실행합니다.

## 렌더링 과정

1. request / response 
    - 서버에 자원(파일들)을 요청하기 위해 브라우저에 URL을 입력한다.
2. HTML 파싱과 DOM 생성
    - 서버에서 받아온 HTML 파일은 우리가 알고 있는 문자열로 이루어진 텍스트입니다.
    - 그 텍스트를 파싱(parsing)해 브라우저가 이해할 수 있는 자료구조(객체)인 DOM을 생성합니다.
    - DOM은 DOM API를 제공하고, 즉 자바스크립트 코드를 이용해서 DOM을 조작할 수 있습니다.
3. CSS 파싱과 CSSOM 생성
    - DOM을 생성하던 중 link 태그나 style 태그를 만나면 DOM 생성을 일시 중단하고,
    - CSS로부터 HTML과 동일한 과정을 거쳐 CSSOM을 생성합니다.
4. 렌더 트리 생성
    - DOM과 CSSOM을 합쳐 렌더 트리를 생성합니다.
    - 하지만, 렌더트리에는 DOM에서 화면에 렌더링 되지 않는 노드들(head, meta)과 CSS에 의해 표시 되지 않는 노드(display: none)들은 포함되지 않습니다.
5. 레이아웃 및 페인팅
    - 완성된 렌더트리를 기반으로 레이아웃(위치와 크기)을 구상하고, 페인팅(픽셀로 변환)합니다.
    - 이후 페이지가 최종적으로 렌더링 됩니다.
> 주의해야할 점

자바스크립트에 의해 노드가 추가 된다거나 삭제된다면 렌더트리가 바뀌게됩니다. 또한, CSS에 의해 레이아웃이 변경 될 수 있습니다. 이러한 경우, 리렌더링이 발생하고 성능에 악영향을 줄 수 있습니다.
    

![렌더트리](https://raw.githubusercontent.com/jinnkimm7/jin-blog/2cf3636a2187b2d255485345344114c9a46eea42/public/images/browser/browser-rendering/2.png) 

## 참고 자료

- [**브라우저는 어떻게 동작하는가?**](https://d2.naver.com/helloworld/59361)
- [How Browser Work](https://web.dev/howbrowserswork/)
- [**브라우저 동작 원리**](https://poiemaweb.com/js-browser)
- [**렌더링 트리 생성, 레이아웃 및 페인트**](https://web.dev/articles/critical-rendering-path/render-tree-construction?hl=ko)