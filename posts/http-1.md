---
title: 'HTTP (1) | Network'
description: 'HTTP에 대해 알아보기 전 인터넷 네트워크, IP, TCP에 관한 포스팅입니다.'
tags:
  - HTTP
  - Network
createdAt: '2023-10-24'
---

> 이 글은 [모든 개발자를 위한 HTTP 웹 기본 지식](https://www.inflearn.com/course/http-%EC%9B%B9-%EB%84%A4%ED%8A%B8%EC%9B%8C%ED%81%AC/dashboard) 강의를 듣고 정리한 내용입니다.

모든 것이 HTTP 프로토콜 위에서 데이터를 주고 받기 때문에 HTTP를 학습해야한다.

이번 강의의 목표는
- HTTP 전체 흐름 이해
- 실무에 꼭 필요한 핵심 내용
을 익히자!!

----

웹이나 HTTP도 전부 인터넷 네트워크 망에 기반하여 동작하기 때문에 우선 인터넷 네트워크에 대해 알아보자.

## 인터넷 네트워크

- 인터넷을 통해서 클라이언트와 서버는 원거리에 있어도 통신을 할 수 있음.
- 하지만 인터넷망은 복잡하다.
  - 해저 광케이블, 인공위성 등등..
  - 수 많은 중간 노드라고 하는 서버를 거쳐서 안전하게 메세지를 전달해야한다.
- 어떻게 복잡한 망을 이용해 클라이언트와 서버가 통신을 할 수 있을까?

## IP (Internet Protocol)

복잡한 인터넷망에는 `최소한의 규칙`이 필요하고 그것이 바로 IP이다.  

### IP의 역할

- 패킷(Packet)이라는 통신 단위로 데이터를 지정한 IP 주소(IP Address)에 데이터 전달한다.
- 클라이언트 패킷 전달 과정
  - 클라이언트가 보내는 패킷에는 출발지IP, 목적지IP, 기타..가 담겨져 있다.
  - 위의 정보가 담겨있는 패킷을 인터넷망으로 더진다.
  - 규약에 따라 노드 간에 패킷을 던지면서 최종적으로는 목적지(서버)에 도달한다.
- 서버 패킷 전달 과정
  - 서버 패킷도 클라이언트 패킷이 거쳤던 과정을 통해서 클라이언트에게 메세지를 전달한다.

### IP의 한계

- 비연결성
  - 패킷을 받을 대상이 없거나 서비스 불능 상태여도 패킷을 전송한다.
    - 클라이언트는 대상 서버가 패킷을 받을 수 있는 상태인지 아닌지 모른다. 
- 비신뢰성
  - 패킷 소실
    - 중간 서버노드가 꺼져서 패킷이 사라진다면..?
  - 패킷 전달 순서 문제 발생
    - 패킷의 용량이 클 때, 패킷을 끊어서 보낸다. 이 과정에서 패킷이 순서대로 안온다면..?
- 프로그램 구분
  - 같은 IP를 사용하는 서버에서 통신하는 애플리케이션이 둘이상이라면..?

---

## TCP,UDP
IP의 한계를 TCP가 해결해준다!

### 인터넷 프로토콜 스택의 4계층
- 애플리케이션 계층 - HTTP, FTP
- 전송 계층 (OS) - TCP, UDP 
- 인터넷 계층 (OS) - IP 
- 네트워크 인터페이스 계층 - LAN 드라이버, LAN 장비

채팅 프로그램으로 Hello, world! 라는 메세지를 전송한다고 가정해보자.

1. 프로그램이 Hello, world! 메세지 작성
2. SOCKET 라이브러리를 통해 OS 계층에 전달
3. TCP 정보를 생성해서 씌운다. 메세지 데이터 포함
4. IP 패킷을 생성해서 씌운다. TCP 데이터 포함
5. 이후 랜카드를 통해서 정보가 나간다.

### TCP/IP 패킷 정보
- IP 패킷에는 다음과 같은 정보가 담겨져 있다.
  - 출발지IP, 목적지IP, 기타...
- IP 패킷에 TCP 세그먼트를 더해 TCP/IP 패킷을 만들며, 다음과 같은 정보가 담긴다.
  - 출발지 PORT, 목적지 PORT, 전송 제어, 순서, 검증정보...
  - TCP 세그먼트를 더해줌으로써 IP 패킷만으로 해결이 안되었던 문제(예를들면, 순서문제)들이 해결된다!

### TCP 특징

TCP는 전송 제어 프로토콜 (Transmission Control Protocol)의 약자로, IP 바로 윗계층에 있는 프로토콜이다. 
TCP는 다음과 같은 특징을 갖는다.

- 연결 지향
  - TCP 3 way handshake
  - SYN : 접속 요청
  - ACK : 요청 수락
    - 1. SYN
    - 2. SYN+ACK
    - 3. ACK
  - 만약에 서버가 꺼져있고, 클라이언트가 접속을 하려고 한다면, 클라이언트가 SYN 메세지를 보냈을 때 응답이 오지않는다.
  - 응답이 없으면 클라이언트가 메세지를 보내지 않는다.
- 데이터 전달 보증
  - 클라이언트가 데이터 전송시, 서버에서 데이터를 잘받았다고 메세지를 보낸다.
- 순서 보장
  - 클라이언트에서 패킷1, 패킷2, 패킷3 순서로 전송는데 서버에 패킷1, 패킷3, 패킷2 순서로 도착했을 경우,
  - 서버에서 패킷2부터 다시 보내라고 요청한다.
- TCP는 신뢰할 수 있는 프로토콜
- 현재는 대부분 TCP 사용

### UDP

사용자 데이터그램 프로토콜 (User Datagram Protocol)

- 하얀 도화지에 비유(기능이 거의 없음)
- 연결 지향 - TCP 3 way handshake X
- 데이터 전달 보증 X
- 순서 보장 X
- 하지만, 데이터 전달 및 순서가 보장되지 않지만, 단순하고 빠르다.
- 정리
  - IP와 거의 같다. + PORT + 체크섬 정도만 추가
  - 애플리케이션에서 추가 작업 필요

---

## PORT

- 내(클라이언트)가 게임, 화상통화, 웹브라우저 요청을 동시에 하고 있다면?
- 클라이언트 PC가 여러개의 서버와 통신해야한다.
- 보내는 패킷이나 받는 패킷이나 어느 서버에서 오는지 가는지 구분해야한다.
  - TCP/IP 패킷에 출발지 `PORT`, 목적지 `PORT`로 구분한다.

> 즉, PORT는 같은 IP 내에서 프로세스를 구분해준다고 말할 수 있다.

IP는 아파트이고, PORT는 동, 호수라고 비유
- 0 ~ 65535 할당 가능
- 0 ~ 1023 : 잘 알려진 포트, 사용하지 않는 것이 좋다.
  - FTP - 20,21
  - TELNET - 23
  - HTTP - 80
  - HTTPS - 443

---

## DNS (Domain Name System)

IP는 기억하기 어렵다.
IP는 변경될 수 있다.
-> DNS 사용
- 도메인 명을 IP 주소로 변환한다.

---

## URI와 웹 브라우저 요청 흐름

### URI (Uniform Resource Identifier)

"URI는 로케이터(Locator), 이름(Name) 또는 둘 다 추가로 분류될 수 있다."  
URI -> Resource를 식별(Identify)한다?  

Uniform : 리소스를 식별하는 통일된 방식  
Resource : 자원, URI로 식별할 수 있는 모든 것(제한없음)
Identifier : 다른 항목과 구분하는데 필요한 정보

즉, 통일된 자원 식별자라고 할 수 있다.

- URL(Resource Locator)
  - foo://example.com:8042/over/there?name=ferre  
- URN(Resource Name)
  - urn:example:animal:ferret:nose

### URL
Locator : 리소스가 있는 위치를 지정

### URN
Name : 리스스에 이름을 부여  
URN 이름만으로 실제 리소스를 찾을 수 있는 방법이 보편화 되지 않았다. URI와 URL을 같은 의미로 봐도 무방하다.

### URL 전체 문법

- scheme://[userinfo@]host[:port][/path][?query][#fragment]

```
https://www.google.com:443/search?q=hello&hl=ko
```

- 프로토콜(https)
- 호스트명(www.google.com)
- 포트번호(443)
- 패스(/search)
- 쿼리 파라미터(q=hello&hl=ko)

#### scheme
- 주로 프로토콜 사용
- 프로토콜 : 어떤 방식으로 자원에 접근할 것인가 하는 약속 규칙
  - 예) http, https, ftp 등등
