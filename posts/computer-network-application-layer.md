---
title: '[컴퓨터네크워크] - Application Layer'
description: 'KOCW의 컴퓨터네트워크(한양대학교 | 이석복) 강의를 듣고 기록한 포스팅입니다.'
createdAt: '2023-09-03'
category: 'Network'
---

> [컴퓨터네트워크-한양대학교 | 이석복](http://www.kocw.net/home/cview.do?mty=p&kemId=1169634) 강의를 수강하며 기록한 포스팅입니다.

Top-down 방식으로 Application Layer부터 공부해보자.

![어플리케이션 레이어](https://raw.githubusercontent.com/jinnkimm7/jin-blog/9d27b3134eb672d3d7c37940431899248246075b/public/images/computer-network/application-layer/1.png)

클라이언트와 서버 사이에 라우터들이 있지만, 라우터들은 신경쓸 필요가 없다. 단순히 반대편에 있는 프로세스와 프로세스 간의 통신이라는 것만 생각하면 된다. 중간에 네트워크가 어떻게 생겼는지 알 필요는 없다. 왜냐하면, application 계층은 클라이언트-서버에만 존재하고, 라우터에는 application 계층이 존재하지 않기 때문이다. (라우터에는 네트워크층까지만 존재한다.)


네트워크 애플리케이션이라는 것은 network edge에 있는 서버와 클라이언트 간의 통신을 이야기한다.

서버와 클라이언트의 특징을 알아보자면...

서버는
- 24시간 동작한다.
- 영구적인(permanent) IP주소를 갖는다.

클라이언트는
- 서버와 커뮤니케이션한다.
- 서버와 간헐적(intermittently)으로 연결된다.
- 동적인 IP주소를 갖는다.

다시 말하자면, 결국 어플리케이션 간에 의사소통 한다는 것은, 서버 어플리케이션 프로세스와 클라이언트 어플리케이션 프로세스간의 통신인데, 서버와 클라이언트 간에 반대편 socket의 주소를 알아야 의사소통을 할 수 있다.

주소의 역할을 하는 것이 IP 주소와 Port 주소이다.

IP 주소는 어떤 컴퓨터인지를 지칭하는 것이고, Port는 컴퓨터 내에서 어떤 프로세스인지를 지칭하는 것이다.

## Application 계층은 어떤 Transport service를 필요로 할까?

계층이라는 개념의 중요한 점 중 하나는 하위계층에서 상위계층으로 하위계층에 있었던 기능을 제공한다는 것이다.
즉, Application Layer는 하위계층인 Transport Layer에서 제공하는 기능을 받는다.

Application layer는 Transport Layer로부터 다음 아래, 네 가지의 기능을 필요로한다.

- data integrity : 데이터 무결성, 보낸 데이터가 유실되지 않고 목적지에 도착하는 것
- timing : 시간
- throughput : 양
- security : 보안

하지만 실제로 Transport layer에서 제공하는 것은 data integrity뿐이다. (TCP를 통해서 제공)

## HTTP 

- HyperText Transfer Protocol : 하이퍼텍스트를 주고받는 프로토콜
- 클라이언트는 서버에 HTTP를 request한다.
- 서버는 request에 response한다.
- Application layer간의 통신이 일어나기전에, Transport layer에서 TCP connection이 필요하다.
- HTTP는 stateless하다. 즉, request/response만 할 뿐 상대방(클라이언트,서버)의 상태를 기억하지 않는다.

## HTTP Connection
- 앞서 말했듯, HTTP는 TCP Connection을 기반으로 메세지를 주고받는다고 했다.
- TCP Connection을 사용하는 방식에 따라서 HTTP Connection이 달라진다.
  - Non-persistent HTTP
    - 메세지를 주고받고, TCP Connection을 끊는다.
    - 즉, TCP 연결 한번에 최대 하나의 객체를 전송할 수 있다. 

  - Persistent HTTP
    - 메세지를 주고받고, TCP Connection을 끊지 않고 계속 유지한다.
    - TCP 연결 한번에 여러개의 객체를 전송할 수 있다. 
    - 현재 HTTP는 Persistent HTTP를 기본으로 사용한다.

[참고 자료 - HTTP Persistent Connection](https://brunch.co.kr/@sangjinkang/4)

## Socket Programming

- Socket은 OS에서 제공하는 API이다.
- 개발자 혹은 사용자 입장에서 눈으로 확인 할 수 있는 것은 Application Process 혹은 Application Program이다. Application Layer 아래 층을 건드리는 것은 아니기 때문에 OS 내부를 모르고 OS에서 제공하는 서비스만 사용하는 것 뿐이다. Socket은 OS에서 제공하는 API의 일종이다.
- TCP를 사용하고 싶다면 TCP Socket, UDP를 사용하고 싶다면 UDP Socket을 이용해야한다.

![두 가지 소켓](https://raw.githubusercontent.com/jinnkimm7/jin-blog/9d27b3134eb672d3d7c37940431899248246075b/public/images/computer-network/application-layer/2.png)

## TCP socket connection setup
![TCP socket connection setup](https://raw.githubusercontent.com/jinnkimm7/jin-blog/9d27b3134eb672d3d7c37940431899248246075b/public/images/computer-network/application-layer/3.png)