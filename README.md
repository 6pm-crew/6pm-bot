# README

[![Required typescript >= v4.7.3](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white)](https://www.typescriptlang.org/)
[![Required typescript >= v2.15.21](https://img.shields.io/static/v1?label=mysql2&message=%3E=2.15.21&logo=Typescript&color=3178C6&style=flat-square)](https://github.com/types/mysql2)
[![Required typedoc >= v0.22.17](https://img.shields.io/static/v1?label=TypeDoc&message=%3E=0.22.17&logo=Typescript&color=3178C6&style=flat-square)](https://typedoc.org/)
<br/><br/>

[![Required discord.js >= v13.8.0](https://img.shields.io/badge/Discord.js-5865F2?style=flat-square&logo=Discord&logoColor=white)](https://discord.js.org/#/)
![Required typedoc >= v0.0.1](https://img.shields.io/static/v1?label=discord-api&message=%3E=0.0.1&logo=Discord&color=5865F2&style=flat-square)

<br/>

[![Required mysql2 >= v2.3.3](https://img.shields.io/badge/mysql2-4479A1?style=flat-square&logo=MySQL&logoColor=white)](https://github.com/sidorares/node-mysql2)
<br/><br/>

[![Required typescript >= v4.7.3](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=Node.js&logoColor=white)](https://nodejs.org/ko/)
<br/>

## 개요

* [봇 설명](#디스코드-욕설-필터-봇)
* [명령어](#명령어)
  * [필터링 단어 추가 / 제거](#필터링-채널-추가-/-제거)
  * [필터링 채널 추가 / 제거](#필터링-채널-추가-/-제거)
  * [필터링된 단어 목록 보기](#단어-목록-보기)
  * [필터링된 채널 목록 보기](#채널-목록-보기)
* [저작권](#저작권)
* [2차 개발시 주의점](#2차-개발시-주의점)
* [문서](#문서)


## 디스코드 욕설 필터 봇

디스코드 욕설 필터 봇입니다.

디스코드 욕설 필터 봇은 특정 단어 혹은 특정 채널에 대해서 필터링하는 봇입니다.

사용해야하는 이유:
* `단어 필터링`은 채널 창에 올라온 단어를 확인하여 관리자가 설정한 필터링 단어목록을 확인하여 검열해주는 봇입니다.

* `채널 필터링`은 텍스트 채널에 올라온 채팅을 봇 이외에 사용하지 못하게 합니다. 관리자도 사용하지 못하기에 어드민이 실수로 채팅을 쳐서 지워야하는 일을 없게 만들 수 있습니다.



## 명령어
### 필터링 단어 추가 / 제거

```sh
# 디스코드 봇 실행 실행이 되지 않는다면 권한을 755로 설정해주세요
./start.sh
```


```sh
#필터링 단어 추가
/blacklist word [options] [words]
```

options :
- Add : 필터링할 단어를 추가합니다.
- Rmove : 필터링한단어를 제거합니다.

words:
- 필터링한 단어 입력합니다.

### 필터링 채널 추가 / 제거

```sh
#필터링 채널 추가
/blacklist room [options] [channel]
```

options:
- Add: 필터링할 채널을 추가합니다.
- Remove: 필터링할 채널을 제거합니다.

channel:
- 필터링할 채널을 `멘션`합니다.

### 단어 목록 보기

```sh
# 현재 필터링된 단어를 확인합니다.
/list word
```


### 채널 목록 보기
```sh
# 현재 필터링된 채널을 확인합니다.
/list room
```


## 저작권
`mit 라이센스`에 따라 배포됨. 해당 자세히 보고 싶다면 해당 `라이센스`에 가서 확인하세요.

*********************************************
## 2차 개발 시 주의점


봇을 제작시에 `.env` 파일이 필수로 필요합니다. 

필수 변수:
* `DISCORD_BOT_TOKEN` : 디스코드 봇을 실행할 때 사용하는 토큰 값입니다.
* `BOT_ID` : 디스코드 client ID 값입니다.
* `MYSQL USER` : 데이터베이스 유저 이름입니다.
* `MYSQL_HOST` : 데이터베이스 호스트 주소입니다.
* `MYSQL_PASSWD` : 데이터베이스 비밀번호입니다.
* `MYSQL_DB` : 데이터베이스 이름입니다.
* `MYSQL_PORT` : 데이터베이스 포트입니다.
* `GITHUB_REMOTE` : 자동 업데이트할 깃허브 리모트를 입력해주세요.
* `GITHUB_BRANCH` : 자동 업데이트할 깃허브 브랜치를 입력해주세요.
* `UNIX_PASSWD` : su 계정이 아닐경우 비밀번호를 입력해주세요.
*********************************************

## 문서

문서는 [여기](www.github.com)를 참조해주세요.