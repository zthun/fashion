# Box

[Back to Fashion Boutique](../../README.md)

Group content with themed borders, padding, margins, and responsive maximum
widths.

## Exports

| Export  | Description                                                           |
| ------- | --------------------------------------------------------------------- |
| `ZBox`  | Configurable block container.                                         |
| `IZBox` | Props for spacing, borders, colors, alignment, width, and DOM events. |

`padding` and `margin` accept a single size or individual sides. `interactive`
enables focus and interaction colors.

## Usage

```tsx
import { ZBox } from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";

export function Panel() {
  return (
    <ZBox
      padding={ZSizeFixed.Small}
      margin={{ bottom: ZSizeFixed.Medium }}
      border={{ width: ZSizeFixed.ExtraSmall, radius: ZSizeFixed.Small }}
    >
      Panel content
    </ZBox>
  );
}
```
