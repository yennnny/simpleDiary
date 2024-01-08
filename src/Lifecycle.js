import { useEffect, useState } from "react";

const Lifecycle = () => {
  const [count, setCount] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {
    console.log("Mount!");
  }, []);

  useEffect(() => {
    console.log("Update!!");
  });

  useEffect(() => {
    console.log(count + "로 count가 업데이트 되었다!!");
    if (count > 5) {
      alert("count가 5를 넘었기에 1로 초기화합니다");
      setCount(1);
    }
  }, [count]);
  useEffect(() => {
    console.log(text + "로 text가 업데이트 되었다!!");
  }, [text]);

  return (
    <div style={{ padding: 20 }}>
      <div>
        {count}
        <button onClick={() => setCount(count + 1)}>+</button>
      </div>
      <div>
        <input value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </div>
  );
};

export default Lifecycle;
