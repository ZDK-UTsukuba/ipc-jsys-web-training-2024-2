import { useState } from "react";
import styled from "styled-components";

// LabelPropsの型を定義
type LabelProps = {
  isError: boolean;
};

// LabelPropsを引数に持つLabelコンポーネントを定義 
// LabelPropsのisErrorがtrueの場合は文字色を赤にする
const Label = styled.label<LabelProps>`
  color: ${(props) => (props.isError ? "red" : "black")};
`;

export default function InputNumber() {
  const [value, setValue] = useState<number>(0);

  // inputの値が変更された時に呼び出される関数
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value);
    setValue(newValue);
  };

  return (
    <div>
      <Label isError={value <= 100}>
        {value <= 100
          ? "100以上の数字を入力してください"
          : "数字を入力してください"}
      </Label>
      <input type="number" value={value} onChange={onChange}></input>
    </div>
  );
}
