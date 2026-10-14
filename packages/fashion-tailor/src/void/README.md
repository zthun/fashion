# Void Sizes

[Back to Fashion Tailor](../../README.md)

Represent the absence of size and convert it to a zero value.

## Exports

| Export                    | Description                                         |
| ------------------------- | --------------------------------------------------- |
| `ZSizeVoid`               | Enum with None = "none".                            |
| `ZSizeChartVoid`          | Record mapping the None size to a value.            |
| `createSizeChartVoidCss`  | Creates a chart mapping None to the CSS string "0". |
| `createSizeChartVoidZero` | Creates a chart mapping None to the number 0.       |

Use the CSS chart for style values and the numeric chart for calculations.
Combine these charts with fixed or varied charts to support additional size
presets.

## Usage

```ts
import {
  createSizeChartVoidCss,
  createSizeChartVoidZero,
  ZSizeVoid,
} from "@zthun/fashion-tailor";

const cssSizes = createSizeChartVoidCss();
const numericSizes = createSizeChartVoidZero();
console.log(cssSizes[ZSizeVoid.None]); // "0"
console.log(numericSizes[ZSizeVoid.None]); // 0
```
