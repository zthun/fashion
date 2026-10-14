# Device

[Back to Fashion Tailor](../../README.md)

Define responsive breakpoints and resolve values for different device sizes.

## Exports

| Export            | Description                                                                             |
| ----------------- | --------------------------------------------------------------------------------------- |
| `ZFashionDevice`  | Generates max-width media queries from a configurable breakpoint chart.                 |
| `IZFashionDevice` | Contract for the break(size) method.                                                    |
| `ZDeviceValues`   | Resolves a scalar or breakpoint-specific values into all five sizes.                    |
| `IZDeviceValues`  | Breakpoint values with a required xl default and optional lg, md, sm, and xs overrides. |
| `ZDeviceValue`    | Type accepting a scalar value or an IZDeviceValues object.                              |
| `isDeviceValues`  | Checks whether a value has its own xl property.                                         |

`ZDeviceValues` fills missing values from the next larger size: `lg` falls back
to `xl`, `md` to `lg`, and so on. A scalar applies to every size; a nullish
scalar uses the constructor's fallback.

The default breakpoints are `600px` for `xs`, `900px` for `sm`, `1200px` for
`md`, and `1536px` for `lg`. The `xl` entry is the string `Infinity`, so use
`xl` as the base value for your styles and the smaller sizes for media queries.
Customize the `breakpoints` chart to change the generated queries.

## Usage

```ts
import {
  ZDeviceValues,
  ZFashionDevice,
  ZSizeFixed,
  isDeviceValues,
} from "@zthun/fashion-tailor";

const widths = new ZDeviceValues(
  { xl: "50rem", md: "30rem", xs: "100%" },
  "auto",
);
console.log(widths.lg); // "50rem"
console.log(widths.sm); // "30rem"
console.log(widths.xs); // "100%"
console.log(isDeviceValues({ xl: "50rem" })); // true

const device = new ZFashionDevice();
console.log(device.break(ZSizeFixed.Small));
// "@media only screen and (max-width: 900px)"
```
