#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
make_thumbs.py:替網站的作品圖/範例圖產生「縮圖」和「圖片清單」,網站就不用每次下載原始大圖。

用法(在網站資料夾,也就是有 index.html 和 images 資料夾的地方):
    1. 第一次先安裝:  pip install pillow
    2. 執行:          python make_thumbs.py        (Windows 也可以直接點兩下 make_thumbs.bat)
    3. 把新產生的 images 資料夾(裡面多了 _t 資料夾和 manifest.json)一起上傳到 GitHub

每次新增、替換或刪除圖片之後,都要再執行一次(已經做好的縮圖會自動跳過,很快)。

它做的事:
  - 掃描 images/works/ 和 images/price/ 底下所有命名成 01.jpg、02.jpg… 的資料夾
  - 每張圖做兩種 WebP 縮圖放在該資料夾的 _t 子資料夾:
        _t/01.webp    小圖(長邊最多 900px):作品集格子、首頁跑馬燈、VTuber 卡片
        _t/01_m.webp  中圖(長邊最多 1800px):價目表範例圖、點開放大時先顯示
    原圖不會被改動,點開放大後會自動換成原圖
  - 產生 images/manifest.json:記錄每個資料夾有哪幾張圖、寬高,
    網站讀這一個小檔案就知道有哪些圖,不必再一張一張下載原圖來探測
"""
import json
import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    print("找不到 Pillow,請先執行:  pip install pillow")
    sys.exit(1)

ROOTS = ["images/works", "images/price"]
EXTS = ["jpg", "png", "webp"]          # 和網站的規則一樣
SMALL, MID = 900, 1800                 # 長邊上限(像素)
Q_SMALL, Q_MID = 80, 86                # WebP 品質

Image.MAX_IMAGE_PIXELS = None


def pad(n):
    return "%02d" % n


def find_image(folder, i):
    for e in EXTS:
        p = folder / ("%s.%s" % (pad(i), e))
        if p.is_file():
            return p
    return None


def make_one(src, dst, limit, quality, im):
    if dst.exists() and dst.stat().st_mtime >= src.stat().st_mtime:
        return False
    w, h = im.size
    out = im
    if max(w, h) > limit:
        k = limit / float(max(w, h))
        out = im.resize((max(1, round(w * k)), max(1, round(h * k))), Image.LANCZOS)
    if out.mode not in ("RGB", "RGBA"):
        out = out.convert("RGBA" if "A" in out.mode or out.mode == "P" else "RGB")
    dst.parent.mkdir(exist_ok=True)
    out.save(dst, "WEBP", quality=quality, method=6)
    return True


def main():
    base = Path(__file__).resolve().parent
    os.chdir(base)
    if not Path("images").is_dir():
        print("在這個資料夾找不到 images 資料夾。請把這支程式放在網站資料夾(有 index.html 的地方)再執行。")
        sys.exit(1)

    folders = []
    for root in ROOTS:
        if not Path(root).is_dir():
            continue
        for dirpath, dirnames, _ in os.walk(root):
            dirnames[:] = sorted(d for d in dirnames if d != "_t")
            if find_image(Path(dirpath), 1):
                folders.append(Path(dirpath))

    manifest = {"v": 1, "folders": {}}
    total_orig = total_thumb = made = 0
    for folder in folders:
        key = folder.as_posix()
        entries = []
        i = 1
        while True:
            src = find_image(folder, i)
            if not src:
                break
            with Image.open(src) as raw:
                im = ImageOps.exif_transpose(raw)
                im.load()
                w, h = im.size
                t_small = folder / "_t" / ("%s.webp" % pad(i))
                t_mid = folder / "_t" / ("%s_m.webp" % pad(i))
                made += make_one(src, t_small, SMALL, Q_SMALL, im)
                made += make_one(src, t_mid, MID, Q_MID, im)
            entries.append({"n": src.name, "w": w, "h": h,
                            "s": "_t/%s.webp" % pad(i), "m": "_t/%s_m.webp" % pad(i)})
            total_orig += src.stat().st_size
            total_thumb += t_small.stat().st_size
            i += 1
        # 提醒:有編號跳號的話,網站只會讀到跳號前
        later = [p for p in folder.iterdir() if p.is_file() and p.stem.isdigit() and int(p.stem) > i]
        if later:
            print("  ⚠ %s 的編號在 %s 之後有跳號,後面的圖網站不會讀取" % (key, pad(i)))
        manifest["folders"][key] = entries
        print("  %-34s %2d 張" % (key, len(entries)))

    Path("images/manifest.json").write_text(
        json.dumps(manifest, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    mb = lambda b: b / 1024.0 / 1024.0
    print("\n完成!共 %d 個資料夾、新做了 %d 個縮圖檔。" % (len(folders), made))
    if total_orig:
        print("原圖合計 %.1f MB → 小圖合計 %.1f MB(格子/跑馬燈實際下載量約縮到 %d%%)"
              % (mb(total_orig), mb(total_thumb), round(100.0 * total_thumb / total_orig)))
    print("請把 images 資料夾(含 _t 和 manifest.json)一起上傳。")


if __name__ == "__main__":
    main()