- http는 80 포트, https는 443 포트를 주로 사용, 포트는 생략 가능
- https는 http에 보안 추가 (HTTP Secure)

#### userinfo
- URL에 사용자정보를 포함해서 인증
- 거의 사용하지 않음

#### host
- 호스트명
- 도메인명 또는 IP 주소를 직접 사용가능

#### path
- 리소스가 존재하는 경로(path), 주로 계층적 구조로 되어 있다.
- 예)
  - /home/file1.jpg
  - /members
  - /members/100, /items/iphone12

#### query
- key=value 형태
- ?로 시작, &로 추가 가능 ( ?keyA=valueA&keyB=valueB )
- query parameter, query string 등으로 불림, 웹서버에 제공하는 파라미터, 문자 형태

#### fragment
- html 내부 북마크 등에 사용
- 서버에 전송하는 정보 아님

---

## 웹 브라우저 요청 흐름

브라우저에 아래의 주소를 입력했을 경우,

```
https://www.google.com:443/searh?q=hello&hl=ko
```

1. DNS를 조회해 IP정보를 찾아내고, PORT정보를 찾아낸다.
  - www.google.com -> IP : 200.200.200.2
  - HTTPS PORT 생략, 443

2. 웹 브라우저가 HTTP 요청 메세지를 생성한다.

  ```
  GET /search?q=hello&hl=ko HTTP/1.1
  HOST:www.google.com
  ```

3. HTTP 메세지가 SOCKET 라이브러리를 통해 아래 계층에 전달한다.

4. TCP/IP 패킷을 생성해 HTTP 메세지에 씌운다.

5. 패킷 정보가 인터넷을 통해 흘러간다.

6. 메세지가 수 많은 인터넷 노드를 통해 200.200.200.2(구글 서버)로 전달이 된다.

7. 구글 서버에서 응답 메세지를 만든다.

```
HTTP/1.1 200 OK
Content-Type: text/html;charset=UTF-8
Content-Length: 3423

<html>
  <body>...</body>
</html>
```

8. 응답패킷을 만들고, 응답패킷이 씌워진 메세지가 클라이언트에게 도착한다.

9. 메세지를 읽고, 웹 브라우저가 html을 렌더링한다.

