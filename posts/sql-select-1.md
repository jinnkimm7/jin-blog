---
title: 'SELECT(1) | MySQL'
description: '프로그래머스 SQL 고득점 Kit의 SELECT 문제를 풀고 기록한 포스팅입니다.'
tags:
  - MySQL
  - 프로그래머스
createdAt: '2023-09-22'
---

[인기 있는 아이스크림](https://school.programmers.co.kr/learn/courses/30/lessons/133024?language=mysql)
```sql
SELECT FLAVOR
FROM FIRST_HALF
ORDER BY TOTAL_ORDER DESC, SHIPMENT_ID ASC
;
```

[과일로 만든 아이스크림 고르기](https://school.programmers.co.kr/learn/courses/30/lessons/133025?language=mysql)
```sql
SELECT A.FLAVOR
FROM FIRST_HALF A INNER JOIN ICECREAM_INFO B
ON A.FLAVOR = B.FLAVOR
WHERE (A.TOTAL_ORDER > 3000) AND (B.INGREDIENT_TYPE = 'fruit_based')
ORDER BY A.TOTAL_ORDER DESC
;
```

[강원도에 위치한 생산공장 목록 출력하기](https://school.programmers.co.kr/learn/courses/30/lessons/131112?language=mysql)
```sql
SELECT FACTORY_ID, FACTORY_NAME, ADDRESS
FROM FOOD_FACTORY
WHERE ADDRESS LIKE '강원도%'
;
```

[조건에 부합하는 중고거래 댓글 조회하기](https://school.programmers.co.kr/learn/courses/30/lessons/164673?language=mysql)
```sql
SELECT A.TITLE, A.BOARD_ID, B.REPLY_ID, B.WRITER_ID, B.CONTENTS,
DATE_FORMAT(B.CREATED_DATE, '%Y-%m-%d') AS CREATED_DATE
FROM USED_GOODS_BOARD AS A INNER JOIN USED_GOODS_REPLY AS B
ON A.BOARD_ID = B.BOARD_ID
WHERE SUBSTR(A.CREATED_DATE,1,7) = '2022-10'
ORDER BY CREATED_DATE ASC, A.TITLE ASC
;
```

[조건에 맞는 도서 리스트 출력하기](https://school.programmers.co.kr/learn/courses/30/lessons/144853?language=mysql)
```sql
SELECT BOOK_ID, DATE_FORMAT(PUBLISHED_DATE, '%Y-%m-%d') AS PUBLISHED_DATE
FROM BOOK
WHERE (CATEGORY = '인문') AND (SUBSTR(PUBLISHED_DATE,1,4) = '2021')
;
```

- [DATE_FORMAT](https://www.w3schools.com/sql/func_mysql_date_format.asp#gsc.tab=0)
  - DATE_FORMAT(date, format)
- [SUBSTR](https://www.w3schools.com/sql/func_mysql_substr.asp)
  - SUBSTR(string, start, length)