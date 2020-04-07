# LINE-BOT-that-manages-books
This LINE bot manages books that I have.

---
---

## 前提
- 個人用です。現在の仕様では、ご利用の際にはご自身用のLINE botを作成していただく必要があります。こちらからそのまま利用出来るのはコードの中身のみです。

---
## 概要
- LINEで手軽に本の管理を行う目的で作成したLINE botです。現状では6つの機能を持っています(タイトル一覧表示、タイトル情報追加、巻数確認、巻数更新、タイトル情報編集、タイトル情報削除)。ウェブアプリケーションを介してGoogle Drive上のスプレッドシートと連動し、管理を行っております。

---

## 必要なもの
- PC (おそらくスマホからではコーディングが出来ない)
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

---

## 使い方
- こちらのLINE botには現在6つの機能が搭載されています。機能実行のためのコマンドはbotに「コマンドリスト」というメッセージを送ることでも確認出来ますので、適宜そちらで確認してみてください。以下実行例(見切れてしまってすみません)。

![コマンドリスト](https://github.com/kingStaku/LINE-BOT-that-manages-books/blob/master/images/CommandList.png)

### 機能

1. 所持タイトル一覧表示
    - 所持している本のタイトル、巻数、完結しているかどうかの情報を一覧として表示します。以下実行例。

    ![一覧表示](https://github.com/kingStaku/LINE-BOT-that-manages-books/blob/master/images/table.png)

1. 新規購入タイトル情報追加
    - 新規に追加したいタイトルの情報を指定通りに追加します。以下実行例。「山田の冒険」という作品の情報を追加しています。

    ![タイトル追加](https://github.com/kingStaku/LINE-BOT-that-manages-books/blob/master/images/add.png)![追加結果](https://github.com/kingStaku/LINE-BOT-that-manages-books/blob/master/images/add_result.png)

1. 巻数確認
    - 指定した作品を何巻まで持っているかを表示します。以下実行例。追加した「山田の冒険」の巻数を確認しています。

    ![巻数確認](https://github.com/kingStaku/LINE-BOT-that-manages-books/blob/master/images/check.png)

1. 巻数更新
    - 指定した作品の巻数を一巻分更新します。以下実行例。「山田の冒険」の巻数を更新しています。

    ![巻数更新](https://github.com/kingStaku/LINE-BOT-that-manages-books/blob/master/images/update.png)

1. 所持タイトル情報編集
    - 指定した所持タイトルの情報を指定通りに編集します。以下実行例。「山田の冒険」の情報を「山田の探検」の情報に編集しています。

    ![情報編集](https://github.com/kingStaku/LINE-BOT-that-manages-books/blob/master/images/edit.png)![編集結果](https://github.com/kingStaku/LINE-BOT-that-manages-books/blob/master/images/edit_result.png)

1. 所持タイトル情報削除
    - 指定した所持タイトルの情報を削除することが出来ます。以下実行例。「山田の探検」の情報を削除しています。

    ![タイトル削除](https://github.com/kingStaku/LINE-BOT-that-manages-books/blob/master/images/delete.png)
