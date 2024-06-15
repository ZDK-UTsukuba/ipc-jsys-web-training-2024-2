import { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState<number>(0);

  // ボタンクリック時のイベントハンドラ
  const onClickButton = () => {
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <div>
      <button onClick={onClickButton}>{count}</button>
    </div>
  );
}
