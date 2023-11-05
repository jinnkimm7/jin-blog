---
title: 'HTTP (4) | Network'
description: 'HTTP 헤더와 캐시를 공부하고 정리한 포스팅입니다'
tags:
  - HTTP
  - Network
createdAt: '2023-11-05'
---

> 이 글은 [모든 개발자를 위한 HTTP 웹 기본 지식](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/dashboard) 강의를 듣고 정리한 내용입니다.

## HTTP 헤더1

### 용도
- HTTP 전송에 필요한 모든 부가정보를 헤더에 담았다.
- 예) 메세지 바디의 내용, 메세지 바디의 크기, 압축, 인증, 요청 클라이언트, 서버 정보, 캐시 관리 정보..
- 표준 헤더가 너무 많음
- 필요시 임의의 헤더 추가 가능
  - hellowolrd: hihi

### HTTP 표준 최신 스펙 - RFC7230

#### HTTP BODY - message body
```
HTTP/1.1 200 OK
<!-- 표현 헤더 -->
Content-Type: text/html;charset=UTF-8
Content-Length: 3423

<!-- 표현 데이터, 메세지 본문 -->
<html>
  <body>...</body>
</html>
```
- 메세지 본문을 통해 표현 데이터 전달
- 메세지 본문 = 페이로드(payload)
- 표현은 요청이나 응답에서 전달할 실제 데이터
- 표현 헤더는 표현 데이터를 해석할 수 있는 정보 제공
  - 데이터 유형(html, json), 데이터길이, 압축 정보 등등
- 참고: 표현 헤더는 표현 메타데이터와, 페이로드 메세지를 구분해야 하지만, 생략

### 표현 헤더

- Content-Type: 표현 데이터의 형식
- Content-Encoding: 표현 데이터의 압축 방식
- Content-Language: 표현 데이터의 자연 언어
- Content-Length: 표현 데이터의 길이

- 표현헤더는 전송, 응답 둘다 사용 

### 협상 (콘텐츠 네고시에이션)

클라이언트가 선호하는 표현요청

- Accept: 클라이언트가 선호하는 미디어 타입 전달
- Accept-Charset: 클라이언트가 선호하는 문자 인코딩
- Accept-Encoding: 클라이언트가 선호하는 압축 인코딩
- Accept-Language: 클라이언트가 선호하는 자연 언어
- 협상 헤더는 요청시에만 사용한다.
- 협상 우선순위도 적용할 수 있다.

### 전송 방식

- 단순 전송
- 압축 전송
  - Content-Encoding: gzip
- 분할 전송
  - Transfer-Encoding: chunked
- 범위 전송
  - Range: bytes=1001-2000
  - Content-Range: bytes 1001-2000/ 2000

### 일반 정보

#### From - 유저 에이전트의 이메일 정보
- 일반적으로 잘 사용안함
- 검색 엔진 같은 곳에서, 주로 사용
- 요청에서 사용

#### Referer - 이전 웹 페이지 주소
- 현재 요청된 페이지의 이전 웹 페이지 주소
- A -> B로 이동하는 경우 B를 요청할 때 Referer: A를 포함해서 요청
- Referer를 사용해서 유입 경로 분석가능
- 요청에서 사용
- 참고: referer는 referrer의 오타

#### User-Agent - 유저 에이전트 애플리케이션 정보
- 클라이언트의 애플리케이션 정보
- 통계 정보
- 어떤 종류의 브라우저에서 장애가 발생하는지 파악 가능
- 요청에서 사용

#### Server - 요청을 처리하는 ORIGIN 서버의 소프트웨어 정보
- Server: Apache/2.2.22(Debian)
- server: nginx
- 응답에서 사용

#### Date - 메세지가 발생한 날짜와 시간
- Date: Tue, 15 Nov 1994 08:12:31 GMT
- 응답에서 사용

### 특별한 정보

#### Host - 요청한 호스트 정보(도메인)
```
GET /hello HTTP/1.1
HOST: aaa.com
```
- 요청에서 사용
- 필수
- 하나의 서버가 여러 도메인을 처리해야 할때
  - 예) IP: 200.200.200.2 서버가 aaa.com, bbb.com, ccc.com 도메인을 처리하고 있을 경우
- 하나의 IP 주소에 여러 도메인이 적용되어 있을때 

#### Location - 페이지 리다이렉션
- 웹브라우저는 3xx 응답의 결과에 Location 헤더가 있으면, Location 위치로 자동 이동(리다이렉트)
- 201(Created): Location 값은 요청에 의해 생성된 리소스 URI
- 3xx (Redirection): Location 값은 요청을 자동으로 리디렉션하기 위한 대상 리소스를 가리킴

