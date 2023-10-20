---
title: 'N과 M | JavaScript'
description: '백준의 백트래킹 기본인 N과 M 문제들을 풀고 정리한 포스팅입니다.'
tags:
  - 백트래킹
  - 백준
createdAt: '2023-10-20'
---

## 문제

4문제 공통적으로 1부터 N까지 자연수 중에 길이가 M인 수열을 구하는 문제입니다. 문제마다 조건이 약간씩 다르고, 백트래킹 문제를 풀다 보니 응용 될 수 있는 부분들이 있었고, 기본 문제이다보니 이번기회에 다시 정리해보았습니다.

### 1. [N과 M (1)](https://www.acmicpc.net/problem/15649)

조건
- 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);

let answer = '';

const arr = [];
for (let i = 1; i <= n; i++) arr.push(i);

const visited = new Array(m).fill(false);
const selected = [];
function dfs(depth) {
  if (depth === m) {
    answer += `${selected.join(' ')}` + '\n';
    return;
  }

  for (let i = 0; i < n; i++) {
    if (visited[i]) continue;

    selected.push(arr[i]);
    visited[i] = true;
    dfs(depth + 1);
    selected.pop();
    visited[i] = false;
  }
}

dfs(0);
console.log(answer);
```

### 2. [N과 M (2)](https://www.acmicpc.net/problem/15650)

조건
- 1부터 N까지 자연수 중에서 중복 없이 M개를 고른 수열
- 고른 수열은 오름차순이어야 한다.

풀이
- 앞 문제와 마찬가지로 중복을 허용하지 않기 때문에, 방문처리 배열을 이용했습니다. 
- start 변수를 사용해서 한번 선택된 원소는 다음 재귀함수에서 선택되지 않도록 했습니다.

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);

let answer = '';

const arr = [];
for (let i = 1; i <= n; i++) arr.push(i);

const visited = new Array(m).fill(false);
const selected = [];
function dfs(depth, start) {
  if (depth === m) {
    answer += `${selected.join(' ')}` + '\n';
    return;
  }

  for (let i = start; i < n; i++) {
    if (visited[i]) continue;

    selected.push(arr[i]);
    visited[i] = true;
    dfs(depth + 1, i + 1);
    selected.pop();
    visited[i] = false;
  }
}

dfs(0, 0);
console.log(answer);
```

### 3. [N과 M (3)](https://www.acmicpc.net/problem/15651)

조건
- 1부터 N까지 자연수 중에서 M개를 고른 수열
- 같은 수를 여러 번 골라도 된다.

풀이
- 중복을 허용하기 때문에 방문처리 배열을 없앴습니다.

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);

let answer = '';

const arr = [];
for (let i = 1; i <= n; i++) arr.push(i);

const selected = [];
function dfs(depth) {
  if (depth === m) {
    answer += `${selected.join(' ')}` + '\n';
    return;
  }

  for (let i = 0; i < n; i++) {
    selected.push(arr[i]);
    dfs(depth + 1);
    selected.pop();
  }
}

dfs(0);
console.log(answer);
```

### 4. [N과 M (4)](https://www.acmicpc.net/problem/15652)

조건
- 1부터 N까지 자연수 중에서 M개를 고른 수열
- 같은 수를 여러 번 골라도 된다.
- 고른 수열은 비내림차순이어야 한다.
    - 길이가 K인 수열 A가 A1 ≤ A2 ≤ ... ≤ A(K-1) ≤ A(K)를 만족하면, 비내림차순이라고 한다.

풀이
- 중복을 허용하기 때문에 방문처리 배열을 사용하지 않았습니다.
- 비내림차순이 되도록 하기 위해 start 변수를 사용했습니다.

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);

let answer = '';

const arr = [];
for (let i = 1; i <= n; i++) arr.push(i);

const selected = [];
function dfs(depth, start) {
  if (depth === m) {
    answer += `${selected.join(' ')}` + '\n';
    return;
  }

  for (let i = start; i < n; i++) {
    selected.push(arr[i]);
    dfs(depth + 1, i);
    selected.pop();
  }
}

dfs(0, 0);
console.log(answer);
```