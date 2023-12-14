## 目的
next.jsでtailwindとMUIを同時に使用する技術選定の検証である。

## app概要
create-next-appで構築されたNext.jsとfirabaseのfirestoreとauthenticationを利用したCMSプロジェクトです。

* ベーススタイルはtailwindで指定、フォームUIコンポーネントはMUIを使用

[ベースappはコチラ](https://github.com/k-gitest/next-ts-fire-auth-store-cms-onClient)

## 開発環境

* next 13.4.2
* typescript 5.0.4
* firebase 9.22.0
* firebase-admin 11.9.0
* tailwind 3.3.2
* mui/material 5.13.5
* swr 2.1.5
* axios 1.4.0

## ディレクトリ構成

<pre>
myapp...プロジェクトディレクトリ
  ├── components ...呼び出し用コンポーネントファイル
  │     ├── Private ...ログインユーザー向けコンポーネント
  │     ├── Public ...非ログインユーザー向けコンポーネント
  │     ├── layout ...メインレイアウト
  │     └── provider ...ユーザー認証チェック
  ├── lib ...firebaseなど外部設定ファイル
  ├── pages ...初期生成されるメインファイル
  │     ├── [uid] ...一般向け画面
  │     │     └── [pid] ... 投稿表示画面
  │     ├── api ...サーバー側処理
  │     │     └── admin ... adminSDK使用ファイル
  │     ├── login ...ログイン画面
  │     ├── signup ...登録画面
  │     └── user ...会員向け画面
  ├── public ...画像ファイル
  ├── styles ...css設定ファイル
  │     ├── globals.css ...グローバルCSS設定
  │     └── twbase.css ...tailwindベースCSSファイル
  └── types ...型定義ファイル
</pre>

* フォームコンポーネントはMUIを使用するので作らない

## 注意点

tailwindがインストールされていてもMUIをインストールするとMUIのベーススタイルが適用されてしまう。何もせずtailwindでスタイル指定しても反映されない。

併用する場合はstyles/globals.cssにtailwindのbaseCSSを読み込む必要がある。
twbase.cssを作成しbaseCSSを書き込み、globals.cssでtwbase.cssをimportする事でtailwindが適用されるようになる。

## 結論

MUIを使用する事でフォームパーツのコンポーネントを作る必要がなくなり、値の受渡しをMUIがすることによって登録画面コンポーネントのコードがすっきりし分かり易くなる。

UI機能をMUI、UIスタイルをtailwindと分ける事ができる。

next.jsではなくreactで併用する場合はMaterial Tailwindを使用した方が分かり易い。
