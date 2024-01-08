import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import "./App.css";

const dummyList = [
  {
    id: 1,
    author: "데니",
    content: "보통날",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 2,
    author: "호영",
    content: "보통날",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 3,
    author: "쭈니",
    content: "보통날",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 4,
    author: "태우",
    content: "보통날",
    emotion: 5,
    created_date: new Date().getTime(),
  },
  {
    id: 5,
    author: "계상",
    content: "보통날",
    emotion: 5,
    created_date: new Date().getTime(),
  },
];

function App() {
  return (
    <div className="App">
      <DiaryEditor />
      <DiaryList diaryList={dummyList} />
    </div>
  );
}

export default App;
