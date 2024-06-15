# 4 - TSX 1
TSX は TypeScript を拡張した言語で、**通常の TypeScript に HTML のような構文が記述できる言語**です。React を用いた開発では、通常 TSX（や JSX = JavaScript 版）によって記述されます。従って、通常の TypeScript は妥当な TSX であり、また TypeScript は JavaScript の上位互換であることから JavaScript も妥当な TSX と結論づけることができます。

本章では、基礎となる TSX の記述を述べます。繰り返しなどの追加で必要な構文は 6 章で取り上げます。

## 4.1 コンポーネントの定義
TSX では、**各コンポーネントが関数によって定義されます**。1 章で取り上げた Thumbnail コンポーネントのプログラムをもう一度見てみましょう。

```tsx
type Props = {
    srcUrl: string;
    title: string;
    description: string;
}

export default function Thumbnail(props: Props) {
    return (
        <div className='thumbnail'>
            <img src={props.srcUrl}></img>
            <div className='inner'>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </div>
    );
}
```

プログラム冒頭の `type` 宣言や `export default` などはさておき、その後に `function Thumbnail...` といった記述が続いています。これがまさにコンポーネントの定義です。**コンポーネントの定義は関数の定義に他ならない**のです（ただし**コンポーネント名は大文字で始める必要**があります）。実際、このコンポーネントの利用は簡単で、別のコンポーネントの中で次のように記述するだけです。

```tsx
function OtherComponent() {
    return (
        <div>
            <Thumbnail
                srcUrl={
                    "https://user0514.cdnw.net/shared/img/thumb/elly20160701425018_TP_V.jpg"
                }
                title="のどかな風景"
                description="あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。" /> 
        </div>
    )
}
```

### 4.1.1 フラグメント
**コンポーネントは複数の HTML 要素、またはコンポーネントを並列で返すことができません**。従って、以下のような記述は不適当です。

```tsx
return (
    <div><p>aaa</p></div>
    <p>abc</p>
);
```

このような場合、**フラグメント**と呼ばれる機能を使用します。例えば上記のプログラムをフラグメントによって直す場合、次のようなプログラムになります。

```tsx
return (
    <React.Fragment>
        <div><p>aaa</p></div>
        <p>abc</p>
    </React.Fragment>
);
```

またフラグメントには省略記法があり、`<> ~ </>` が使用できます。

```tsx
return (
    <>
        <div><p>aaa</p></div>
        <p>abc</p>
    </>
);
```

### 4.1.2 予約語
HTML では、標準でインラインでスタイルを与えるための属性として `class`が、そして `label` 要素を配置するときのターゲット要素 id を指定するための `for` 属性がそれぞれあります。しかしながら、これらの**属性名は JavaScript（TypeScript）の予約語として既に使用されている**ため使用することができません。そのため、これらの属性名は `className`、`htmlFor` によって代替します。

## 4.2 コンポーネント間の値の受け渡し - props
下のプログラムは先のサムネイルの例です。

```tsx
type Props = {
    srcUrl: string;
    title: string;
    description: string;
}

export default function Thumbnail(props: Props) {
    return (
        <div className='thumbnail'>
            <img src={props.srcUrl}></img>
            <div className='inner'>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </div>
    );
}
```

型 `Props` が冒頭で宣言され、Thumbnail コンポーネント（関数）はその型と同一な値を引数として受け取ります。また、Thumbnail コンポーネントを利用する方のプログラムは次のように記述されています。

```tsx
<Thumbnail
    srcUrl={
        "https://user0514.cdnw.net/shared/img/thumb/elly20160701425018_TP_V.jpg"
    }
    title="のどかな風景"
    description="あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。" /> 
```

これら 2 つのプログラムを観察してみると、**コンポーネントの引数として指定された型に含まれる各プロパティの名前が、そのまま属性名として使用できる**ことがわかります。また、**コンポーネントに値を渡すときには属性を用いて渡すことができる**ことも分かります。

このように、**コンポーネントが受け取る引数を props** と呼びます。props は**親コンポーネントから子コンポーネントへ一方向へ流れるデータで、props が変更されるとそれを受け取る子コンポーネントの表示が切り替わり**ます。

## 4.3 式の表示
式の表示の説明に入る前に、式とは何かについてを理解しておく必要があります。式と言われて皆さんが想像するものは、おそらく `1 + 1` のようなものでしょう。確かにこれも式の一つで、正解です。

ただ、例えば `1 + (2 + 3)` や `1 + (2 + (3 + 4))`、`1 + value`（`value` は変数）はどうでしょうか。JavaScript のフェーズで学んだように、これらも妥当な式です。式がネストしても、式の中に変数が来ても、それらは全て計算可能な式です。

では `1` や `value` ではどうでしょうか。式と言えるでしょうか。

答えは yes です。**式は値が `+` などの演算子で結合されている必要はなく**、1 つの項（単項）からなるものも立派な式です（専門的には `+` などの演算子で結合された式を**二項式**と呼びます）。この事実を認めなければ、`-1` などといった単項演算子の存在を説明することができません。また、`value` が式であることが分かったので、変数と置き換えることができる関数呼び出し（`testFunc()` など）や `null`、`true` といったリテラルも式であると結論づけることができます。

このような事実から、以下では変数や `1 + 1` などの記述をまとめて式と呼んでいます。

さて、コンポーネントの内部では式を `{}` で囲って要素の値の部分に配置することで、ある値を表示することができます。先のサムネイルの例を見てみましょう。

```tsx
type Props = {
    srcUrl: string;
    title: string;
    description: string;
}

export default function Thumbnail(props: Props) {
    return (
        <div className='thumbnail'>
            <img src={props.srcUrl}></img>
            <div className='inner'>
                <h2>{props.title}</h2>
                <p>{props.description}</p>
            </div>
        </div>
    );
}
```

上記の例では `<h2>{props.title}</h2>` などの記述によって受け取った値を HTML の値として出力しています。型は `string` ですが、`number` や `boolean` といった値なども表示することができます。また、属性に式を指定するには、`src={props.srcUrl}` の記述のように属性値を `{式}` のように設定します。一方で、通常の文字列を指定する際には `'` や `"` を使用します。

さらに属性の場合、属性値として指定できる型に関数があります。例えば `onClick` などのイベントハンドラがこれに該当し、React ではよく使う構文です。この部分を確認してみましょう。

## 4.4 演習
1. sample-app の `src` ディレクトリの下に `components` ディレクトリを作成して下さい。今後の演習で作成するコンポーネントはその下に作成していきます。
2. `src/components/Tweet.tsx` を作成し、Thumbnail のプログラムを参考にして string 型の `name` と string 型の `text` を受け取るコンポーネントを作成して下さい。コンポーネントの本体は `name` が `h3`、`text` が `p`、そしてそれらを `div` で囲ったものとして下さい。
3. `App.tsx` で作成した `Tweet` コンポーネントを呼び出し、表示を確認して下さい。
