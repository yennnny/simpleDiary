import "./App.css";
import { useCallback, useEffect, useMemo, useReducer, useRef } from "react";
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

  // useMemo 사용한 데이터 분석
  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis; // getDiaryAnalysis() 하지 않는다. useMemo는 값으로 return 받기 때문이다.

  return (
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
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