#### Allow - 허용 가능한 HTTP 메서드
- 405(Method Not Allowed) 에서 응답에 포함해햐함
- Allow: GET, HEAD, PUT

#### Retry-After - 유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간
- 503(Service Unavailable): 서비스가 언제까지 불능인지 알려줄 수 있음

### 인증

#### Authorization - 클라이언트 인증 정보를 서버에 전달
- Authorization: Basic xxxxxxxxxx

#### WWW-Authenticate - 리소스 접근시 필요한 인증 방법 정의
- 리소스 접근시 필요한 인증 방법 정의
- 401 Unauthorized 응답과 함께 사용

### 쿠키

쿠키를 사용할 때 다음과 같은 헤더를 사용한다.

- Set-Cookie: 서버에서 클라이언트로 쿠키 전달(응답)
- Cookie: 클라이언트가 서버에서 받은 쿠키를 저장하고, HTTP 요청시 서버로 전달

#### Stateless

- HTTP는 무상태(Stateless) 프로토콜이다.
- 클라이언트와 서버가 요청과 응답을 주고 받으면 연결이 끊어진다.
- 클라이언트가 다시 요청하면 서버는 이전 요청을 기억하지 못한다.
- 클라이언트와 서버는 서로의 상태를 유지하지 않는다.
- 쿠키 미사용시
  - 홍길동이라는 아이디로 로그인한 이후 다시 welcome 페이지에 접근했을때, 서버는 요청을 보낸 고객이 어떤 고객인지 모른다.

#### 대안 1
모든 요청에 사용자 정보를 포함한다. -> 모든 요청과 링크에 사용자 정보가 포함된다. -> 보안에 문제가 된다.

#### 대안 2 - 쿠키!!

로그인 시
```
POST /login HTTP/1.1
user=홍길동
```

```
HTTP/1.1 200 OK
Set-Cookie: user=홍길동

홍길동님이 로그인했습니다.
```

- 웹 브라우저 내부에는 쿠키 저장소가 있다. -> 쿠키 저장소에 user=홍길동을 저장한다.  
- 로그인 이후에 웹 브라우저가 welcome페이지에 접속하면 자동으로 쿠키를 무조건 뒤진다. -> 쿠키에 있는 값을 꺼내 HTTP 헤더에 넣는다.

```
GET /welcome HTTP/1.1
Cookie: user=홍길동
```

> 모든 요청에 쿠키 정보를 자동 포함한다.

- 예) set-cookie: seesionId=abcde1234; expires=Sat, 26-Dec-2020 00:00:00 GTM; path=/; domaion=.google.com; Secure

- 주 사용처
  - 사용자 로그인 세션 관리
  - 광고 정보 트래킹
- 쿠키 정보는 항상 서버에 전송됨
  - 네트워크 트래픽 추가 유발
  - 최소한의 정보만 사용(세션 id, 인증 토큰)
  - 서버에 전송하지 않고, 웹 브라우저 내부에 데이터를 저장하고 싶으면 웹 스토리지(localStorage, sessionStorage)참고
- 주의!
  - 보안에 민감한 데이터는 저장하면 안됨 (ex. 주민번호, 신용카드 번호)

#### 생명주기

- Set-Cookie: expires=
  - 만료일이 되면 쿠키 삭제
- Set-Cookie: max-age=
  - 0이나 음수를 지정하면 쿠키 삭제
- 세션 쿠키: 만료 날짜를 생략하면 브라우저 종료시 까지만 유지
- 영속 쿠키: 만료 날짜를 입력하면 해당 날짜까지 유지

#### 도메인

- 쿠키가 아무 사이트에 접속할 때마다 생기면 큰일난다.
- 예)domain=example.org
- 명시: 명시한 문서 기준 도메인 + 서브 도메인 포함
  - domain=example.org를 지정해서 쿠키 생성
    - example.org는 물론이고
    - dev.example.org도 쿠키 접근
- 생략: 현재 문서 기준 도메인만 적용
  - example.org에서 쿠키를 생성하고 domain 지정을 생략
    - example.org에서만 쿠키 접근
    - dev.example.org는 쿠키 미접근

#### 경로

- 예) path=/home
- 이 경로를 포함한 하위 경로 페이지만 쿠키 접근
- 일반적으로 path=/ 루트로 지정
- 예)
  - path=/home 지정
  - /home -> 가능
  - /home/level1 -> 가능
  - /home/level1/level2 -> 가능
  - /hello -> 불가능

#### 보안

