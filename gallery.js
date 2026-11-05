/* gallery.js:自動找出資料夾裡的作品圖
   規則:資料夾裡的圖片要命名為 01.jpg、02.jpg、03.jpg…(從 01 開始、數字要連續)
   副檔名可以是 jpg、png、webp。最多自動讀取 99 張。
   找到第一個缺號就會停止,所以中間不要跳號。

   速度優化:
   1. 先找 01 確認副檔名,之後每 8 張一批「同時」探測(原本是一張一張排隊)
   2. 同一個資料夾在同一個瀏覽分頁只探測一次,結果放在 sessionStorage(10 分鐘內換頁不用重找) */
(function () {
  var EXTS = ['jpg', 'png', 'webp'];
  var BATCH = 8, TTL = 10 * 60 * 1000;
  var memo = {};

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  // 試著載入一張圖,成功就回傳網址與寬高,失敗回傳 null
  function loadImg(src) {
    return new Promise(function (resolve) {
      var im = new Image();
      im.decoding = 'async';
      im.onload = function () {
        resolve(im.naturalWidth && im.naturalHeight ? { src: src, w: im.naturalWidth, h: im.naturalHeight } : null);
      };
      im.onerror = function () { resolve(null); };
      im.src = src;
    });
  }

  // 第 i 張:已知副檔名就先試那個,沒有再同時試其他的
  function tryIndex(folder, i, hint) {
    var base = folder + '/' + pad(i) + '.';
    function all(list) {
      return Promise.all(list.map(function (e) { return loadImg(base + e); }))
        .then(function (rs) { return rs.filter(Boolean)[0] || null; });
    }
    if (!hint) return all(EXTS);
    return loadImg(base + hint).then(function (r) {
      return r || all(EXTS.filter(function (e) { return e !== hint; }));
    });
  }

  function readCache(key) {
    try {
      var c = JSON.parse(sessionStorage.getItem(key) || 'null');
      if (c && c.list && c.list.length && Date.now() - c.t < TTL) return c.list;
    } catch (e) {}
    return null;
  }
  function writeCache(key, list) {
    if (!list.length) return;
    try { sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), list: list })); } catch (e) {}
  }

  function findImages(folder, max) {
    max = max || 99;
    var key = 'jg1:' + folder + ':' + max;
    if (memo[key]) return memo[key];
    var cached = readCache(key);
    if (cached) return (memo[key] = Promise.resolve(cached));

    var out = [], hint = null;
    function batch(start) {
      if (start > max) return Promise.resolve();
      var end = Math.min(start + BATCH - 1, max), ps = [], i;
      for (i = start; i <= end; i++) ps.push(tryIndex(folder, i, hint));
      return Promise.all(ps).then(function (rs) {
        for (var k = 0; k < rs.length; k++) {
          if (!rs[k]) return;            // 缺號:到這裡為止
          out.push(rs[k]);
        }
        return batch(end + 1);
      });
    }
    return (memo[key] = tryIndex(folder, 1, null).then(function (first) {
      if (!first) return;
      out.push(first);
      hint = first.src.split('.').pop();
      return batch(2);
    }).then(function () {
      writeCache(key, out);
      return out;
    }));
  }

  window.JessGallery = { findImages: findImages };
})();
