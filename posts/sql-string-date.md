---
title: 'String, Date | MySQL'
description: '프로그래머스 SQL 고득점 Kit의 String, Date 문제를 풀고 기록한 포스팅입니다.'
tags:
  - MySQL
  - 프로그래머스
createdAt: '2023-11-03'
---

[자동차 평균 대여 기간 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/157342?language=mysql)

```sql
SELECT CAR_ID, ROUND(AVG(DATEDIFF(END_DATE, START_DATE) + 1), 1) AS AVERAGE_DURATION
FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
GROUP BY CAR_ID
HAVING AVERAGE_DURATION >= 7
ORDER BY AVERAGE_DURATION DESC, CAR_ID DESC
;
```

- [DATEDIFF](https://www.w3schools.com/sql/func_mysql_datediff.asp)

[자동차 대여 기록에서 장기/단기 대여 구분하기](https://school.programmers.co.kr/learn/courses/30/lessons/151138?language=mysql#)

```sql
SELECT HISTORY_ID, CAR_ID, 
    DATE_FORMAT(START_DATE, '%Y-%m-%d') AS START_DATE,
    DATE_FORMAT(END_DATE, '%Y-%m-%d') AS END_DATE,
CASE 
    WHEN DATEDIFF(END_DATE, START_DATE) + 1 >= 30 THEN '장기 대여' 
    ELSE '단기 대여' 
END AS RENT_TYPE
FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
WHERE START_DATE LIKE '2022-09-%'
ORDER BY HISTORY_ID DESC
;
```

- [CASE FUNCTION](https://www.w3schools.com/sql/func_mysql_case.asp)
    - 유사문제
        - [중성화 여부 파악하기](https://school.programmers.co.kr/learn/courses/30/lessons/59409?language=mysql)
        - [조건에 부합하는 중고거래 상태 조회하기](https://school.programmers.co.kr/learn/courses/30/lessons/164672?language=mysql)
- 오늘 대여하고 오늘 반납해도 하루이기때문에 DATEDIFF()에 +1을 해주었습니다.

[카테고리 별 상품 개수 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/131529?language=mysql)

```sql
SELECT LEFT(PRODUCT_CODE, 2) AS CATEGORY, COUNT(*) AS PRODUCTS
FROM PRODUCT
GROUP BY CATEGORY
;
```

- [LEFT(string, number_of_chars)](https://www.w3schools.com/sql/func_mysql_left.asp)

[조회수가 가장 많은 중고거래 게시판의 첨부파일 조회하기](https://school.programmers.co.kr/learn/courses/30/lessons/164671?language=mysql)

```sql
SELECT CONCAT('/home/grep/src/', B.BOARD_ID, '/', B.FILE_ID, B.FILE_NAME, B.FILE_EXT) AS PATH
FROM USED_GOODS_BOARD A JOIN USED_GOODS_FILE B 
ON A.BOARD_ID = B.BOARD_ID
WHERE A.VIEWS = (SELECT MAX(VIEWS) FROM USED_GOODS_BOARD)
ORDER BY B.FILE_ID DESC
;
```

- [CONCAT(expression1, expression2, expression3,...)](https://www.w3schools.com/sql/func_mysql_concat.asp)
- 가장 많은 중고거래 게시판은 서브쿼리로 조회

[조건에 맞는 사용자 정보 조회하기](https://school.programmers.co.kr/learn/courses/30/lessons/164670?language=mysql)

```sql
SELECT B.USER_ID, B.NICKNAME,
CONCAT(B.CITY, ' ', B.STREET_ADDRESS1, ' ', B.STREET_ADDRESS2) AS '전체주소',
CONCAT(SUBSTR(B.TLNO, 1, 3), '-', SUBSTR(B.TLNO, 4, 4), '-', SUBSTR(B.TLNO, 8, 4)) AS '전화번호'
FROM USED_GOODS_BOARD A JOIN USED_GOODS_USER B
ON A.WRITER_ID = B.USER_ID
GROUP BY A.WRITER_ID
HAVING COUNT(A.WRITER_ID) >= 3
ORDER BY B.USER_ID DESC
;
```

- [SUBSTR(string, start, length)](https://www.w3schools.com/sql/func_mysql_substr.asp)
- [RIGHT(string, number_of_chars)](https://www.w3schools.com/sql/func_mysql_right.asp)
- [MID(string, start, length)](https://www.w3schools.com/sql/func_mysql_mid.asp)

[취소되지 않은 진료 예약 조회하기](https://school.programmers.co.kr/learn/courses/30/lessons/132204?language=mysql)

```sql
SELECT A.APNT_NO, P.PT_NAME, A.PT_NO, D.MCDP_CD, D.DR_NAME, A.APNT_YMD
FROM 
APPOINTMENT A 
JOIN PATIENT P ON P.PT_NO = A.PT_NO
JOIN DOCTOR D ON D.DR_ID = A.MDDR_ID
WHERE A.APNT_YMD LIKE '2022-04-13%' AND A.MCDP_CD = 'CS' AND A.APNT_CNCL_YN = 'N'
ORDER BY A.APNT_YMD
;
```

- 세 개 테이블을 조인하는 것이 포인트

[자동차 대여 기록 별 대여 금액 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/151141?language=mysql)

```sql
SELECT H.HISTORY_ID, 
TRUNCATE(C.DAILY_FEE
* (DATEDIFF(H.END_DATE, H.START_DATE) + 1)
* (CASE 
    WHEN DATEDIFF(H.END_DATE, H.START_DATE) +1 < 7 THEN 1
    WHEN DATEDIFF(H.END_DATE, H.START_DATE) +1 < 30 THEN 0.95
    WHEN DATEDIFF(H.END_DATE, H.START_DATE) +1 < 90 THEN 0.92
    ELSE 0.85 END), 0) AS FEE
FROM
CAR_RENTAL_COMPANY_CAR C 
JOIN CAR_RENTAL_COMPANY_RENTAL_HISTORY H ON C.CAR_ID = H.CAR_ID
JOIN CAR_RENTAL_COMPANY_DISCOUNT_PLAN D ON C.CAR_TYPE = D.CAR_TYPE

WHERE C.CAR_TYPE = '트럭'
GROUP BY H.HISTORY_ID
ORDER BY FEE DESC, H.HISTORY_ID DESC
;
```
- 다시 풀어보기! 