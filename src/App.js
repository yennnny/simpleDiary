import "./App.css";
import { useRef, useState } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import Lifecycle from "./Lifecycle";
import Lifecycle2 from "./Lifecycle2";

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

  // 일기 데이터 추가하기
  const onCreate = (author, content, emotion) => {
    const created_date = new Date().getTime();
    const newItem = {
      author,
      content,
      emotion,
      created_date,
      id: dataId.current,
    };
    dataId.current += 1;
    setData([newItem, ...data]);
  };

  // 일기 데이터 삭제하기
  const onRemove = (tgId) => {
    console.log(tgId + "가 삭제되었습니다");
    const newDiaryList = data.filter((it) => it.id !== tgId);
    setData(newDiaryList);
  };

  // 일기 데이터 수정하기
  const onEdit = (tgId, newCnt) => {
    setData(
      data.map((it) => (it.id === tgId ? { ...it, content: newCnt } : it))
    );
  };

  return (
    <div className="App">
      {/* <Lifecycle /> */}
      {/* <Lifecycle2 /> */}
      <DiaryEditor onCreate={onCreate} />
      <DiaryList diaryList={data} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export default App;