- Secure
  - 쿠키는 http, https를 구분하지 않고 전송한다.
  - Secure를 적용하면 https인 경우에만 전송한다.
- HttpOnly
  - XSS 공격 방지
  - 자바스크립트에서 접근 불가
  - HTTP 전송에만 사용가능
- SameSite
  - XSRF 공격 방지
  - 요청 도메인과 쿠키에 설정된 도메인이 같은 경우만 쿠키 전송

  ---

## HTTP 헤더2

### 캐시 기본 동작

#### 캐시가 없을 때
- 데이터가 변경되지 않아도 계속 네트워크를 통해서 데이터를 다운로드 받아야 한다.
- 인터넷 네트워크는 매우 느리고 비싸다.
- 브라우저 로딩 속도가 느리다.
- 느린 사용자 경험

#### 캐시 적용

웹 브라우저의 요청

```
GET /star.jpg
```

서버의 응답

```
HTTP/1.1 200 OK
Content-Type: image/jpeg
<!-- 캐시가 유효한 시간: 60초동안 캐시가 유효하다. -->
cache-control: max-age=60 
Content-Length: 34012

lkj123kdkfjaodjgasdjfoasdf
sasdf;qkawj9;o4ruasawekfasdf;skfjaf1234
```

최초 요청시 star.jpg를 받는다. 웹브라우저에는 캐시를 저장하는 저장소가 있는데, 응답 결과를 캐시에 저장한다. (60초 동안 유효하다.) 두 번째 요청시 캐시를 뒤지고, 유효하다면 캐시에서 이미지를 바로 가져온다.

- 캐시덕분에 캐시 가능 시간동안 네트워크를 사용하지 않아도 된다.
- 비싼 네트워크 사용량을 줄일 수 있다.
- 브라우저 로딩 속도가 매우 빠르다.
- 빠른 사용자 경험

캐시 시간이 초과 한다면?
- 캐시 유효시간이 초과하면, 서버를 통해 데이터를 다시 조회하고, 캐시를 갱신한다.
- 이 때 다시 네트워크 다운로드가 발생한다.

> 캐시가 만료되었어도 클라이언트가 가진 데이터와 서버가 가진 데이터가 똑같다면 굳이 데이터를 또 받을 필요가 있을까?


### 검증 헤더와 조건부 요청1

- 캐시 유효 시간이 초과해서 서버에 다시 요청하면 다음 두가지 상황이 나타난다.
1. 서버에서 기존 데이터를 변경함
2. 서버에서 기존 데이터를 변경하지 않음

#### 1. 캐시 만료후에도 서버에서 데이터를 변경하지 않음
- 생각해보면 데이터를 다시 전송하는 대신에 저장해 두었던 캐시를 재사용 할 수 있다.
- 단, 클라이언트의 데이터와 서버의 데이터가 같다는 사실을 확인할 수 있는 방법 필요
- 그 방법은 검증 헤더를 추가하는 것이다.

요청 1

```
HTTP/1.1 200 OK
Content-Type: image/jpeg
cache-control: max-age=60
<!-- 데이터가 마지막에 수정된 시간 -->
Last-Modified: 2020년 11월 10일 10:00:00
Content-Length: 34012

lkj123kdkfjaodjgasdjfoasdf
sasdf;qkawj9;o4ruasawekfasdf;skfjaf1234
```

위의 응답 결과를 캐시에 저장하고, 60초 초과후 이미지를 요청하면 브라우저 캐시가 만료되었기 때문에 요청2를 다시 보낸다.

요청 2
```
GET /star.jpg
<!-- 조건부 요청 -->
if-modified-since: 2020년 11월 10일 10:00:00
```

서버에서 위의 요청을 받고 데이터 최종 수정일과 if-modified-since가 같으면 아래의 HTTP 메세지를 클라이언트에 보낸다.

```
HTTP/1.1 304 Not Modified
Content-Type: image/jpeg
cache-contorl: max-age=60
Last-Modified: 2020년 11월 10일 10:00:00
Content-Length: 34012
<!-- 아래에는 HTTP Body가 없다. -->
```

위 메세지를 받은 클라이언트는 캐시를 다시 세팅하고 캐시를 다시 불러와서 사용한다. 

#### 정리
- 캐시 유효 시간이 초과해도, 서버의 데이터가 갱신 되지 않으면
- 304 Not Modified + 헤더 메타 정보만 응답(바디X)
- 클라이언트는 서버가 보낸 응답 헤더 정보로 캐시의 메타 정보를 갱신
- 클라이언트는 캐시에 저장되어 있는 데이터 재활용
- 결과적으로 네트워크 다운로드가 발생하지만 용량이 적은 헤더정보만 다운로드한다.
- 매우 실용적인 해결책이다.

