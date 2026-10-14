# Tailor

[Back to Fashion Tailor](../../README.md)

Convert size presets into CSS spacing, border thickness, and corner rounding.

## Exports

| Export            | Description                                                                        |
| ----------------- | ---------------------------------------------------------------------------------- |
| `ZFashionTailor`  | Provides gap, thickness, and rounding conversions and chart customization methods. |
| `IZFashionTailor` | Contract for the three size conversion methods.                                    |

`gap()` defaults to Medium (`1.5rem`), `thickness()` to ExtraSmall
(`0.0625rem`), and `rounding()` to None (`0`). Fixed sizes use `rem` units; None
maps to `0`. `gap(ZSizeVaried.Default)` returns `auto`, and
`rounding(ZSizeVaried.Full)` returns `50%` with the default chart.

`gapsChart`, `thicknessChart`, and `roundingChart` each return a new tailor with
one custom fixed-size chart. The other charts use their defaults; the methods do
not mutate the original tailor or preserve earlier customizations when chained.
Custom charts also include the standard void and varied mappings.

## Usage

```ts
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  ZFashionTailor,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";

const tailor = new ZFashionTailor();
console.log(tailor.gap(ZSizeFixed.Small)); // "1rem"
console.log(tailor.thickness()); // "0.0625rem"
console.log(tailor.rounding(ZSizeVaried.Full)); // "50%"

const custom = tailor.gapsChart(
  createSizeChartFixedCss(createSizeChartFixedArithmetic(4, 4), "px"),
);
console.log(custom.gap(ZSizeFixed.Medium)); // "12px"
console.log(tailor.gap(ZSizeFixed.Medium)); // "1.5rem"
```
