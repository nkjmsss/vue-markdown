export const sample = `# Vue-markdown

## 対応記法について

### インライン要素

#### 太字

\`**bold**\`というようにすると、**このように**なります。

#### 斜体

\`*italic*\`というようにすると、*このように*なります。

#### 下線

\`++underline++\`というようにすると、++このように++なります。

#### マーカー

\`==mark==\`というようにすると、==このように==なります。

#### リンク

\`[link](url)\`というようにすると、[link](https://example.com)になります。

### ブロック要素

これらの要素については、基本的に前後に空行を設けるようにしてください。

#### 見出し

\`## heading\`というようにすると見出しを書くことができます。見出しのレベルは\`#\`の数で変え、少ないほどレベルが高いです。

#### 段落

前後に空行のあるテキストは段落として扱われます。マークダウンの仕様として、改行しても認識されないので必ず空行を開けて段落を変えるようにしてください。

このような感じにするように、ということです。

#### 画像

本来はinline-blockですが、blockとしてrenderします。

\`![name](href)\`というようにすると、画像が読み込めます。

![cat](http://d30uxjjrk95rd.cloudfront.net/img/pages/pet_cat/cat_img_81.jpg)

#### 引用

\`> quotes\`のように書くと引用できます。

> これは引用のサンプルです。
>
> 空行を開けて段落を変える際は、上のように\`>\`とだけ書くようにします。

#### 箇条書き

\`- list\`のように書くと、箇条書き（番号なし）ができます。

- first
- second
- third

また、\`1. list\`のように書くと箇条書き（番号あり）ができます。

1. first
1. second
1. third

ここで、行頭の数字は全て1ではなく2、3とカウントアップして大丈夫ですが、基本的に1から始めるようにしてください。1以外の数字から始めると、連番の開始番号が変わります。

3. first
3. second
3. third

#### 表

\`\`\`
|column1|column2|column3|
|-|-|-|
|content1|content2|content3|
|content1|content2|content3|
\`\`\`

のようにコードを書きます。ハイフンの上側が見出し行として扱われます。

|column1|column2|column3|
|-|-|-|
|content1|content2|content3|
|content1|content2|content3|

`
