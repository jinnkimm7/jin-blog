---
title: 'SELECT(3) | MySQL'
description: '프로그래머스 SQL 고득점 Kit의 SELECT 문제를 풀고 기록한 포스팅입니다.'
tags:
  - MySQL
  - 프로그래머스
createdAt: '2023-09-26'
---

[재구매가 일어난 상품과 회원 리스트 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/131536?language=mysql)
```sql
SELECT USER_ID, PRODUCT_ID
FROM ONLINE_SALE
GROUP BY USER_ID, PRODUCT_ID
HAVING COUNT(*) >= 2
ORDER BY USER_ID ASC, PRODUCT_ID DESC
;
```

[서울에 위치한 식당 목록 출력하기](https://school.programmers.co.kr/learn/courses/30/lessons/131118?language=mysql)

```sql
SELECT A.REST_ID, A.REST_NAME, A.FOOD_TYPE, A.FAVORITES, A.ADDRESS, ROUND(AVG(B.REVIEW_SCORE), 2) AS SCORE
FROM REST_INFO AS A JOIN REST_REVIEW AS B
ON A.REST_ID = B.REST_ID
GROUP BY A.REST_ID
HAVING A.ADDRESS LIKE '서울%'
ORDER BY SCORE DESC, A.FAVORITES DESC
;
```

[오프라인/온라인 판매 데이터 통합하기](https://school.programmers.co.kr/learn/courses/30/lessons/131537?language=mysql)
```sql
(
SELECT DATE_FORMAT(SALES_DATE, '%Y-%m-%d') AS SALES_DATE, PRODUCT_ID, USER_ID, SALES_AMOUNT
FROM ONLINE_SALE 
WHERE SALES_DATE LIKE '2022-03%'

UNION

SELECT DATE_FORMAT(SALES_DATE, '%Y-%m-%d') AS SALES_DATE, PRODUCT_ID, NULL AS USER_ID, SALES_AMOUNT
FROM OFFLINE_SALE 
WHERE SALES_DATE LIKE '2022-03%'
)
ORDER BY SALES_DATE ASC, PRODUCT_ID ASC, USER_ID ASC
;
```
- OFFLINE_SALE 테이블에 USER_ID를 만들고 NULL로 채우기
	- NULL AS USER_ID