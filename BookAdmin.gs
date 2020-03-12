// LINE developersのメッセージ送受信設定に記載のアクセストークン
var ACCESS_TOKEN = '';        // 自分で取得したアクセストークンを''内に記入

function doPost(e) {
  // WebHookで受信した応答用Token
  var replyToken = JSON.parse(e.postData.contents).events[0].replyToken;
  // ユーザーのメッセージを取得
  var userMessage = JSON.parse(e.postData.contents).events[0].message.text;
  // 応答メッセージ用のAPI URL
  var url = 'https://api.line.me/v2/bot/message/reply';
  
  // ユーザーからのメッセージを改行ごとに分割
  var userMessage_divide = userMessage.split( /\n/ );

  /* スプレッドシート */
  // スプレッドシートを開く
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // スプレッドシートの中のシートを開く
  var sheet = spreadsheet.getSheetByName('シート2');      // シート1は練習用、シート2は実用として使用
  // シートの中のセルを参照
/*
  // 練習
  var row = 2;
  var column = 1;
  var range = sheet.getRange(row, column);
  var title = range.getValue();
*/


  /* 
    コマンドごとの実行 
  */
  var replyMessage;  // 返信内容
  
  var row;  // 行
  var column;  // 列
  var row_kazu = sheet.getRange(2, 8); // 総行数（ラベル含む）
  var row_count = row_kazu.getValue(); // 総行数（ラベル含む）
  row_count = row_count + 4; // 総行数 + 1（空白行もプラス）（For等で利用）
  
  var column_kazu = sheet.getRange(2, 9); // 総列数（ラベル含む）
  var column_count = column_kazu.getValue(); // 総列数（ラベル含む）
  column_count = column_count + 1;  // 総列数 + 1
  
  var all_hikae;  // まとめてforでやりたい時用
  var all;  // まとめてforでやりたい時用
  var shita_hikae;  // 削除時下段用
  var shita;       // 削除時下段用
  
  var title_hikae; // タイトル格納用
  var title;  // タイトル格納用
  
  var book_count_hikae;  // 巻数格納用
  var book_count;  // 巻数格納用
  
  var keyword_hikae;  // キーワード格納用
  var keyword;  // キーワード格納用
  
  var complete_hikae;  // 完or未完格納用
  var complete;  // 完or未完格納用
  
  var type_hikae;  // 種類格納用
  var type;  // 種類格納用

  if(userMessage_divide[0] === 'コマンドリスト'){
    replyMessage = 
      '①\n確認\n「タイトル」\n\n' +
      '②\n一覧\n\n' +
      '③\n更新\n「タイトル」\n\n' +
      '④\n追加\n「タイトル」\n「巻数」\n「完or未完」\n「キーワード」\n「本の種類」\n\n' +
      '⑤\n削除\n「タイトル」\n\n' +
      '⑥\n編集\n「編集前タイトル」\n「編集後タイトル」\n「編集後巻数」\n「編集後完or未完」\n「編集後キーワード」\n「編集後本の種類」\n※編集しない部分は「同」';
  } else if(userMessage_divide[0] === '確認'){
    /* 確認機能(巻数確認) */
    for(row = 5; row < row_count; row++){
      // タイトル確認(ユーザーメッセージとの比較)
      column = 1;
      title_hikae = sheet.getRange(row, column);
      title = title_hikae.getValue();
      if(userMessage_divide[1] === title){
        // 巻数確認
        column = 2;
        book_count_hikae = sheet.getRange(row, column);
        book_count = book_count_hikae.getValue();
        replyMessage = book_count + '巻まで持ってるよ';
      }
    }
    // そのタイトルが存在しなかった場合
    if(replyMessage == null){
      replyMessage = 'その作品は持ってないよ';
    }
  } else if(userMessage_divide[0] === '一覧'){
    /* 一覧機能（所持作品のタイトル一覧を表示）*/
    for(row = 5; row < row_count; row++){
      // タイトル用
      column = 1;
      title_hikae = sheet.getRange(row, column);
      title = title_hikae.getValue();
      // 巻数用
      column = 2;
      book_count_hikae = sheet.getRange(row, column);
      book_count = book_count_hikae.getValue();
      // 完or未完用
      column = 3;
      complete_hikae = sheet.getRange(row, column);
      complete = complete_hikae.getValue();
      if(complete !== '完' && complete !== '未完'){
        complete = '不明';
      }
      // 一覧作成
      if(row === 5){
        replyMessage = '・' + title + '　' + book_count + '巻(' + complete + ')';
      } else{
        replyMessage = replyMessage + '\n' + '・' + title + '　' + book_count + '巻(' + complete + ')';
      }
    }
  } else if(userMessage_divide[0] === '更新'){
    /* 更新機能（所持作品の巻数を更新する）*/
    for(row = 5; row < row_count; row++){
      // タイトル検索
      column = 1;
      title_hikae = sheet.getRange(row, column);
      title = title_hikae.getValue();
      if(userMessage_divide[1] === title){
        // 巻数更新
        column = 2;
        book_count_hikae = sheet.getRange(row, column);
        book_count = book_count_hikae.getValue();
        book_count = book_count + 1;
        book_count_hikae.setValue(book_count);
        replyMessage = book_count + '巻に更新したよ！';
      }
    }
    // そのタイトルが存在しなかった場合
    if(replyMessage == null){
      replyMessage = 'その作品は持ってないよ';
    }
    
  } else if(userMessage_divide[0] === '追加'){
    /* 追加機能*/
    var have = false;
    row = 5;
    while(row < row_count){
      // タイトル確認(ユーザーメッセージとの比較)
      column = 1;
      title_hikae = sheet.getRange(row, column);
      title = title_hikae.getValue();
      if(userMessage_divide[1] === title){
        have = true;
        break;
      }
      row++;
    }
    
    if(have === false){
      row = row_count;
      // タイトル追加
      if(userMessage_divide[1] != null){
        column = 1;
        title_hikae = sheet.getRange(row, column);
        title_hikae.setValue(userMessage_divide[1]);
        replyMessage = '追加情報\n' + 'タイトル : ' + userMessage_divide[1];
      }
      // 巻数追加
      if(userMessage_divide[2] != null){
        column = 2;
        book_count_hikae = sheet.getRange(row, column);
        book_count_hikae.setValue(userMessage_divide[2]);
        replyMessage = replyMessage + '\n' + '巻数 : ' + userMessage_divide[2];
      }
      // 完or未完
      if(userMessage_divide[3] != null){
        if(userMessage_divide[3] !== '完' && userMessage_divide[3] !== '未完'){
          userMessage_divide[3] = null;
        }
        column = 3;
        complete_hikae = sheet.getRange(row, column);
        complete_hikae.setValue(userMessage_divide[3]);
        if(userMessage_divide[3] === null){
          replyMessage = replyMessage + '\n' + '完or未完 : 入力されませんでした。「完」or「未完」で入力してください。';
        } else{
          replyMessage = replyMessage + '\n' + '完or未完 : ' + userMessage_divide[3];
        }
      }
      // キーワード
      if(userMessage_divide[4] != null){
        column = 4;
        keyword_hikae = sheet.getRange(row, column);
        keyword_hikae.setValue(userMessage_divide[4]);
        replyMessage = replyMessage + '\n' + 'キーワード : ' + userMessage_divide[4];
      }
      // 本の種類
      if(userMessage_divide[5] != null){
        column = 5;
        type_hikae = sheet.getRange(row, column);
        type_hikae.setValue(userMessage_divide[5]);
        replyMessage = replyMessage + '\n' + '種類 : ' + userMessage_divide[5];
      }
    } else{
      replyMessage = 'その作品は既に登録済みですよ';
    }
    
  } else if(userMessage_divide[0] === '削除'){
    /* 削除機能*/
    var del = false;  // 削除したかどうか
    for(row = 5; row < row_count; row++){
      // タイトル確認(ユーザーメッセージとの比較)
      column = 1;
      title_hikae = sheet.getRange(row, column);
      title = title_hikae.getValue();
      if(userMessage_divide[1] === title){
        // 全列消去(下段のものを上書き)
        for(var j = row; j < row_count; j++){
          for(var i = 1; i < column_count; i++){
            shita_hikae = sheet.getRange(j+1, i);
            shita = shita_hikae.getValue();
            all_hikae = sheet.getRange(j, i);
            all_hikae.setValue(shita);
          }
        }
        del = true;
      }
    }
    if(del === true){
      replyMessage = userMessage_divide[1] + 'を削除しました';
    } else{
      replyMessage = userMessage_divide[1] + 'は持っていません';
    }
  }else if(userMessage_divide[0] === '編集'){
    /*編集機能*/
    row = 5;
    while(row < row_count){
      // タイトル検索
      column = 1;
      title_hikae = sheet.getRange(row, column);
      title = title_hikae.getValue();
      if(userMessage_divide[1] === title){
        // 編集
        // タイトル
        if(userMessage_divide[2] != null && userMessage_divide[2] != '同'){
          column = 1;
          title_hikae = sheet.getRange(row, column);
          title_hikae.setValue(userMessage_divide[2]);
          replyMessage = '編集情報\n' + 'タイトル : ' + userMessage_divide[2];
        } else if(userMessage_divide[2] === '同'){
          replyMessage = '編集情報\n' + 'タイトル : 編集無し';
        }
        
        // 巻数
        if(userMessage_divide[3] != null && userMessage_divide[3] != '同'){
          column = 2;
          book_count_hikae = sheet.getRange(row, column);
          book_count_hikae.setValue(userMessage_divide[3]);
          replyMessage = replyMessage + '\n' + '巻数 : ' + userMessage_divide[3];
        } else if(userMessage_divide[3] === '同'){
          replyMessage = replyMessage + '\n' + '巻数 : 編集無し';
        }
        
        // 完or未完
        if(userMessage_divide[4] != null && userMessage_divide[4] != '同'){
          var com = false;
          column = 3;
          complete_hikae = sheet.getRange(row, column);
          if(userMessage_divide[4] !== '完' && userMessage_divide[4] !== '未完'){
            userMessage_divide[4] = complete_hikae.getValue();
            com = true;
          }
          complete_hikae.setValue(userMessage_divide[4]);
          if(com === true){
            replyMessage = replyMessage + '\n' + '完or未完 : 編集無し。「完」or「未完」で入力してください。';
          } else{
            replyMessage = replyMessage + '\n' + '完or未完 : ' + userMessage_divide[4];
          }
        } else if(userMessage_divide[4] === '同'){
          replyMessage = replyMessage + '\n' + '完or未完 : 編集無し';
        }
        
        // キーワード
        if(userMessage_divide[5] != null && userMessage_divide[5] != '同'){
          column = 4;
          keyword_hikae = sheet.getRange(row, column);
          keyword_hikae.setValue(userMessage_divide[5]);
          replyMessage = replyMessage + '\n' + 'キーワード : ' + userMessage_divide[5];
        } else if(userMessage_divide[5] === '同'){
          replyMessage = replyMessage + '\n' + 'キーワード : 編集無し';
        }
        
        // 種類
        if(userMessage_divide[6] != null && userMessage_divide[6] != '同'){
          column = 5;
          type_hikae = sheet.getRange(row, column);
          type_hikae.setValue(userMessage_divide[6]);
          replyMessage = replyMessage + '\n' + '種類 : ' + userMessage_divide[6];
        } else if(userMessage_divide[6] === '同'){
          replyMessage = replyMessage + '\n' + '種類 : 編集無し';
        }
        
        // 編集したらループ脱出
        break;
      }
      row++;
    }
  }
  
  
  // 返信用
  UrlFetchApp.fetch(url, {
    'headers': {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + ACCESS_TOKEN,
    },
    'method': 'post',
    'payload': JSON.stringify({
      'replyToken': replyToken,
      'messages': [{
        'type': 'text',
        'text': replyMessage,
      }],
    }),
    });
  return ContentService.createTextOutput(JSON.stringify({'content': 'post ok'})).setMimeType(ContentService.MimeType.JSON);
}

/*　メモ　*/
// 配列はそのままじゃ返信メッセとしては使えない．配列要素にする必要アリ