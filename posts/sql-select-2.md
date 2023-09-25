---
title: 'SELECT(2) | MySQL'
description: '프로그래머스 SQL 고득점 Kit의 SELECT 문제를 풀고 기록한 포스팅입니다.'
tags:
  - MySQL
  - 프로그래머스
createdAt: '2023-09-25'
---

[평균 일일 대여 요금 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/151136?language=mysql)

```sql
SELECT ROUND(AVG(DAILY_FEE),0) AS AVERAGE_FEE
FROM CAR_RENTAL_COMPANY_CAR
GROUP BY CAR_TYPE
HAVING CAR_TYPE = 'SUV'
;
```

- ROUND(숫자값, 반올림할 자릿수)
- TRUNCATE(숫자값, 버릴 자릿수)

[12세 이하인 여자 환자 목록 출력하기](https://school.programmers.co.kr/learn/courses/30/lessons/132201?language=mysql)
```sql
SELECT PT_NAME, PT_NO, GEND_CD, AGE, IFNULL(TLNO, 'NONE') AS TLNO
FROM PATIENT
WHERE (AGE <= 12) AND (GEND_CD = 'W')
ORDER BY AGE DESC, PT_NAME ASC
;
```

- [IFNULL(컬럼명, null일 경우의 대체값)](https://www.w3schools.com/sql/func_mysql_ifnull.asp)

[3월에 태어난 여성 회원 목록 출력하기](https://school.programmers.co.kr/learn/courses/30/lessons/131120)

```sql
SELECT MEMBER_ID, MEMBER_NAME, GENDER, DATE_FORMAT(DATE_OF_BIRTH, '%Y-%m-%d')
FROM MEMBER_PROFILE
WHERE (MONTH(DATE_OF_BIRTH) = '03') AND (GENDER = 'W') AND TLNO IS NOT NULL
;
```

- [IS NOT NULL](https://www.w3schools.com/mysql/mysql_null_values.asp)
- [Month(date)](https://www.w3schools.com/sql/func_mysql_month.asp)
  - Year(date), Day(date)도 또한 가능하다. 