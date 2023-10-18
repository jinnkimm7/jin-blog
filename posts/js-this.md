---
title: 'this | JavaScript'
description: '자바스크립트에서 호출 방식에 따라 동적으로 바인딩되는 this에 대해서 정리해보았습니다. '
tags:
  - JavaScript
createdAt: '2023-10-18'
---

자바스크립트에서의 this는 다른 언어와 조금 다르게 동작합니다. 자바나 C++과 같은 언어에서 this는 항상 생성할 인스턴스를 가리킵니다.(정적 바인딩) 하지만, 자바스크립트의 this는 `함수 호출 방식`에 따라 동적으로 결정됩니다. 

오늘은 this에 대해서 정리해보려고합니다.

## 1. 일반 함수 호출

함수 내부, 즉 일반 함수에서 this를 호출하면 this는 글로벌 this를 가리키게 됩니다. 하지만 use strict 모드를 사용하면, 함수 내부에 this라는 것이 없기 때문에 undefined가 바인딩됩니다.

```js
function foo() {
  console.log(this); // window
}
```

## 2. 메서드 호출

메서드 내부의 this는 메서드를 호출한 객체에 바인딩됩니다. 하지만, 자바스크립트에서 this는 `동적`이기 때문에 `호출 위치`를 주의해야합니다.

```js
const student = {
  name: 'jin',
  position: 'FE',
  getInformation: function () {
    // 메서드 내부의 this는 호출한 객체에 바인딩됩니다.
    console.log(`${this.name}, ${this.position}`);
  }
}

// getInformation이라는 메서드를 person이 호출했기 때문에, student에 바인딩됩니다.
student.getInformation(); // jin, FE

// newStudent에 getInformation 메서드를 할당합니다.
newStudent.getInformation = student.getInformation;
console.log(newStudent); // { name: 'kim', getInformation: [Function: getInformation] }

// getInformation 메소드를 호출한 객체는 newStudent이기 때문에 아래와 같은 결과를 출력합니다.
newStudent.getInformation(); // kim, BE

// getInformation을 변수에 할당하고 호출했을 시,
const getInformation = student.getInformation;
// getInformation 메서드를 일반함수로 호출하기 때문에 아래와 같은 결과를 출력합니다.
getInformation(); // undefined, undefined
```

## 3. 생성자 함수 호출

생성자 함수에서의 this는 생성될 인스턴스가 바인딩됩니다. 하지만, 동적으로 바뀔 수 있기 때문에 주의해야합니다.

```js
function Car(name) {
  this.name = name;
  this.printName = function () {
    // 생성자 함수 내부의 this는 생성될 인스턴스와 바인딩됩니다. 
    console.log(`자동차 이름은 ${this.name}입니다.`);
  }
}

function Bicyle(name) {
  this.name = name;
  this.printName = function () {
    console.log(`자전거 이름은 ${this.name}입니다.`);
  }
}

const car = new Car('붕붕이');
const bicyle = new Bicyle('따릉이');


car.printName(); // 자동차 이름은 붕붕이입니다.
bicyle.printName(); // 자전거 이름은 따릉이입니다.

car.printName = bicyle.printName;

// 동일한 메서드를 호출했지만, this는 메서드가 호출한 객체에 바인딩 되어 결과는 각각 다르게 됩니다. 
car.printName(); // 자전거 이름은 붕붕이입니다.
bicyle.printName(); // 자전거 이름은 따릉이입니다.
```

## 4. bind에 의한 호출

bind 함수 혹은 arrow function을 이용해서 수동적으로 정적바인딩을 할 수 있습니다.

```js
function Bicyle(name) {
  this.name = name;
  // this.printName = function () {
  //   console.log(`자전거 이름은 ${this.name}입니다.`);
  // }
  // 2. arrow function : 화살표 함수 밖에서 제일 근접한 스코프의 this를 가리킵니다.
    this.printName = () => {
    console.log(`자전거 이름은 ${this.name}입니다.`);
  }

  // 1. bind 함수를 이용해서 수동적으로 객체와 바인딩 해주었습니다.
  // this.printName = this.printName.bind(this);
}

// 생략

car.printName = bicyle.printName;

// 동일한 메서드를 호출했지만, this는 메서드가 호출한 객체에 바인딩 되어 결과는 각각 다르게 됩니다. 
car.printName(); // 자전거 이름은 따릉이입니다.
bicyle.printName(); // 자전거 이름은 따릉이입니다.
```

## 정리

자바스크립트에서 this는 호출 방식에 따라 동적으로 결정되기 때문에 주의해야합니다. bind함수 또는 화살표 함수를 사용하면 this를 정적으로 바인딩해줄 수 있습니다.

## 참고

- 모던 자바스크립트 Deep Dive