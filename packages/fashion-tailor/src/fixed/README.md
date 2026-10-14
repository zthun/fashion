# Fixed Sizes

[Back to Fashion Tailor](../../README.md)

Map fixed size presets to numeric scales and CSS dimensions.

## Exports

| Export                           | Description                                                                                    |
| -------------------------------- | ---------------------------------------------------------------------------------------------- |
| `ZSizeFixed`                     | Enum with ExtraSmall = "xs", Small = "sm", Medium = "md", Large = "lg", and ExtraLarge = "xl". |
| `ZSizeChartFixed`                | Record mapping each fixed size to a value.                                                     |
| `createSizeChartFixedArithmetic` | Adds an increment at each size, starting at xs.                                                |
| `createSizeChartFixedGeometric`  | Multiplies by a ratio at each size, starting at xs.                                            |
| `createSizeChartFixedFibonacci`  | Uses the sum of the previous two values for each successive size.                              |
| `createSizeChartFixedCss`        | Appends rem, px, or em units to a numeric chart.                                               |

Arithmetic charts take `(increment, xs)`; geometric charts take `(ratio, xs)`.
Fibonacci charts take `(xs, sm)`, defaulting to `1` and `2`. Each function
returns a new chart with all five size keys.

## Usage

```ts
import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartFixedFibonacci,
  createSizeChartFixedGeometric,
  ZSizeFixed,
} from "@zthun/fashion-tailor";

const arithmetic = createSizeChartFixedArithmetic(4, 8);
const geometric = createSizeChartFixedGeometric(2, 1);
const fibonacci = createSizeChartFixedFibonacci();
const spacing = createSizeChartFixedCss(arithmetic, "px");

console.log(arithmetic[ZSizeFixed.Medium]); // 16
console.log(geometric[ZSizeFixed.Large]); // 8
console.log(fibonacci[ZSizeFixed.ExtraLarge]); // 8
console.log(spacing[ZSizeFixed.Small]); // "12px"
```
