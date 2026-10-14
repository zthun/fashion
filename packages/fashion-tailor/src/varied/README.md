# Varied Sizes

[Back to Fashion Tailor](../../README.md)

Describe dimensions that depend on available space or content.

## Exports

| Export                     | Description                                                    |
| -------------------------- | -------------------------------------------------------------- |
| `ZSizeVaried`              | Enum with Default = "default", Fit = "fit", and Full = "full". |
| `ZSizeChartVaried`         | Record mapping each varied size to a value.                    |
| `createSizeChartVariedCss` | Maps Default to auto, Fit to fit-content, and Full to 100%.    |

The CSS chart is useful for width and height declarations. Individual components
or utilities may give a size a different meaning; for example, the default
tailor maps Full rounding to `50%`.

## Usage

```ts
import { createSizeChartVariedCss, ZSizeVaried } from "@zthun/fashion-tailor";

const dimensions = createSizeChartVariedCss();
console.log(dimensions[ZSizeVaried.Default]); // "auto"
console.log(dimensions[ZSizeVaried.Fit]); // "fit-content"
console.log(dimensions[ZSizeVaried.Full]); // "100%"

const style = { width: dimensions[ZSizeVaried.Full] };
```
