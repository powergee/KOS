# KOS

**Kanban + UOS**

<!-- General description -->

<!-- [WIKI](url) -->

## 룰

1. `master`를 `fork`하여 사용
2. `master`랑 `merge`하려면 `pull request` (이하 PR) 넣기
3. 본인을 제외한 나머지 멤버가 변경내용 검토후 `merge` 
   1. Squash&merge, Rebase가 아닌 일반 merge 사용할것



## 디렉토리

```
frontend
  ㄴ 프론트엔드 관련 프로젝트. React로 진행 중
backend
  ㄴ 백엔드 관련 프로젝트. GOlang + MySQL로 진행 중
```


<!--                      Need update
## DEV환경 구축

본 프로젝트는 `yarn`을 사용하는것을 전재로 진행하고 있습니다.

먼저 구글 드라이브의 보안 폴더에서 Vault 환경 변수들을 찾아 등록해 주신 다음

각 프로젝트 폴더에 들어가서 `yarn`입력으로 필요 모듈을 설치한 후 아래 명령어를 사용하시면 됩니다.

### page

`yarn start`: `React` 개발서버 시작

`yarn build`: 정적파일 만들기

`yarn test`: 유닛테스트 실행

### server

`yarn start`: `prod`서버 시작.

`yarn dev`: `dev`서버 시작. (파일변경 감지시 자동 재시작)

`yarn test`: 유닛테스트 실행
-->