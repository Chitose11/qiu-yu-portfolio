from pathlib import Path
from PIL import Image, ImageOps

ROOT = Path(r"D:\ai\Portfolio")
OUT = ROOT / "public" / "assets"
OUT.mkdir(parents=True, exist_ok=True)

ASSETS = {
    Path(r"F:\desktop\微信图片_20260806193237_73_1.jpg"): ("qiu-yu.webp", 1600, 88),
    ROOT / "项目文件" / "水印助手" / "首页.png": ("watermark-home.webp", 2000, 84),
    ROOT / "项目文件" / "水印助手" / "首页-图片加水印.png": ("watermark-editor.webp", 2000, 84),
    ROOT / "项目文件" / "人声分离" / "首页-欢迎页.png": ("voice-home.webp", 2000, 84),
    ROOT / "项目文件" / "人声分离" / "首页-列表填充状态.png": ("voice-batch.webp", 2000, 84),
    ROOT / "项目文件" / "AI小红书笔记" / "首页.png": ("xhs-home.webp", 1800, 84),
    ROOT / "项目文件" / "AI小红书笔记" / "IP账号定位.png": ("xhs-positioning.webp", 2000, 84),
}

for source, (name, max_width, quality) in ASSETS.items():
    if not source.exists():
        raise FileNotFoundError(source)
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image).convert("RGB")
        if image.width > max_width:
            height = round(image.height * max_width / image.width)
            image = image.resize((max_width, height), Image.Resampling.LANCZOS)
        image.save(OUT / name, "WEBP", quality=quality, method=6)
        print(f"{name}: {image.width}x{image.height}")
