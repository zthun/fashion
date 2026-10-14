# Color

[Back to Fashion Theme](../../README.md)

Construct CSS colors and calculate brightness, luminance, and contrast from
numeric RGB values.

## Exports

| Export                        | Description                                                                           |
| ----------------------------- | ------------------------------------------------------------------------------------- |
| `ZColor`                      | CSS color type from csstype.                                                          |
| `rgb`                         | Creates an rgba CSS string from red, green, blue, and optional alpha values.          |
| `hsl`                         | Creates an hsla CSS string from hue, saturation, lightness, and optional alpha.       |
| `hex`                         | Converts a numeric RGB color, including a hexadecimal literal, to an rgba CSS string. |
| `black / white / transparent` | Functions returning opaque black, opaque white, or transparent black CSS colors.      |
| `fromRgb / toRgb`             | Convert between RGB channels and a packed numeric color.                              |
| `brighten`                    | Adds an amount to each numeric RGB channel, clamping channels to 0–255.               |
| `luminance`                   | Calculates relative luminance from a numeric RGB color.                               |
| `contrast`                    | Calculates the contrast ratio between two numeric RGB colors.                         |

`rgb` clamps channels to 0–255 and rounds them down. `hsl` clamps saturation and
lightness to 0–100; it retains the supplied hue. Both clamp alpha to 0–1, with a
default of 1.

`hex` returns an `rgba(...)` string, rather than a `#...` string. Numeric
utilities such as `brighten`, `luminance`, and `contrast` accept packed RGB
numbers rather than CSS strings. `fromRgb` packs channels without clamping;
supply integer channels between 0 and 255.

## Usage

```ts
import {
  black,
  brighten,
  contrast,
  fromRgb,
  hex,
  hsl,
  luminance,
  rgb,
  toRgb,
  transparent,
  white,
} from "@zthun/fashion-theme";

const blue = fromRgb(0, 102, 204);
console.log(toRgb(blue)); // [0, 102, 204]
console.log(rgb(0, 102, 204)); // "rgba(0, 102, 204, 1)"
console.log(hex(blue)); // "rgba(0, 102, 204, 1)"
console.log(hsl(210, 100, 40)); // "hsla(210, 100%, 40%, 1)"
console.log(hex(brighten(blue, 20))); // "rgba(20, 122, 224, 1)"
console.log(luminance(0xffffff)); // 1
console.log(contrast(0x000000, 0xffffff)); // 21

const colors = {
  background: black(),
  color: white(),
  borderColor: transparent(),
};
```
