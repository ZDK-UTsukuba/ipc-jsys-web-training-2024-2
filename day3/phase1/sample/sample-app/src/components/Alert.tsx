import { useEffect } from "react";

export default function Alert() {
  // マウント時に実行されるコールバック関数
  const callback = () => {
    alert("マウントされました！");
  };

  // マウント時に callback を実行する
  useEffect(callback, []);

  return <p>ダミーテキスト</p>;
}
