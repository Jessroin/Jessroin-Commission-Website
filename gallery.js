/* gallery.js:自動找出資料夾裡的作品圖
   規則:資料夾裡的圖片要命名為 01.jpg、02.jpg、03.jpg…(從 01 開始、數字要連續)
   副檔名可以是 jpg、png、webp。最多自動讀取 99 張。找到第一個缺號就會停止,所以中間不要跳號。

   兩種讀取方式:
   1. 有 images/manifest.json(執行 make_thumbs.py 產生)→ 只讀這一個小檔案就知道所有圖的檔名與寬高,
      格子用小縮圖、點開放大才載入大圖。快很多。
      清單之後如果又多放了新圖(還沒重新執行 make_thumbs.py),也會自動接著找,不會漏掉。
   2. 沒有清單 → 退回「同時探測」:先找 01 確認副檔名,之後每 8 張一批同時探測。

   回傳的每一項:{ src:原圖, thumb:小圖(沒有就是原圖), mid:中圖(沒有就是原圖), w, h } */
(function () {
  var EXTS = ['jpg', 'png', 'webp'];
  var BATCH = 8, TTL = 10 * 60 * 1000;
  var memo = {}, manifestP = null;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  // 試著載入一張圖,成功就回傳網址與寬高,失敗回傳 null
  function loadImg(src) {
    return new Promise(function (resolve) {
      var im = new Image();
      im.decoding = 'async';
      im.onload = function () {
        resolve(im.naturalWidth && im.naturalHeight ? { src: src, thumb: src, mid: src, w: im.naturalWidth, h: im.naturalHeight } : null);
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

  // 從第 start 張開始一批一批同時探測,遇到缺號就停
  function scan(folder, max, out, start, hint) {
    function batch(s) {
      if (s > max) return Promise.resolve();
      var end = Math.min(s + BATCH - 1, max), ps = [], i;
      for (i = s; i <= end; i++) ps.push(tryIndex(folder, i, hint));
      return Promise.all(ps).then(function (rs) {
        for (var k = 0; k < rs.length; k++) {
          if (!rs[k]) return;
          out.push(rs[k]);
        }
        return batch(end + 1);
      });
    }
    if (start > 1) return batch(start);
    return tryIndex(folder, 1, null).then(function (first) {
      if (!first) return;
      out.push(first);
      hint = first.src.split('.').pop();
      return batch(2);
    });
  }

  function getManifest() {
    if (!manifestP) {
      manifestP = window.fetch
        ? fetch('images/manifest.json').then(function (r) { return r.ok ? r.json() : null; }).catch(function () { return null; })
        : Promise.resolve(null);
    }
    return manifestP;
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
    var key = 'jg2:' + folder + ':' + max;
    if (memo[key]) return memo[key];
    var cached = readCache(key);
    if (cached) return (memo[key] = Promise.resolve(cached));

    return (memo[key] = getManifest().then(function (m) {
      var e = m && m.folders && m.folders[folder], out = [];
      if (e && e.length) {
        out = e.slice(0, max).map(function (x) {
          return {
            src: folder + '/' + x.n,
            thumb: x.s ? folder + '/' + x.s : folder + '/' + x.n,
            mid: x.m ? folder + '/' + x.m : folder + '/' + x.n,
            w: x.w, h: x.h
          };
        });
        // 清單之後新放的圖(還沒產生縮圖)接著找
        return scan(folder, max, out, out.length + 1, out[out.length - 1].src.split('.').pop()).then(function () { return out; });
      }
      return scan(folder, max, out, 1, null).then(function () { return out; });
    }).then(function (out) {
      writeCache(key, out);
      return out;
    }));
  }

  window.JessGallery = { findImages: findImages };
})();
