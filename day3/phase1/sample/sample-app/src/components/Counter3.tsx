import { useEffect, useState } from "react";

export default function Counter3() {
  const [count, setCount] = useState<number>(0);

  const cleanup = () => {
    console.log("クリーンアップされました！");
  };

  // count が変更された際に実行されるコールバック関数
  const callback = () => {
    document.title = `クリック数：${count}回`;

    return cleanup;
  };

  // count に変更があった場合に callback を実行する
  useEffect(callback, [count]);

  // ボタンクリック時のイベントハンドラ
  const incrementCount = () => {
    setCount((previousCount) => previousCount + 1);
  };

  return (
    <div>
      <button onClick={incrementCount}>{count}</button>
    </div>
  );
}
