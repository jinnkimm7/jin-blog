---
title: '백트래킹 | JavaScript'
description: '백트래킹 알고리즘을 자바스크립트로 공부하고 정리한 포스팅입니다.'
tags:
  - Algorithm
  - 백트래킹
createdAt: '2023-09-25'
---

백트래킹은 `완전탐색`을 목적으로 한 알고리즘입니다. 앞서 완전탐색을 하기 위한 알고리즘인 DFS, BFS를 공부했는데, 이 알고리즘들과 다른점은 `Back track`이라는 말처럼, 만약 해가 아닐 거 같으면 더 깊이 탐색하지 않고 이전 단계로 돌아나가서 해를 찾는 알고리즘입니다.

백트래킹의 일반적인 코드 형태는 다음과 같습니다.

```js
function recursive() {
  if 종료 조건을 만족한다면 {
    처리;
  }

  for 자식의 노드를 하나씩 확인하며 {
    if 임의의 조건을 만족한다면 {
      자식 노드 방문 처리;
      재귀 함수 호출;
      자식 노드 방문처리 해제;
    }
  }
}
```

## 문제 적용하기

[N과 M (1)](https://www.acmicpc.net/problem/15649)의 문제는 N과 M의 수를 입력받고, 1 ~ N까지의 숫자중 중복없이 M 길이의 수열을 모두 출력하는 문제입니다. 모든 조합의 수를 탐색하는 완전탐색이지만, 중복하지 않는 조건을 만족할 경우에만 완전탐색을 진행하기 때문에 전형적인 백트래킹 알고리즘으로 해결하면 되는 문제입니다. 

![N과 M 그래프](https://raw.githubusercontent.com/jinnkimm7/jin-blog/50beb8af2c3d3cedab327e69269f7b98b3fc3009/public/images/algorithm/backtracking/1.png)

그래프는 쉽게 떠올렸지만, 재귀함수를 사용하는데 완벽하지 않아 코드로 구현하는데 어려움을 겪었습니다. 

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const [n, m] = input[0].split(' ').map(Number);

const selected = [];
const visited = new Array(n + 1).fill(false);
let answer = '';

function dfs(depth) {
  if (depth === m) {
    answer += `${selected.join(' ')}\n`;
    return;
  }

  for (let i = 1; i <= n; i++) {
    if (visited[i]) continue;

    visited[i] = true;
    selected.push(i);
    dfs(depth + 1);
    selected.pop();
    visited[i] = false;
  }
}

dfs(0);
console.log(answer);
```

다음은 대표적인 [N-Queen](https://www.acmicpc.net/problem/9663)문제를 풀이해보겠습니다. 입력값 N을 받고, 퀸 N개를 서로 공격할 수 없게 놓는 경우의 수를 구하는 문제입니다.

![N퀸 그래프](https://raw.githubusercontent.com/jinnkimm7/jin-blog/50beb8af2c3d3cedab327e69269f7b98b3fc3009/public/images/algorithm/backtracking/2.png)

1행부터 퀸을 하나씩 놓으면서 완전탐색을 한다고 가정하면, 2^24번 탐색하게 됩니다. 퀸이 한 행의 위치에 이미 존재한다고 가정하고, 이미 존재하는 퀸의 위치의 같은 행, 같은 열, 좌우 대각선에는 위치 할 수 없기 때문에, 백트래킹을 해 탐색 범위를 좁히는 식으로 문제를 풀 수 있습니다. 트리 구조를 이용하면 더 이해하기가 쉽습니다.  
```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const n = Number(input[0]);

const queens = [];

function isPossible(x, y) {
  for (let [a, b] of queens) {
    if (a === x || b === y) return false; // 같은 행이나 열에 있는 경우,
    if (Math.abs(a - x) === Math.abs(b - y)) return false; // 대각선에 위치한 경우, 퀸을 놓을 수 없다.
  }
  return true;
}

let answer = 0;
function dfs(row) {
  if (row === n) answer++; // 퀸을 n개만큼 배치한 경우, 카운트

  for (let i = 0; i < n; i++) {
    // 현재 위치에 놓을 수 없다면, pass
    if (!isPossible(row, i)) continue; 
    queens.push([row, i]); // 현재위치에 queen을 놓고,
    dfs(row + 1); // 재귀함수 호출
    queens.pop(); // 현재 위치에서 퀸을 제거
  }
}

dfs(0);
console.log(answer);
```