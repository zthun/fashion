# List

[Back to Fashion Boutique](../../README.md)

Display a themed list with optional interactive or highlighted items.

## Exports

| Export                   | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `ZList / IZList`         | List container with theme and compact spacing.                 |
| `ZListItem / IZListItem` | Item with interaction, highlight, cursor, and DOM event props. |

`ZList` provides the color scheme for its items. Use `compact` to reduce spacing
and `interactive` for interactive styling.

## Usage

```tsx
import { ZList, ZListItem } from "@zthun/fashion-boutique";
import { useState } from "react";

export function Menu() {
  const [selected, setSelected] = useState("Overview");
  return (
    <ZList>
      {["Overview", "Settings"].map((label) => (
        <ZListItem
          key={label}
          interactive
          highlight={selected === label}
          onClick={() => setSelected(label)}
        >
          {label}
        </ZListItem>
      ))}
    </ZList>
  );
}
```
