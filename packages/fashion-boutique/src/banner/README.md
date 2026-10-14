# Banner

[Back to Fashion Boutique](../../README.md)

Display a themed page banner containing arbitrary content.

## Exports

| Export     | Description                             |
| ---------- | --------------------------------------- |
| `ZBanner`  | Container with the banner role.         |
| `IZBanner` | Children, fashion, and className props. |

Uses the theme's `primary` fashion by default.

## Usage

```tsx
import { ZBanner, ZH1 } from "@zthun/fashion-boutique";

export function Header() {
  return (
    <ZBanner>
      <ZH1 compact>My application</ZH1>
    </ZBanner>
  );
}
```
