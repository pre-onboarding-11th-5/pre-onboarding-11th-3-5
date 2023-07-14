# 원티드 프리온보딩 인턴십 3주차 과제

[Github REST API](https://docs.github.com/en/rest?apiVersion=2022-11-28)를 사용하여 특정 깃헙 레파지토리의 이슈 목록과 상세 내용을 확인하는 웹사이트 구축하기
<br><br>

## # 회의

<진행시간>

- 1회차 - 화요일 오후 9시
- 2회차 - 목요일 오후 5시
- 3회차 - 목요일 오후 9시
- 4회차 - 금요일 오후 6시

<br><br>

## # 배포링크

https://pre-onboarding-11th-3-5-fork.vercel.app/

<br><br>

## # Best Practice 사전 설정

### 1. 폴더 구조

```
src
├─apis
├─components
│  ├─common
│  │  ├─Error
│  │  ├─Header
│  │  ├─IssueItem
│  │  └─Loading
│  ├─IssueDetail
│  └─IssueList
├─constants
├─contexts
├─hooks
├─pages
├─styles
└─types
```

### 2. redux 사용 X

### 3. 스타일링: `styled-components`

### 4. 커밋 컨벤션

| Tag Name | Description                                           |
| -------- | ----------------------------------------------------- |
| Feat     | 새로운 기능 추가                                      |
| Fix      | 버그수정                                              |
| Style    | 코드 포맷 변경, 세미 콜론 누락, 코드 수정이 없는 경우 |
| Design   | CSS 등 사용자 UI 변경                                 |
| Refactor | 코드 리팩토링                                         |
| Docs     | 문서 수정                                             |
| Chore    | 빌드 업무, 패키지 매니저, 패키지 관지라 구성 등 수정  |
| Test     | 테스트 코드, 리팩토링 테스트 코드 추가                |
| Rename   | 파일 혹은 몰더명 수정하거나 옮기는 작업만 한 경우     |
| Remove   | 파일을 삭제하는 작업만 한 경우                        |

<br><br>

## # Best Practice 도출 과정

1. 과제 요구 사항을 보며 코드 베이스 및 컨벤션 회의 진행 (화면 공유를 통한 라이브 코딩)
2. 회의로 정해진 폴더 구조, Eslint, Prettier 기틀을 마련한 Repository 생성
   (`main`을 제외한 각자 Branch 생성)
3. 모든 구성원이 위에서 선정된 코드 베이스, 컨벤션에 맞춰서 각자 개발 후 Pull Request
4. Best Practice 개선 사항 및 리팩토링 회의 ⇒ 실시간으로 PR 작성자의 로직을 함께 토론하여 요구 사항 별 Best Practice 선정 후 PR 생성 ⇒ PR 코드를 보고 최종 검토 후 `main`에 병합
5. 배포 및 README, 문서 정리

<br><br>

## # Best Practice 적용

### 1. IssueList, an issue context (관심사 분리)

### 2. Issue context 내부에서 useParam id관리

### 3. useInfiniteIssue

<img src="https://github.com/pre-onboarding-11th-5/pre-onboarding-11th-3-5/assets/68717963/01618143-d49c-4da0-923b-a44b9f6afdaf" width="480px" />

### 4. Issue 컴포넌트 react.memo 최적화

> #### 적용 전
> <img src="https://github.com/pre-onboarding-11th-5/pre-onboarding-11th-3-5/assets/68717963/ce2cf140-1b2d-45f5-89f0-e37dcdd4fae4" width="450px" />

> #### 적용 후
> <img src="https://github.com/pre-onboarding-11th-5/pre-onboarding-11th-3-5/assets/68717963/61c1128e-3ccb-4b97-9e83-398d28254b05" width="450px" />

### 5. link state로 api 호출 최적화

```
function IssueList() {
  const { data, error, loading, hasNextPage } = useIssueList();
  const fetchNextPage = useIssueListDispatch();
  const observeTargetRef = useInfiniteIssue<HTMLDivElement>();

  return (
    <IssueListBox>
      {data.flatMap((issue, index) => {
        const nodes = [
          <li key={issue.number}>
            <Link to={`/${issue.number}`} state={issue}>
              <IssueItem
                comments={issue.comments}
                number={issue.number}
                title={issue.title}
                created_at={issue.created_at}
                login={issue.user.login}
              />
            </Link>
          </li>,
        ];
        const isAdvertisement = (index + 1) % 4 === 0;
        isAdvertisement &&
          nodes.push(
            <li key={`ad#${index}`}>
              <Advertisement />
            </li>,
          );
        return nodes;
      })}
      <div ref={hasNextPage && !error ? observeTargetRef : null}></div>
      <Error error={error} refetch={fetchNextPage} />
      <Loading loading={loading} />
    </IssueListBox>
  );
}
```

```
const IssueDetailProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const { state: issue } = useLocation();
  const [data, setData] = useState<IssueDetailState>({
    data: issue,
    loading: issue ? false : true,
    error: null,
  });
  const { id } = useParams();

  const fetchIssueDetail = useCallback(async () => {
    if (!id || isNaN(parseInt(id))) {
      setData((prev) => ({ ...prev, error: { message: "Invalid id" } }));
      return;
    }
    try {
      setData((prev) => ({ ...prev, loading: true, error: null }));
      const { data } = await getIssue(parseInt(id));
      setData((prev) => ({ ...prev, data }));
    } catch (e) {
      if (isAxiosError<ErrorResponse>(e) && e.response) {
        const {
          data: { message },
        } = e.response;
        setData((prev) => ({
          ...prev,
          error: { message },
        }));
      } else if (isAxiosError(e)) {
        const { message } = e;
        setData((prev) => ({
          ...prev,
          error: { message },
        }));
      }
    } finally {
      setData((prev) => ({ ...prev, loading: false }));
    }
  }, [id]);

  useEffect(() => {
    if (!data.data) fetchIssueDetail();
  }, [fetchIssueDetail, data.data]);

  return (
    <IssueDetailStateContext.Provider value={data}>
      <IssueDetailDispatchContext.Provider value={fetchIssueDetail}>
        {children}
      </IssueDetailDispatchContext.Provider>
    </IssueDetailStateContext.Provider>
  );
};
```

### 6. avatar 이미 layout shift

> #### 적용 전
> <img src="https://github.com/pre-onboarding-11th-5/pre-onboarding-11th-3-5/assets/68717963/6eae8d28-86f4-410a-8ba7-59625608b53c" width="450px" />

> #### 적용 후
> <img src="https://github.com/pre-onboarding-11th-5/pre-onboarding-11th-3-5/assets/68717963/804356fa-b0ea-4df9-8eda-be07ba9dabff" width="450px" />

<br><br>

## # 구현 영상

![영상](https://github.com/pre-onboarding-11th-5/pre-onboarding-11th-3-5/assets/68717963/5b464671-9659-4377-be7d-cc4c0eafca2b)

<br><br>

## # 동료 학습 과정 중 느낀 점

### 1. 요구 사항 구현 중 직면한 어려운 점

- api 호출 시, 무한 로딩, 외부 api 사용 시 호출 제한의 문제
- context api, dispatch, infinity Scroll
