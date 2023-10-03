---
title: 'var, let, const | JavaScript'
description: 'var, let, const의 차이점에 대해서 공부하고 포스팅했습니다.'
tags:
  - JavaScript
createdAt: '2023-10-03'
---

ES6부터, 자바스크립트에서 `변수`를 선언할 때, 더 이상 `var`를 쓰는 것을 지양하고, `변수에는 let`을 `상수는 const`의 사용을 권장한다고 합니다. 예전에 공부했던 어림풋한 기억으로는, var는 중복선언이 가능하고, 블록레벨 스코프가 아니라 함수레벨 스코프를 지원하기 때문에 의도하지 않는 오류를 발생시킨다고 했는데, `const,let`을 권장하는 이유를 정리해보려고 합니다.

## 중복선언

var로 선언된 변수는 같은 스코프 내에서 중복선언을 허용합니다. 

```js
var name = jin;
var name = kim;

var age = 20;
var age; // 초기화문이 없다면 변수 선언문은 무시됩니다.

console.log(name); // kim
console.log(age); // 20
```

하지만 let으로 선언되는 변수는 중복선언을 금지합니다.
```js
let name = jin;
let name = kim; // Uncaught SyntaxError: Identifier 'name' has already been declared
```

## 스코프

var로 선언된 변수는 오로지 함수 블록만 지역 스코프로 인정합니다. 

```js
var a = 10;

if (true) {
  // 함수 블록이 아니기 때문에, 아래 a는 전역변수이고, 앞서 선언된 a가 있기 때문에, 중복선언이 됩니다. 
  var a = 100;
}

console.log(a); // 100
```

let으로 선언된 변수는 블록 레벨 스코프를 따릅니다.

```js
let a = 10; // 전역변수

if (true) {
  let a = 100; // 지역변수
  let b = 200; // 지역변수
}

console.log(a); // 10
console.log(b); // Uncaught ReferenceError: b is not defined
```

## 호이스팅

var로 선언된 변수는 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작합니다. 

```js
console.log(hi); // undefined

var hi;
hi = 100;
console.log(hi); // 100
```

첫 번째 줄에 변수 hi를 호출했습니다. 참조할 변수가 없어 `참조 에러`가 발생해야하지만, undefined이 출력됩니다. 그 이유는 자바스크립트 엔진의 동작 과정 때문입니다.

> 1. 자바스크립트 엔진이 코드를 실행하기 전에, 먼저 실행되어 소스코드의 평가 과정을 거칩니다.
> 2. 평가 과정에서 자바스크립트 엔진은 var, let, const, function, class 등을 소스 코드에서 찾아내 먼저 실행합니다. 
> 3. 평가 과정이 끝난 이후, 위에서부터 차례대로 한줄씩 코드를 실행합니다. 

변수 선언이 어디에 존재하든 어디서든 변수를 참조할 수 있기 때문에, 변수 선언문이 코드의 선두로 끌어 올려진 것처럼 동작하는 자바스크립트의 고유의 특징을 `호이스팅(hoisting)`이라고 합니다.

var가 아닌 let으로 실행하면 어떻게 될까요?

```js
console.log(hi); // ReferenceError: hi is not defined

let hi; // 변수 선언문에서 초기화 단계가 실행됩니다.
console.log(hi); // undefined
hi = 100; // 변수 할당
console.log(hi); // 100
```

첫번째 코드에서 `참조에러`가 발생했습니다. 자바스크립트 엔진 동작과정에서 let으로 `선언`된 hi라는 변수는 호이스팅되었지만, `초기화`는 아직되지 않았습니다. let 키워드는 변수 `선언단계`와 `초기화단계`가 분리되고, 변수 `초기화` 전에 변수에 접근할 수 없기 때문에 위와 같은 에러가 발생했습니다. (var는 변수선언시 초기화 단계가 바로 진행됩니다.)

> 즉, let으로 선언한 스코프는 호이스팅이 발생하지 않는 것처럼 보입니다.


## 요약

변수의 유효 범위가 크면 클수록 코드의 가독성은 나빠지고, 의도치 않게 상태가 변경될 수 있는 위험이 있기 때문에, 변수의 스코프는 좁을수록 좋습니다. 그렇기 때문에, var 대신 let, const(변하지 않는 값에 const를 사용하지만 우선 기본적으로 const를 사용하고, 재할당이 필요한 경우 let을 사용)를 사용하는 것이 좋습니다.