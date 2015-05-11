//ブラウザ右上のボタンのバッチを更新する
whenGet('memo', function(res){
  setbadge(iconSet(res));
});


//---------- event ----------

/**
 * ストレージの変更を監視
 */
chrome.storage.onChanged.addListener(function(changes, namespace){
  if(namespace === "sync"){
    if(changes.memo){
      //ブラウザ右上のボタンのバッチを変更
      setbadge(iconSet(changes.memo.newValue));
    }
  }
});

//---------- function ----------

/**
 * chrome.storage から指定したデータを取得し成功したらfunc実行
 */
function whenGet(getKey, func){
  getCSAsync(getKey)
  .done(function(result){
    return func(result);
  })
  .fail(function(){
    return func(false);
  });
}

/**
 * chrome.storage から引数で指定されたデータを取得
 */
function getCSAsync(getKey){
  var dfd = new $.Deferred;
  chrome.storage.sync.get(function(items){
    if(items.hasOwnProperty(getKey)){
      dfd.resolve(JSON.parse(items[getKey]));
    }else{
      dfd.reject();
    }
  });
  return dfd.promise();
}

/**
 * ブラウザ右上のアイコンの状態設定の為のオブジェクトを返す
 */
function iconSet(ex_on){
  if(ex_on){
    return { text: 'ON', color: '#52C650'};
  }else{
    return { text: 'OFF', color: '#969696'};
  }
}

/**
 * ブラウザ右上のアイコンの状態を更新する
 */
function setbadge(ex_status){
  chrome.browserAction.setBadgeText({ text: ex_status.text});
  chrome.browserAction.setBadgeBackgroundColor({ color: ex_status.color});
}
