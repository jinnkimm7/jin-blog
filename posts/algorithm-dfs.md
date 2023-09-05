---
title: 'DFS | JavaScript'
description: 'DFS 알고리즘을 자바스크립트로 공부하고 정리한 포스팅입니다.'
createdAt: '2023-09-05'
category: 'Algorithm'
---

## DFS

DFS는 대표적인 `그래프 탐색 알고리즘` 중 하나입니다. `탐색`이란 많은 양의 데이터 중 원하는 데이터를 찾는 것을 의미합니다.

대표 문제 유형으로는, `경로탐색, 네트워크, 조합만들기` 문제가 있습니다.

DFS는 그래프 내의 모든 노드를 한 번씩 탐색하기 위해, Depth라는 이름에서 알 수 있듯이 깊은 부분부터 우선 탐색합니다. 

`스택 혹은 재귀함수`를 이용하여 구현할 수 있지만, 구현의 편리성 때문에 `재귀함수`를 많이 이용합니다. 탐색의 속도가 BFS보다 느린 경향이 있지만, 구현의 편리성 혹은 코드를 검증하기가 비교적 쉬워 BFS 대신 사용하는 경우 또한 많습니다. DFS를 응용하여 `모든 경우의 수`를 계산하는 백트레킹 알고리즘을 구현할 수 있습니다.

DFS에 대해서 알아보기 전에, 알아야할 두 가지 자료구조에 대해서 먼저 정리해보겠습니다.

## 그래프의 표현

일반적으로 자바스크립트에서 그래프를 표현할 때, 2차원 배열을 이용합니다.

다음 아래의 그래프를 자바스크립트로 표현해보겠습니다.

![그림1](https://raw.githubusercontent.com/jinnkimm7/jin-blog/fd3008c50b02290b26c545c421c84f97c8d4d1f8/public/images/algorithm/dfs/dfs1.jpeg)

```js
const graph = [
  [],
  [1, 3],
  [1, 5],
  [1, 4, 5],
  [3, 5],
  [2, 4],
];
```

### DFS 구현
![그림2](https://raw.githubusercontent.com/jinnkimm7/jin-blog/fd3008c50b02290b26c545c421c84f97c8d4d1f8/public/images/algorithm/dfs/dfs2.jpeg)

```js
// 그래프 구현
const graph = [
  [],
  [2, 3, 8],
  [1, 7],
  [1, 4, 5],
  [3, 5],
  [3, 4],
  [7],
  [2, 6, 8],
  [1, 7],
];
// 각 노드의 방문 여부
const visited = new Array(9).fill(false);
// dfs 정의
function dfs(x) {
  visited[x] = true;
  console.log(x);

  for (let y of graph[x]) if (!visited[y]) dfs(y);
}
// dfs 호출
dfs(1);
// 1 -> 2 -> 7 -> 6 -> 8 -> 3 -> 4 -> 5 의 순으로 숫자를 출력하게 됩니다.
```

## 문제

- [내가 푼 문제](https://solved.ac/search?query=s%40jiinnkimm7%20%23dfs&sort=level&direction=desc)
- [실버 추천 문제](https://coding-grandpa.tistory.com/122)