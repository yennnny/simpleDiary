import "./App.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
// import Lifecycle from "./Lifecycle";
// import Lifecycle2 from "./Lifecycle2";
// import OptimizeTest from "./OptimizeTest";
// import OptimizeTest2 from "./OptimizeTest2";

// const dummyList = [
//   {
//     id: 1,
//     author: "데니",
//     content: "보통날",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 2,
//     author: "호영",
//     content: "보통날",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 3,
//     author: "쭈니",
//     content: "보통날",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 4,
//     author: "태우",
//     content: "보통날",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
//   {
//     id: 5,
//     author: "계상",
//     content: "보통날",
//     emotion: 5,
//     created_date: new Date().getTime(),
//   },
// ];

function App() {
  const [data, setData] = useState([]);

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

    setData(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  // 일기 데이터 추가하기
  const onCreate = useCallback((author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData((data) => [newItem, ...data]);
  }, []);

  // 일기 데이터 삭제하기
  const onRemove = useCallback((tgId) => {
    setData((data) => data.filter((it) => it.id !== tgId));
  }, []);

  // 일기 데이터 수정하기
  const onEdit = useCallback((tgId, newCnt) => {
    setData((data) =>
      data.map((it) => (it.id === tgId ? { ...it, content: newCnt } : it))
    );
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
