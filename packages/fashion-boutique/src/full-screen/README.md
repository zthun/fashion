# Full Screen

[Back to Fashion Boutique](../../README.md)

Fill the containing positioned element with a padded content region.

## Exports

| Export        | Description                                    |
| ------------- | ---------------------------------------------- |
| `ZFullScreen` | Absolutely positioned container with inset: 0. |

The component uses absolute positioning rather than the browser Fullscreen API.
Place it in a positioned container with an explicit height.

## Usage

```tsx
import { ZFullScreen } from "@zthun/fashion-boutique";

export function Workspace() {
  return (
    <div style={{ position: "relative", height: "100vh" }}>
      <ZFullScreen>Workspace content</ZFullScreen>
    </div>
  );
}
```
