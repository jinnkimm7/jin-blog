---
title: 'Storybook에 Tailwind CSS 적용하기'
description: '스토리북에 테일윈드를 적용하고 기록한 포스팅입니다.'
tags:
  - Storybook
  - Tailwind CSS
createdAt: '2023-11-16'
---

리액트로 프로젝트를 진행할 때 핵심 중 하나는 *컴포넌트*입니다. 스토리북은 컴포넌트를 독립적인 환경에서 구축해볼 수 있는 툴이고, 개발시 좀 더 컴포넌트에 집중할 수 있도록 도와줍니다. 따라서 앞으로 프로젝트를 진행할 때 스토리북을 사용해보고 싶고, 또 이전 프로젝트 때 사용했던 Tailwind CSS를 함께 사용해보고 싶기에 스토리북에 Tailwind CSS를 적용하는 방법을 기록해 놓으려고 합니다.

## AS-IS

아래의 과정을 통해 앱을 설치했습니다.

- [Adding TypeScript](https://create-react-app.dev/docs/adding-typescript/)
- [Install Tailwind CSS with Create React App](https://tailwindcss.com/docs/guides/create-react-app)
- [Install Storybook](https://storybook.js.org/docs/react/get-started/install)

버튼 컴포넌트에 Tailwind CSS를 적용했는데 스토리북에는 적용이 안되고 있습니다.
![](https://github.com/jinnkimm7/jin-blog/blob/main/public/images/storybook-tailwind/1.png?raw=true)

스토리북에도 Tailwind CSS를 적용해보도록 하겠습니다.

## TO-BE

- tailwind 소스 파일을 만들고 tailwind directives를 추가합니다.

```css
/* tailwind-input.css */
@tailwind base;
@tailwind components;
@tailwind utilities;
```

- tailwind cli를 실행하고, 컴파일된 CSS 파일을 html에 추가합니다.

```bash
npx tailwindcss -i ./src/tailwind-input.css -o ./src/styles/tailwind.css --watch
```

```html
<!-- public/index.html -->
<head>
  <!-- ... -->
  <link href="/src/styles/tailwind.css" rel="stylesheet">
  <!-- ... -->
</head>
```

- 마지막으로 preview.ts에 컴파일된 CSS를 import해주면, 테일윈드가 스토리북에 적용된 것을 확인할 수 있습니다.
![](https://github.com/jinnkimm7/jin-blog/blob/main/public/images/storybook-tailwind/2.png?raw=true)

- 하지만, 스토리북에 테일윈드를 적용하기 위해서 테일윈드와 스토리북 두 프로세스를 실행해야하고, 두 번의 명령어를 입력해 실행하는 것은 약간 귀찮습니다.
- 이 문제를 해결하기 위해 concurrently라는 패키지를 추가합니다.

```bash
npm i concurrently
```

```json
// ...
  "scripts": {
    // ...
    // 스토리북을 실행하면 watch라는 접두사가 붙은 스크립트들을 실행하게 되고, 스토리북과 테일윈드에 watch 붙었기 때문에 한 번에 두개의 프로세스를 실행할 수 있게됩니다.
    "storybook": "concurrently 'npm:watch:*'",
    "watch:storybook": "storybook dev -p 6006",
    "watch:tailwind": "npx tailwindcss -i ./src/tailwind-input.css -o ./src/styles/tailwind.css --watch",
    // 스토리북을 실행하기 전에 테일윈드를 실행하도록 빌드 스크립트를 업데이트합니다.
    "build:tailwind": "npx tailwindcss -i ./src/tailwind-input.css -o ./src/styles/tailwind.css",
    "build-storybook": "npm build:tailwind && storybook build"
    // ...
  },
// ...
```

이제 클래스명이 바뀌자마자 컴파일하고 스토리북에 적용되는 것을 확인할 수 있습니다.

![](https://github.com/jinnkimm7/jin-blog/blob/main/public/images/storybook-tailwind/3.gif?raw=true)

## 참고
- [install tailwindcss and watch for changes #shorts](https://www.youtube.com/watch?v=Di1n3ME02GE)
- [Tailwind and Storybook… FINALLY!](https://www.youtube.com/watch?v=zlmpn88LxNM&t=75s)