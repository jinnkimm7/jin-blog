---
title: '다이나믹 프로그래밍 | JavaScript'
description: '다이나믹 프로그래밍 알고리즘을 공부하고 포스팅 했습니다.'
tags:
  - Algorithm
  - DP
createdAt: '2023-09-02'
---

## 다이나믹 프로그래밍(DP)이란,

메모리를 사용해서 중복 연산을 줄이고, 중복 연산을 줄여서 `시간 복잡도를 줄이기 위해서 사용`하는 알고리즘입니다. 

## 그렇다면, 다이나믹 프로그래밍을 `언제` 사용할까?
1. DFS나 BFS으로 완전탐색을 해서 답을 구할 수 있지만, 시간을 단축시켜야 하는 경우

2. 중복되는 연산이 많은 경우

## 피보나치 수열에 다이나믹 프로그래밍 적용하기

피보나치 수열은 아래와 같이 앞에 있는 두개의 항을 더한 것이 현재의 항을 결정합니다. 

> [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ...]

항들 간에 일정한 관계가 성립하기 때문에, A_n = A_n-1 + A_n-2 이라는 점화식이 성립하고, 재귀함수로 원하는 항의 값을 구할 수 있습니다.

```js
function fibonacci(n) {
  if (n === 1 || n === 2) return 1;

  return fibonacci(n - 1) + fibonacci(n - 2);
}
```

하지만, fibonacci 함수는 원하는 항의 값을 구하기 위해서, 중복된 함수를 호출하게 되고, O(n^2)의 시간복잡도 갖게 됩니다. 즉, 5번째 항이 아닌 50번째 항을 구하기 위해서 수많은 함수들, 중복된 함수들을 호출할 것이고, 시간복잡도 효율이 떨어지게 될 것입니다. 

![](https://github.com/jinnkimm7/jin-blog/blob/main/public/images/algorithm/dynamic-programming/dp1.png?raw=true)

DP를 이용해서 피보나치 함수를 만들어보겠습니다.

```js
const memo = new Array(100).fill(0);

function fibonacci_dp(n) {
  if (n === 1 || n == 2) return 1;

  // 계산한 적이 없으면, 재귀함수 호출
  if (!memo[n]) memo[n] = fibonacci_dp(n - 1) + fibonacci_dp(n - 2);

  // 계산한 적이 있으면, 값 호출
  return memo[n];
}
```

memo(memoization)이라는 변수에 값을 할당해 공간 복잡도는 증가했지만, 값을 계산한 적이 있으면 메모의 값을 이용해 중복된 연산을 하지 않아 시간 복잡도의 효율성은 증가했습니다. DP를 구현하는 방식은 크게 두가지, 상향식(Top-down)과 하향식(Bottom-up)이 있는데, 위 코드는 하향식(Bottom-up) 방식을 이용해 구현한 코드입니다.

![](https://github.com/jinnkimm7/jin-blog/blob/main/public/images/algorithm/dynamic-programming/dp2.png?raw=true)

상향식(Top-down) 방식을 이용해서도 DP 구현해보겠습니다.

```js
const memo = new Array(100).fill(0);

function fibonacci_dp(n) {
  memo[1] = 1;
  memo[2] = 1;

  for (let i = 3; i <= n; i++) {
    memo[i] = memo[i - 1] + memo[i - 2];
  }
  return memo[n];
}
```

상향식 방식은 반복문을 이용해 초기항부터 계산하고, 하향식 방식은 재귀함수를 이용해 큰 항을 구하기 위해서 이전 항을 호출하는 방식입니다. 둘 중 어느 방식을 사용해도 괜찮지만, 재귀함수가 많이 호출되는 경우, Stack Overflow 현상이 발생할 수 있기 때문에, 가능한 상향식 방법을 추천한다고 합니다.

- [DP 풀이한 문제들](https://solved.ac/search?query=s%40jiinnkimm7%20%23dp&sort=level&direction=desc)