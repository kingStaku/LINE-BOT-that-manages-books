# LINE-BOT-that-manages-books
This LINE bot manages books that I have.

---
---

## 前提
- 個人用です。現在の仕様では、ご利用の際にはご自身用のLINE botを作成していただく必要があります。こちらからそのまま利用出来るのはコードの中身のみです。

---
## 概要
- LINEで手軽に本の管理を行う目的で作成したLINE botです。個人的に所持している本が多くなりすぎて、把握しきれなくなったので作成しました。こちらのLINE botは現状では6つの機能を持っています(タイトル一覧表示、タイトル情報追加、巻数確認、巻数更新、タイトル情報編集、タイトル情報削除)。ウェブアプリケーションを介してGoogle Drive上のスプレッドシートと連動し、管理を行っております。使用言語はGoogle Apps Script(ほぼJavascript)です。

---

## 必要なもの
- PC (スマホからではコーディングが出来ない)
    - OSはGoogleとLINEが使えるものであれば大丈夫です。
- LINE
    - LINEそのもの (PC・スマホどちらのアプリケーションでも可)
    - ご自身で作成したLINE bot
- Google Drive
    - Google Driveそのもの
    - スプレッドシート
    - スプレッドシートのツールから開けるスクリプトエディタ

---

## 大まかな実装方法

1. [LINE Developers](https://developers.line.biz/ja/)にご自身のLINEアカウントでログインし、LINE botを作成します。bot作成までの詳しい流れは[こちら](https://qiita.com/nkjm/items/38808bbc97d6927837cd#channel%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)を参考にしてください。アクセストークンを発行したら2へ。(まだやることあるのでウィンドウは閉じないように)
2. Google Drive上でスプレッドシートを作成し開きます。スプレッドシートのメニューバーの「ツール」から「スクリプトエディタ」を選ぶとエディタが開きますので、私が公開しているコードをそのままコピー＆ペーストしてください。その後、1で取得したアクセストークンをコード内のアクセストークン記入欄に書き込むのを忘れないようにしてください。また、現在私のコード内ではスプレッドシートの「シート2」を指定しているため、ご自身で適宜指定シートを書き換えてください。
3. スクリプトエディタのメニューバーにある「公開」から「ウェブアプリケーションとして導入」を選択してください。その際、ウェブアプリケーションとしてのURLが表示されるのでコピーしておいてください。
4. LINE Developersにて、1で作成したLINE botの「Webhook URL」という欄に、3でコピーしておいたURLをペーストします。その説明も1で提示した[こちら](https://qiita.com/nkjm/items/38808bbc97d6927837cd#channel%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B)に記述がありますので参考にしてください。接続が成功したら5へ。
5. これでLINE botは機能するようになっているはずです。LINEのアプリケーションからbotを友達追加し、試してみましょう。

<div style="page-break-before:always"></div>

---

## 使い方
- こちらのLINE botには現在6つの機能が搭載されています。機能実行のためのコマンドはbotに「コマンドリスト」というメッセージを送ることでも確認出来ますので、適宜そちらで確認してみてください。以下実行例(見切れてしまってすみません)。

![コマンドリスト](images/CommandList.png)

<div style="page-break-before:always"></div>

### 機能

1. 所持タイトル一覧表示
    - 所持している本のタイトル、巻数、完結しているかどうかの情報を一覧として表示します。以下実行例。

    ![一覧表示](images/table.png)

<div style="page-break-before:always"></div>

2. 新規購入タイトル情報追加
    - 新規に追加したいタイトルの情報を指定通りに追加します。以下実行例。「山田の冒険」という作品の情報を追加しています。

    ![タイトル追加](images/add.png)

    ![追加結果](images/add_result.png)

<div style="page-break-before:always"></div>

3. 巻数確認
    - 指定した作品を何巻まで持っているかを表示します。以下実行例。追加した「山田の冒険」の巻数を確認しています。

    ![巻数確認](images/check.png)

<div style="page-break-before:always"></div>

4. 巻数更新
    - 指定した作品の巻数を一巻分更新します。以下実行例。「山田の冒険」の巻数を更新しています。

    ![巻数更新](images/update.png)

<div style="page-break-before:always"></div>

5. 所持タイトル情報編集
    - 指定した所持タイトルの情報を指定通りに編集します。以下実行例。「山田の冒険」の情報を「山田の探検」の情報に編集しています。

    ![情報編集](images/edit.png)

    ![編集結果](images/edit_result.png)

<div style="page-break-before:always"></div>

6. 所持タイトル情報削除
    - 指定した所持タイトルの情報を削除することが出来ます。以下実行例。「山田の探検」の情報を削除しています。

    ![タイトル削除](images/delete.png)

---

## 今後の展望
- LINEのリッチメニュー機能を用いることでさらに入力をスマートに
- 一覧ソート機能など、実装出来る細かい機能の実装
- 同じbotを他者も使えるような道を模索

<div style="page-break-before:always"></div>

---

## 参考サイトURL
1. "Messaging APIを利用するには | LINE Developers"
    - https://developers.line.biz/ja/docs/messaging-api/getting-started/#%E3%83%81%E3%83%A3%E3%83%8D%E3%83%AB%E3%81%AE%E4%BD%9C%E6%88%90 
2. "LINEのBot開発 超入門（前編） ゼロから応答ができるまで - Qiita"
    - https://qiita.com/nkjm/items/38808bbc97d6927837cd#channel%E3%82%92%E4%BD%9C%E6%88%90%E3%81%99%E3%82%8B 
3. "LINE BOTをGASで作成 - Qiita"
    - https://qiita.com/t_gata/items/897936761695124ef920 
4. "【LINE Bot】Google Apps Scriptを用いたLINE Botの作成【GAS】 - ganganの技術備忘録"
    - https://gangannikki.hatenadiary.jp/entry/2019/04/06/120000 
5. "【初心者向けGAS】スプレッドシートのセル・セル範囲とその値を取得する方法"
    - https://tonari-it.com/gas-spreadsheet-range-value-values/ 
6. "【初心者向けGAS】スプレッドシートのセルに値を入力する基礎の基礎"
    - https://tonari-it.com/gas-setvalue/ 