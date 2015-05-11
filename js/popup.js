/**
 * Memo初期値セット(chrome.storage取得)
 */
whenGet('memo', function(getdata){
  $('#memo').val(getdata);
});

/**
 * 保存ボタンのClick監視
 */
$('#hozon').on('click', function(){
  var put_memo = $('#memo').val();
  chrome.storage.sync.set({memo: JSON.stringify(put_memo)}, function(){});
});

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
    if(items && items.hasOwnProperty(getKey)){
      dfd.resolve(JSON.parse(items[getKey]));
    }else{
      dfd.reject();
    }
  });
  return dfd.promise();
}
