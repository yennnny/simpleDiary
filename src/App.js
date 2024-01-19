import "./App.css";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import Lifecycle from "./Lifecycle";
// import Lifecycle2 from "./Lifecycle2";
// import OptimizeTest from "./OptimizeTest";
// import OptimizeTest2 from "./OptimizeTest2";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "REMOVE": {
      return state.filter((it) => it.id !== action.tgId);

      // setData((data) => data.filter((it) => it.id !== tgId));
    }
    case "EDIT": {
      return state.map((it) =>
        it.id === action.tgid ? { ...it, content: action.newCnt } : it
      );
    }
    default:
      return state;
  }
};

export const DiaryStateContext = React.createContext();

export const DiaryDispatchContext = React.createContext();

function App() {
  // const [data, setData] = useState([]);

  const [data, dispatch] = useReducer(reducer, []);

  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        author: it.email,
        content: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
    // setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  // 일기 데이터 추가하기
  const onCreate = useCallback((author, content, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, content, emotion, id: dataId.current },
    });

    // const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   content,
    //   emotion,
    //   created_date,
    //   id: dataId.current,
    // };
    dataId.current += 1;
    // setData((data) => [newItem, ...data]);
  }, []);

  // 일기 데이터 삭제하기
  const onRemove = useCallback((tgId) => {
    dispatch({ type: "REMOVE", tgId });
    // setData((data) => data.filter((it) => it.id !== tgId));
  }, []);

  // 일기 데이터 수정하기
  const onEdit = useCallback((tgId, newCnt) => {
    dispatch({
      type: "EDIT",
      tgId,
      newCnt,
    });
    // setData((data) =>
    //   data.map((it) => (it.id === tgId ? { ...it, content: newCnt } : it))
    // );
  }, []);

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onRemove, onEdit };
  }, []); // App 컴포넌트가 재생성이 될 때 memoizedDispatches도 재생성므로 useMemo로 재생성 되지 않도록 묶어준다.

  // useMemo 사용한 데이터 분석
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // getDiaryAnalysis() 하지 않는다. useMemo는 값으로 return 받기 때문이다.

  return (
    // Provider도 하나의 컴포넌트 이기때문에 value값이 바뀌게되면 계속해서 재생성된다. 따라서 value에 data와 onCreate, onEdit, onRemove를 같이 사용할 수 없게 된다. - data가 바뀌면 onCreate, onEdit, onRemove가 재생성되기 때문. 그래서 새로운 Provider를 새로 생성.
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          {/* <Lifecycle /> */}
          {/* <Lifecycle2 /> */}
          {/* <OptimizeTest /> */}
          {/* <OptimizeTest2 /> */}
          <DiaryEditor onCreate={onCreate} />
          <div>
            <p>전체 일기: {data.length}</p>
            <p>기분 좋은 일기 개수: {goodCount}</p>
            <p>기분 나쁜 일기 개수: {badCount}</p>
            <p>기분 좋은 일기 비율: {goodRatio}</p>
          </div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
