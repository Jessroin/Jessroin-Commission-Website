/* gallery.js:自動找出資料夾裡的作品圖
   規則:資料夾裡的圖片要命名為 01.jpg、02.jpg、03.jpg…(從 01 開始、數字要連續)
   副檔名可以是 jpg、png、webp。最多自動讀取 99 張。
   找到第一個缺號就會停止,所以中間不要跳號。 */
(function () {
  var EXTS = ['jpg', 'png', 'webp'];

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  // 試著載入一張圖,成功就回傳網址與寬高,失敗回傳 null
  function loadImg(src) {
    return new Promise(function (resolve) {
      var im = new Image();
      im.onload = function () {
        resolve(im.naturalWidth && im.naturalHeight ? { src: src, w: im.naturalWidth, h: im.naturalHeight } : null);
      };
      im.onerror = function () { resolve(null); };
      im.src = src;
    });
  }

  // 依序找 01、02、03…直到找不到為止
  function findImages(folder, max) {
    max = max || 99;
    var out = [];
    function next(i) {
      if (i > max) return Promise.resolve(out);
      return Promise.all(EXTS.map(function (e) {
        return loadImg(folder + '/' + pad(i) + '.' + e);
      })).then(function (results) {
        var hit = results.filter(Boolean)[0];
        if (!hit) return out;
        out.push(hit);
        return next(i + 1);
      });
    }
    return next(1);
  }

  window.JessGallery = { findImages: findImages };
})();
