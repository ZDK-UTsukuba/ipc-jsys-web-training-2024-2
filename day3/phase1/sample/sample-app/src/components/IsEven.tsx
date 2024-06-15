type Props = {
  n: number;
};

export default function IsEven(props: Props) {
  return (
    <div>
      {props.n % 2 === 0 && <p>偶数</p>}
      {props.n % 2 === 0 || <p>奇数</p>}
    </div>
  );
}
