---
title: 'GROUP BY | MySQL'
description: '프로그래머스 SQL 고득점 Kit의 GROUP BY 문제를 풀고 기록한 포스팅입니다.'
tags:
  - MySQL
  - 프로그래머스
createdAt: '2023-11-09'
---

1. [자동차 대여 기록에서 대여중 / 대여 가능 여부 구분하기](https://school.programmers.co.kr/learn/courses/30/lessons/157340?language=mysql)
    
    ```sql
    SELECT CAR_ID,
    MAX(CASE
        WHEN '2022-10-16' BETWEEN START_DATE AND END_DATE THEN '대여중'
        ELSE '대여 가능'
    END) AS AVAILABILITY
    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
    GROUP BY CAR_ID
    ORDER BY CAR_ID DESC
    ;
    ```
    
    - CAR_ID가 여러개 있으므로 MAX를 이용해 가장 나중에 기록이 끝난 CAR_ID를 가져와서 풀이했습니다.
    
    서브쿼리를 이용해서 풀기
    
    ```sql
    SELECT CAR_ID,
    CASE
        WHEN CAR_ID IN (
    			SELECT CAR_ID FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
    			WHERE '2022-10-16' BETWEEN START_DATE AND END_DATE) THEN '대여중'
        ELSE '대여 가능'
    END AS AVAILABILITY
    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
    GROUP BY CAR_ID
    ORDER BY CAR_ID DESC
    ;
    ```
    
    - 대여중인 CAR_ID를 서브쿼리로 뽑아서 풀었습니다.

1. [즐겨찾기가 가장 많은 식당 정보 출력하기](https://school.programmers.co.kr/learn/courses/30/lessons/131123?language=mysql)
    - 아래와 같은 쿼리를 작성하면, FAVORITES의 최댓값으로 그룹을 나누는 것이 아니라, 테이블의 가장 최상위에 있는 해당 튜플로 그룹을 나눈다.
    
    ```sql
    SELECT FOOD_TYPE, REST_ID, REST_NAME, FAVORITES
    FROM REST_INFO
    GROUP BY FOOD_TYPE
    ;
    ```
    
    - 정답 튜플들을 뽑아내기 위해서, 서브쿼리를 사용해서 FOOD_TYPE의 가장 높은 값을 가져온 후, WHERE절로 매칭해준다.
    
    ```sql
    SELECT FOOD_TYPE, REST_ID, REST_NAME, FAVORITES
    FROM REST_INFO
    WHERE (FOOD_TYPE, FAVORITES) IN (
    SELECT FOOD_TYPE, MAX(FAVORITES)
    FROM REST_INFO
    GROUP BY FOOD_TYPE)
    ORDER BY FOOD_TYPE DESC
    ;
    ```
    
2. [가격대 별 상품 개수 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/131530?language=mysql)
    
    ```sql
    SELECT TRUNCATE(PRICE, -4) AS PRICE_GROUP, COUNT(*) AS PRODUCTS
    FROM PRODUCT
    GROUP BY PRICE_GROUP
    ORDER BY PRICE_GROUP
    ;
    ```
    
    [TRUNCATE()](https://www.w3schools.com/sql/func_mysql_truncate.asp)
    
3. [식품분류별 가장 비싼 식품의 정보 조회하기](https://school.programmers.co.kr/learn/courses/30/lessons/131116?language=mysql)
    
    ```sql
    SELECT CATEGORY, PRICE AS MAX_PRICE, PRODUCT_NAME
    FROM FOOD_PRODUCT
    WHERE PRICE IN (
    SELECT MAX(PRICE) FROM FOOD_PRODUCT
    GROUP BY CATEGORY
    )
    AND CATEGORY IN ('과자', '국', '김치', '식용유')
    ORDER BY MAX_PRICE DESC
    ;
    ```
    
    - 먼저, CATEGORY 기준으로 GROUP BY를 하면 MAX(PRICE)를 구할 수 있지만 까지는 그 다음에 오는 PRODUCT_NAME이 GROUP BY로 묶인 것과 상관없는 PRODUCT_NAME이 나오게 되서 오답처리가 됩니다.
    - 그래서 CATEGORY, MAX(PRICE)를 서브쿼리를 이용해서 먼저 찾고 답을 구하면 됩니다.
4. [대여 횟수가 많은 자동차들의 월별 대여 횟수 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/151139?language=mysql)
    
    ```sql
    SELECT MONTH(START_DATE) AS MONTH, CAR_ID, COUNT(*) AS RECORDS
    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
    WHERE 
    DATE_FORMAT(START_DATE, '%Y-%m') BETWEEN '2022-08' AND '2022-10'AND 
    CAR_ID IN
    (SELECT CAR_ID
    FROM CAR_RENTAL_COMPANY_RENTAL_HISTORY
    WHERE DATE_FORMAT(START_DATE, '%Y-%m') BETWEEN '2022-08' AND '2022-10'
    GROUP BY CAR_ID
    HAVING COUNT(*) >= 5)
    GROUP BY MONTH, CAR_ID
    HAVING RECORDS >= 1
    ORDER BY MONTH ASC, CAR_ID DESC
    ;
    ```
    
    - 메인 쿼리에 조건을 안 넣어서 틀렸습니다.
5. [입양 시각 구하기(2)](https://school.programmers.co.kr/learn/courses/30/lessons/59413?language=mysql)
    
    ```sql
    SET @HOUR = -1;
    
    SELECT (@HOUR := @HOUR + 1) AS HOUR,
    (SELECT COUNT(*)
     FROM ANIMAL_OUTS
     WHERE HOUR(DATETIME) = @HOUR
    ) AS COUNT
    FROM ANIMAL_OUTS
    WHERE @HOUR < 23
    ;
    ```
    
6. [년, 월, 성별 별 상품 구매 회원 수 구하기](https://school.programmers.co.kr/learn/courses/30/lessons/131532?language=mysql)
    
    ```sql
    SELECT YEAR(O.SALES_DATE) AS YEAR, MONTH(O.SALES_DATE) AS MONTH, U.GENDER, COUNT(DISTINCT U.USER_ID) AS USERS
    FROM USER_INFO U JOIN ONLINE_SALE O
    ON U.USER_ID = O.USER_ID
    WHERE GENDER IS NOT NULL
    GROUP BY YEAR, MONTH, GENDER
    ORDER BY YEAR, MONTH, GENDER
    ;
    ```
    
    - 동일한 날짜, 회원 ID, 상품 ID 조합에 대해서는 하나의 판매 데이터만 존재하기 때문에 DISTINCT를 써주어야 정답처리가 됩니다.