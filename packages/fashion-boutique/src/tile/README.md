# Tile

[Back to Fashion Boutique](../../README.md)

Display an interactive themed box for a selectable action or item.

## Exports

| Export           | Description                             |
| ---------------- | --------------------------------------- |
| `ZTile / IZTile` | Padded box with an onActivate callback. |

`onActivate` runs on click or keyboard activation with Enter or Space.

## Usage

```tsx
import { ZTile } from "@zthun/fashion-boutique";
import { useState } from "react";

export function ProjectTile() {
  const [opened, setOpened] = useState(false);
  return (
    <ZTile onActivate={() => setOpened(true)}>
      {opened ? "Project opened" : "Open project"}
    </ZTile>
  );
}
```
