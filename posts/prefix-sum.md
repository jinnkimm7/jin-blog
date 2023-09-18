---
title: '누적합 알고리즘 | JavaScript'
description: '누적합 알고리즘을 공부하고 포스팅 했습니다. 대표적인 백준 11441 합 구하기 문제를 풀이했습니다.'
tags:
  - Algorithm
  - 누적합
createdAt: '2023-08-22'
---

[합 구하기 - 실버 3](https://www.acmicpc.net/problem/11441)는 전형적인 누적합 알고리즘의 문제입니다.

위 문제를 간단히 요약하자면, [10, 20, 30, 40, 50]처럼 N개의 숫자를 가진 배열이 주어지고, 구간의 개수 M개가 주어져, M개의 구간합을 구하는 문제입니다.

저는 직관적으로 배열의 구간 (i, j) slice하고, reduce 메소드를 이용해 answer 변수에 저장하여 출력하는 아래와 같은 풀이로 문제를 풀었습니다.

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const arr = input[1].split(' ').map(Number);
const m = Number(input[2]);

let answer = '';
for (let a = 3; a < m + 3; a++) {
  const [i, j] = input[a].split(' ').map(Number);
  const temp = arr.slice(i - 1, j);
  answer += temp.reduce((a, b) => a + b, 0) + '\n';
}

console.log(answer);
```

결과는 메모리 초과로 실패했습니다. 

1 ≤ M ≤ 100,000와 1 ≤ N ≤ 100,000라는 조건으로, 시간 복잡도가 최악의 경우 100억이 될 수 있어서 시간 초과가 날 것이라고 예상했는데, 메모리 초과가 나서 당황했습니다. (아마 answer의 문자열 길이가 길어져서...?)

구간의 개수(M)가 1개만 주어진다면 선형 탐색을 해도 되지만, 구간의 개수가 여러개 주어지기 때문에, O(N + M)의 시간 복잡도로 풀이를 해야 정답에 맞출 수 있습니다.

이럴 때, `누적합 알고리즘(Prefix Sum)`을 이용한다면, O(N + M)의 시간 복잡도를 달성할 수 있습니다.

## 누적합 알고리즘 (Prefix Sum)

누적합 알고리즘은 처음부터 특정구간까지의 합을 미리 구해 배열을 만들어 놓고, 이 접두사 합을 이용해서 문제를 풀이하는 것입니다.

예시는 다음과 같습니다.

```js
const arr = [10, 20, 30, 40, 50];

// 처음부터 0번째까지의 합은 0이기때문에 0을 할당합니다.
const prefixSum = [0];

// 중간 합을 구하기 위한 변수를 선언합니다.
let intervalSum = 0;

// arr 배열을 순회하면서 중간 합 변수에 더해주고, 그 합을 누적합 배열(prefixSum)에 넣어준다.
for(let num of arr) {
  intervalSum += num;
  prefixSum.push(intervalSum);
}

/*
이제 누적합 배열은 다음과 같을 것입니다.
prefixSum [0, 10, 30, 60, 100, 150]

arr의 2번째 배열부터 4번째 배열의 합을 구하고 싶다면, 
arr의 배열에서 직접 20, 30, 40을 더해줘도 값은 90이 될 것이지만

prefixSum 배열을 이용해,

처음부터 4번째 원소까지의 합인 100 (prefixSum[4])와
처음부터 1번째 원소까지의 합인 10 (prefixSum[1])를 빼줘도
원하는 결과는 같을 것입니다.
*/

const left = 2;
const right = 4;
console.log(prefixSum[right] - prefixSum[left - 1]);
```

## 풀이

누적합 알고리즘을 이용해서 [합 구하기 - 실버 3](https://www.acmicpc.net/problem/11441) 문제를 아래과 같이 해결했습니다.

```js
const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');

const arr = input[1].split(' ').map(Number); // 주어진 숫자 배열
const m = Number(input[2]); // 구간의 갯수

// 누적합 구하기
const prefixSum = [0];
let intervalSum = 0;
for(let num of arr) {
  intervalSum += num;
  prefixSum.push(intervalSum);
}

let answer = '';
for (let i = 3; i < 3 + m; i++) {
  const [left, right] = input[i].split(' ').map(Number);
  answer += prefixSum[right] - prefixSum[left - 1] + '\n';
}

console.log(answer);
```

## 유사한 문제
- [구간 합 구하기 4 - 실버3](https://www.acmicpc.net/problem/11659)
- [수들의 합 2 - 실버4](https://www.acmicpc.net/problem/2003)
- [2차원 배열의 합 - 실버5](https://www.acmicpc.net/problem/2167)
- [구간 합 구하기 5 - 실버1](https://www.acmicpc.net/problem/11660)
- [부분합 - 골드4](https://www.acmicpc.net/problem/1806)