### 검증 헤더와 조건부 요청2
- 검증 헤더
  - 캐시 데이터와 서버 데이터가 같은지 검증하는 데이터
  - Last-Modified, ETag
- 조건부 요청 헤더
  - 검증 헤더로 조건에 따른 분기
  - If-Modified-Since: Last-Modified 사용
  - If-None-Match: ETag 사용
  - 조건이 만족하면 200 OK
  - 조건이 만족하지 않으면 304 Not Modified

#### If Modified Since: 이후에 데이터가 수정되었으면?

- 데이터 미변경 예시
  - 캐시: 2020년 11월 10일 10:00:00 vs 서버 2020년 11월 10일 10:00:00
  - *304 Not Modified*, 헤더 데이터만 전송(Body 미포함)
  - 전송 용량 0.1M(헤더 0.1M, 바디 1.0M)
- 데이터 변경 예
  - 캐시: 2020년 11월 10일 10:00:00 vs 서버 2020년 11월 10일 `11``:00:00
  - *200 OK*, 모든 데이터전송(BODY 포함)
  - 전송용량 1.1M(헤더 0.1M, 바디 1.0M)

#### Last-Modified, If-Modified-Since 단점

- 1초미만 단위로 캐시 조정이 불가능
- 날짜 기반의 로직 사용
- 데이터를 수정해서 날짜가 다르지만, 같은 데이터를 수정해서 데이터 결과가 똑같은 경우
- 서버에서 별도의 캐시 로직을 관리하고 싶은 경우
  - 예) 스페이스나 주석처럼 크게 영향이 없는 변경에서 캐시를 유지하고 싶은 경우 -> ETag 사용

#### ETag, If-None-Match
- ETag(Entity Tag)
- 캐시용 데이터에 임의의 고유한 버전 이름을 달아둠
  - 예) ETag: "v1.0", ETag: "a2jiodwjekjl3"
- 데이터가 변경되면 이 이름을 바꾸어서 변경함(Hash를 다시 생성)
  - 예) ETag: "aaaaa" -> ETag: "bbbbb"
- 진짜 단순하게 ETag만 보내서 같으면 유지, 다르면 다시 받기!


> - 진짜 단순하게 ETag만 서버에 보내서 같으면 유지, 다르면 다시 받기!
> - *캐시 제어 로직을 서버에서 완전히 관리*
> - 클라이언트는 단순히 이 값을 서버에 제공(클라이언트는 캐시 메커니즘을 모름)
> - 예)
>   - 서버는 배타 오픈 기간인 3일동안 파일이 변경되어도 ETag를 유지
>   - 애플리케이션 배포 주기에 맞추어서 ETag 모두 갱신

### 캐시와 조건부 요청 헤더

#### Cache-Control
- Cache-Control: max-age
  - 캐시 유효 시간, 초단위
- Cache-Control: no-cache
  - 데이터는 캐시해도 되지만, 항상 원(Origin) 서버에 검증하고 사용
- Cache-Contorl: no-store
  - 데이터는 민감한 정보가 있으므로 저장하면 안됨(메모리에서 사용하고 최대한 빨리 삭제)

### 프록시 캐시

#### 원서버 직접 접근
원서버가 미국에 있다고 가정해보자. 너무 멀어서 데이터를 받는 속도가 느리다.

#### 프록시 캐시 도입
한국 어딘가에 프록시 캐시 서버를 도입해서 속도를 줄인다. (중간에서 공용으로 사용하는 캐시서버!)

#### Cache-Control
- Cache-Control: public
  - 응답이 public 캐시에 저장되어도됨
- Cache-Control: private
  - 응답이 해당 사용자만을 위한 것임, 기본값

### 캐시 무효화

### 확실한 캐시 무효화 응답
이 페이지는 캐시를 하면 안된다 싶을 때 
- Cache-Control: no-cache, no-store, must-revalidate

캐시 지시어
- Cache-Control: no-cache
  - 데이터는 캐시해도 되지만, 항상 원서버에 검증하고 사용(이름에 주의하자!)
- Cache-Control: no-store
  - 데이터에 민감한 정보가 있으므로 저장하면 안됨 (메모리에서 사용하고 최대한 빨리 삭제)
- Cache-Control: must-revalidate
  - 캐시만료후 최초 조회시 원서버에 검증해야함
  - 원서버 접근 실패시 반드시 오류가 발생해야함 - 504(Gateway Timeout)
  - must-revalidate는 캐시 유효시간이라면 캐시를 사용함