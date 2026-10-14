# Number

[Back to Fashion Boutique](../../README.md)

Edit a numeric value with text entry, spinner buttons, and arrow keys.

## Exports

| Export         | Description                                      |
| -------------- | ------------------------------------------------ |
| `ZNumberInput` | Numeric editor supporting number or null values. |
| `IZNumber`     | Props for value, limits, step, label, and theme. |

An empty input commits `null`. Spinner and arrow-key changes respect `min`,
`max`, and `step`; typed values are converted to numbers without the same
clamping.

## Usage

```tsx
import { ZNumberInput } from "@zthun/fashion-boutique";
import { useState } from "react";

export function Quantity() {
  const [value, setValue] = useState<number | null>(1);
  return (
    <ZNumberInput
      label="Quantity"
      value={value}
      onValueChange={setValue}
      min={0}
      max={100}
      step={1}
    />
  );
}
```
