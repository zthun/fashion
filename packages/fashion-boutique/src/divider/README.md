# Divider

[Back to Fashion Boutique](../../README.md)

Separate sections with a horizontal rule styled from the current theme.

## Exports

| Export      | Description                  |
| ----------- | ---------------------------- |
| `ZDivider`  | Themed horizontal divider.   |
| `IZDivider` | className and compact props. |

`compact` removes the divider's surrounding spacing.

## Usage

```tsx
import { ZDivider } from "@zthun/fashion-boutique";

export function Sections() {
  return (
    <>
      <p>First section</p>
      <ZDivider />
      <p>Second section</p>
    </>
  );
}
```
