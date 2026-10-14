# Bubble

[Back to Fashion Boutique](../../README.md)

Place content inside a circular themed container.

## Exports

| Export     | Description                                                          |
| ---------- | -------------------------------------------------------------------- |
| `ZBubble`  | Circular container with responsive size and optional click handling. |
| `IZBubble` | Props for width, padding, border, fashion, and children.             |

`width` uses fixed size values and can vary by device. Supply `onClick` to
enable interaction.

## Usage

```tsx
import { ZBubble } from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";

export function Avatar() {
  return <ZBubble width={ZSizeFixed.Medium}>AB</ZBubble>;
}
```
