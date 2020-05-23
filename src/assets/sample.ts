export const sample = `## 対応記法について

### インライン要素

#### 太字

\`**bold**\`というようにすると、**このように**なります。

#### 斜体

\`*italic*\`というようにすると、*このように*なります。

#### 下線

\`++underline++\`というようにすると、++このように++なります。

#### マーカー

\`==mark==\`というようにすると、==このように==なります。

#### 色付け

\`{colorName}(content)\`というようにすると、{primary}(このように)なります。また、違う色を使いたければ{secondary}(このように)できます。

今回、色数がそんなに増えすぎて欲しくないという事情から使える色は以下のもののみとなっています。

- {primary}(アクセントカラー1)
- {secondary}(アクセントカラー2)

#### リンク

\`[link](url)\`というようにすると、[link](https://example.com)になります。

### ブロック要素

これらの要素については、基本的に前後に空行を設けるようにしてください。

#### 見出し

\`## heading\`というようにすると見出しを書くことができます。見出しのレベルは\`#\`の数で変え、少ないほどレベルが高いです。

なお、今回書くことができるのは、{primary}(h2〜h4にあたる要素のみ)です。それ以外のレベルはレンダリングされないように設定してあります。

#### 段落

前後に空行のあるテキストは段落として扱われます。マークダウンの仕様として、改行しても認識されないので{primary}(必ず空行を開けて)段落を変えるようにしてください。

このような感じにするように、ということです。

#### 画像

\`![name](href)\`というようにすると、画像が読み込めます。

![cat](http://d30uxjjrk95rd.cloudfront.net/img/pages/pet_cat/cat_img_81.jpg)

#### YouTube

\`@[youtube](href)\`というようにすると、YouTubeをiframeで埋め込めます。

@[youtube](https://www.youtube.com/watch?v=0YF8vecQWYs)

また、動画のIDだけを埋め込んで読み込むことも可能です。

@[youtube](0YF8vecQWYs)

#### ボタン

\`@[button](text, url)\`というようにすると、ボタン型のリンクを作成することができます。括弧内で、カンマで区切ってテキストとURLを入力してください。また、テキストやURLの先頭や末尾の空白はトリムされます。

@[button](サンプルのボタンです。, http://example.com)

#### 資格Times内記事引用

\`@[ogplink](id, title, description, imageURL, href)\`というようにすると、記事へのリンクが作成できます。

@[ogplink](001, サンプル記事, この記事の概要です。知に働けば角が立つ、情に棹させば流される。知に働けば角が立つ、情に棹させば流される。, http://d30uxjjrk95rd.cloudfront.net/img/pages/pet_cat/cat_img_81.jpg, http://example.com)

#### 商品紹介
\`@[goods]({"img":"http://example.com/sample.png","reference":"https://www.amazon.co.jp/sample","title":"title","subtitle":"subtitle","price":1234,"buttons":[{"text":"button 1","href":"https://example.com"},{"text":"button 2","href":"https://example.com"},{"text":"button 3","href":"https://example.com"}]})\`というようにしてください。

@[goods]({"img":"http://d30uxjjrk95rd.cloudfront.net/img/pages/pet_cat/cat_img_81.jpg","reference":"https://www.amazon.co.jp/%E3%80%90%E5%9B%BD%E5%86%85%E6%AD%A3%E8%A6%8F%E5%93%81%E3%80%91-%E3%83%88%E3%82%A4%E3%83%89%E3%83%AD%E3%83%BC%E3%83%B3-Tello-Powered-DJI/dp/B07979Q4YS?pd_rd_w=97nNy&pf_rd_p=9d2bdfad-5ca9-407b-88b5-b8fd9e5a4e4c&pf_rd_r=FBCRAQYKJ0VA297QV28B&pd_rd_r=934fb645-bce3-4d8d-ab97-99ea7e414d0e&pd_rd_wg=HMDpP&ref_=pd_gw_cr_simh","title":"タイトルあいうえお","subtitle":"サブタイトル","price":123,"buttons":[{"text":"button 1","href":"https://example.com"},{"text":"button 2","href":"https://example.com"},{"text":"button 3","href":"https://example.com"}]})

#### 引用

\`> quotes\`のように書くと引用できます。

> これは引用のサンプルです。
>
> 空行を開けて段落を変える際は、上のように\`>\`とだけ書くようにします。
>
> 出典は以下のように書いてください。必ず引用の末尾に書くように注意してください（スタイルが崩れます）。
>
> ::[出典の例](http://example.com)::

> 出典は別にリンクにしなくていいならこれでも大丈夫です。
>
> ::出典::

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

#### 枠囲み文章

\`\`\`
::: border タイトル
サンプル文章サンプル文章サンプル文章サンプル文章サンプル文章
:::
\`\`\`

のようにコードを書きます。ハイフンの上側が見出し行として扱われます。

::: border タイトル
サンプル文章サンプル文章サンプル文章サンプル文章サンプル文章
:::

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

#### グラフ（[Chart.js](https://www.chartjs.org/docs/latest/)）

\`new Chart(ctx, options)\`のoptionsに渡すオブジェクトを書きます。\`JSON.parse\`で解釈をするので、\`JSON.parse\`で解釈できる形で記述してください。

\`\`\`chart
{
  "type": "bar",
  "data": {
    "labels": [
      "Red",
      "Blue",
      "Yellow",
      "Green",
      "Purple",
      "Orange"
    ],
    "datasets": [
      {
        "label": "# of Votes",
        "data": [
          12,
          19,
          3,
          5,
          2,
          3
        ],
        "backgroundColor": [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        "borderColor": [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        "borderWidth": 1
      }
    ]
  },
  "options": {
    "responsive": true,
    "maintainAspectRatio": false,
    "scales": {
      "yAxes": [
        {
          "ticks": {
            "beginAtZero": true
          }
        }
      ]
    }
  }
}
\`\`\`

#### インタビュー形式

TOML header をつけた Markdown 風の文法で書きます。そのページ内では人物のデータは引き継がれます（interview のブロックが複数個に別れても、2箇所目以降では header を定義しないで大丈夫です）。

\`interview\` の名簿のみを上部で定義しておき、それを使って下部でレンダリングするといった使い方が良いと想定しています。

\`\`\`interview
+++
[person1]
name = "person1"
image = "https://www.knbs.or.ke/wp-content/uploads/2016/04/person-placeholder-300x275.jpg"
position = "left"

[person2]
name = "person2"
image = "https://image.shutterstock.com/image-vector/male-default-placeholder-avatar-profile-260nw-387516193.jpg"
position = "right"
+++

[person1]
これって〇〇なんですか？

> 引用等、普通の Markdown のようにここは書けます。

[person2]
これは△△なんですよ。

[person1]
なるほど、**□□**だからすごいんですね
\`\`\`

#### アコーディオン形式

\`\`\`accordion
[sample]
Hello world!!

[sample2]
箇条書きもできます。

- foo
- bar
- baz

[sample3]
使いたかったらその他特殊なものも入れられます。

\`\`\`chart
{
  "type": "bar",
  "data": {
    "labels": [
      "Red",
      "Blue",
      "Yellow",
      "Green",
      "Purple",
      "Orange"
    ],
    "datasets": [
      {
        "label": "# of Votes",
        "data": [
          12,
          19,
          3,
          5,
          2,
          3
        ],
        "backgroundColor": [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)"
        ],
        "borderColor": [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)"
        ],
        "borderWidth": 1
      }
    ]
  },
  "options": {
    "responsive": true,
    "maintainAspectRatio": false,
    "scales": {
      "yAxes": [
        {
          "ticks": {
            "beginAtZero": true
          }
        }
      ]
    }
  }
}
\`\`\`
\`\`\`
`
