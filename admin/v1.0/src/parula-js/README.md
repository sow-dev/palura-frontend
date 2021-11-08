# parula-dapp
parula  컨트랙트와 상호작용하는 dapp 라이브러리

## 설치
```sh
$ npm i
```

## Test
### 통합 Test network 준비 (smartcontract - library)
```sh
$ cd parula-backend/smartcontract/v1.0/
```

#### Test network 실행
```sh
$ truffle develop
```

#### 컨트랙트 배포
```sh
$ truffle migrate --network develop
```

#### TransferProxy, ERC20TransferProxy 를 operator로 등록
```sh
$ node add_operator.js
```

### Test 실행
```sh
$ cd parula-dapp  # 이 프로젝트 루트 디렉토리
$ npm run test
```