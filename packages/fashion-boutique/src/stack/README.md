# Stack

[Back to Fashion Boutique](../../README.md)

Arrange content using Flexbox with configurable direction, gaps, and alignment.

## Exports

| Export             | Description                                                                 |
| ------------------ | --------------------------------------------------------------------------- |
| `ZStack / IZStack` | Flex container with orientation, alignment, wrapping, and responsive sizes. |
| `ZFlex / IZFlex`   | Flex item controlling basis, grow, and shrink.                              |

A stack defaults to vertical orientation. Use `ZOrientation.Horizontal` for a
row and `ZFlex` to distribute available space.

## Usage

```tsx
import { ZButton, ZFlex, ZStack } from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZOrientation } from "@zthun/helpful-fn";

export function Toolbar() {
  return (
    <ZStack
      orientation={ZOrientation.Horizontal}
      gap={ZSizeFixed.Small}
      align={{ items: "center" }}
    >
      <ZFlex grow={1}>Document title</ZFlex>
      <ZButton label="Save" />
    </ZStack>
  );
}
```
