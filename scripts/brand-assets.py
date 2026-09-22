#!/usr/bin/env python3
"""Derive every brand asset the site uses from the two logo masters.

The masters are flat artwork on a solid ground: `magma-on-black.png` is the
light lockup on black, `magma-on-white.png` the dark lockup on white. Neither
can be dropped straight onto the page — a black square behind the mark ruins
the transparent header, and a white one ruins the dark footer — so this script
keys the ground out and writes tight-cropped RGBA WebP for each surface.

Keying, rather than hand-tracing, because the mark is a knockout: the pillar
shows through the scale beam, which `currentColor` and a tinted SVG cannot
express. The ground is removed by un-premultiplying against it, so an
anti-aliased edge keeps its partial coverage and composites cleanly:

    on black   alpha = max(r,g,b)        colour = pixel / alpha
    on white   alpha = 1 - min(r,g,b)    colour = (pixel - (1-alpha)) / alpha

Each artwork is then only correct on the ground it was keyed from, which is
exactly how the site uses it: `-light` on ink, `-dark` on paper.

Run it after replacing a master. Needs Pillow, which is not a project
dependency because the output is committed:

    pip install pillow && python3 scripts/brand-assets.py
"""

from __future__ import annotations

import pathlib

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
BRAND = ROOT / "src" / "assets" / "brand"
PUBLIC = ROOT / "public"

# The row where the lockup stops being the mark and starts being the wordmark.
# Measured on the masters: the mark ends at y=585, "MAGMA" starts at y=632.
SPLIT_Y = 608

# Anti-aliasing puts a little of the ground into every edge pixel and JPEG-ish
# compression puts a little noise into the ground itself. Coverage below `LO`
# is the ground, above `HI` is solid ink, and the ramp between is kept.
LO, HI = 0.02, 0.97

# The brand red, sampled off the masters at full strength, for the flat panels
# this script draws itself (icons, link card).
INK = (8, 8, 9)


def keyed(master: Image.Image, ground: str) -> Image.Image:
    """Flat artwork on a solid ground → RGBA with the ground removed."""
    rgb = master.convert("RGB")
    width, height = rgb.size
    source = rgb.load()
    out = Image.new("RGBA", (width, height))
    target = out.load()

    for y in range(height):
        for x in range(width):
            r, g, b = source[x, y]
            if ground == "black":
                coverage = max(r, g, b) / 255
            else:
                coverage = 1 - min(r, g, b) / 255

            alpha = (coverage - LO) / (HI - LO)
            if alpha <= 0:
                target[x, y] = (0, 0, 0, 0)
                continue
            if alpha > 1:
                alpha = 1.0

            if ground == "black":
                channels = tuple(min(255, round(c / alpha)) for c in (r, g, b))
            else:
                channels = tuple(
                    max(0, min(255, round((c - 255 * (1 - alpha)) / alpha))) for c in (r, g, b)
                )

            target[x, y] = (*channels, round(alpha * 255))

    return out


def trimmed(image: Image.Image, pad: int = 2) -> Image.Image:
    """Crop to the ink, keeping a hair of padding so nothing clips."""
    box = image.split()[3].point(lambda a: 255 if a > 8 else 0).getbbox()
    if box is None:
        raise SystemExit("the keyed artwork is empty — is the master's ground solid?")
    left, top, right, bottom = box
    return image.crop(
        (
            max(0, left - pad),
            max(0, top - pad),
            min(image.width, right + pad),
            min(image.height, bottom + pad),
        )
    )


def write_webp(image: Image.Image, name: str, cap: int | None = None) -> None:
    """`cap` is the tallest the artwork is ever drawn, in device pixels."""
    path = BRAND / name
    if cap is not None and image.height > cap:
        image = image.resize((round(image.width * cap / image.height), cap), Image.LANCZOS)
    # Lossless: these are flat shapes and type, where a lossy edge shows as a
    # grey halo against the ground the artwork is meant to disappear into.
    image.save(path, "WEBP", lossless=True, method=6, exact=True)
    print(f"{path.relative_to(ROOT)}  {image.width}×{image.height}  {path.stat().st_size // 1024} KB")


def panel(size: tuple[int, int], art: Image.Image, scale: float, rule: bool = False) -> Image.Image:
    """The light artwork centred on an ink panel, for icons and the link card."""
    canvas = Image.new("RGB", size, INK)
    width = round(size[0] * scale)
    height = round(art.height * width / art.width)
    if height > size[1] * scale:
        height = round(size[1] * scale)
        width = round(art.width * height / art.height)
    resized = art.resize((width, height), Image.LANCZOS)
    canvas.paste(resized, ((size[0] - width) // 2, (size[1] - height) // 2), resized)
    if rule:
        # One red hairline across the foot, the same accent the site uses.
        bar = Image.new("RGB", (size[0], max(2, size[1] // 105)), (193, 0, 22))
        canvas.paste(bar, (0, size[1] - bar.height))
    return canvas


def main() -> None:
    light = keyed(Image.open(BRAND / "magma-on-black.png"), "black")
    dark = keyed(Image.open(BRAND / "magma-on-white.png"), "white")

    lockup_light = trimmed(light)
    lockup_dark = trimmed(dark)
    mark_light = trimmed(light.crop((0, 0, light.width, SPLIT_Y)))
    mark_dark = trimmed(dark.crop((0, 0, dark.width, SPLIT_Y)))

    write_webp(lockup_light, "lockup-light.webp")
    write_webp(lockup_dark, "lockup-dark.webp")
    # The header draws the mark at 44px, so 280 covers it on a 3× screen with
    # room to spare; the lockups stay native because the hero runs them large.
    write_webp(mark_light, "mark-light.webp", cap=280)
    write_webp(mark_dark, "mark-dark.webp", cap=280)

    # Favicon and touch icon are drawn on ink rather than left transparent: a
    # white mark on a transparent ground disappears into a light tab strip.
    icon = panel((512, 512), mark_light, 0.66)
    icon.save(PUBLIC / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    icon.resize((180, 180), Image.LANCZOS).save(PUBLIC / "apple-touch-icon.png", optimize=True)

    panel((1200, 630), lockup_light, 0.5, rule=True).save(
        PUBLIC / "link-card.png", optimize=True
    )

    for name in ("favicon.ico", "apple-touch-icon.png", "link-card.png"):
        path = PUBLIC / name
        print(f"{path.relative_to(ROOT)}  {path.stat().st_size // 1024} KB")


if __name__ == "__main__":
    main()
