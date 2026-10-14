# @zthun/fashion-tailor

Sizing utilities for web page elements. The package includes size enums, size
chart generators, spacing helpers, and responsive breakpoints.

`ZFashionTailor` converts sizes into CSS values for gaps, border thickness, and
corner rounding. `ZFashionDevice` generates media queries, and `ZDeviceValues`
resolves values for different device sizes.

## Installation

```sh
# npm
npm install @zthun/fashion-tailor
# Yarn
yarn add @zthun/fashion-tailor
```

## Features

Import the public exports shown in each feature guide from
`@zthun/fashion-tailor`. Type-only exports can be imported with `import type`.

| Feature                          | Description                                                                   |
| -------------------------------- | ----------------------------------------------------------------------------- |
| [device](./src/device/README.md) | Define responsive breakpoints and resolve values for different device sizes.  |
| [fixed](./src/fixed/README.md)   | Map fixed size presets to numeric scales and CSS dimensions.                  |
| [tailor](./src/tailor/README.md) | Convert size presets into CSS spacing, border thickness, and corner rounding. |
| [varied](./src/varied/README.md) | Describe dimensions that depend on available space or content.                |
| [void](./src/void/README.md)     | Represent the absence of size and convert it to a zero value.                 |

## Shared size types

The package also exports these types from `src/size.mts`:

| Type                        | Accepted sizes                                    |
| --------------------------- | ------------------------------------------------- |
| `ZSize`                     | Fixed, varied, or void sizes.                     |
| `ZSizeGap / ZSizeThickness` | Fixed or void sizes.                              |
| `ZSizeMargin`               | Fixed or void sizes, plus `ZSizeVaried.Default`.  |
| `ZSizeRounding`             | Fixed or void sizes, plus `ZSizeVaried.Full`.     |
| `ZSizeChart<T>`             | A record mapping every size to a value of type T. |

```ts
import type { ZSizeMargin, ZSizeRounding } from "@zthun/fashion-tailor";
import { ZFashionTailor, ZSizeVaried } from "@zthun/fashion-tailor";

const margin: ZSizeMargin = ZSizeVaried.Default;
const rounding: ZSizeRounding = ZSizeVaried.Full;
const tailor = new ZFashionTailor();
console.log(tailor.gap(margin)); // "auto"
console.log(tailor.rounding(rounding)); // "50%"
```
