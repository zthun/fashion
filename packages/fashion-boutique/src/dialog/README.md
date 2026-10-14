# Dialog

[Back to Fashion Boutique](../../README.md)

Display content in a modal, drawer, or popup backed by the native dialog
element.

## Exports

| Export               | Description                                      |
| -------------------- | ------------------------------------------------ |
| `ZModal / IZModal`   | Centered dialog with configurable dimensions.    |
| `ZDrawer / IZDrawer` | Dialog anchored to a side.                       |
| `ZPopup / IZPopup`   | Dialog positioned relative to an attach element. |

Control visibility with `open` and update it in `onClose`. `persistent` prevents
backdrop and Escape dismissal. Header and footer callbacks render additional
regions. The shared `useDialog` hook and `IZDialog` interface are source-only
exports.

## Usage

```tsx
import { ZButton, ZModal } from "@zthun/fashion-boutique";
import { useState } from "react";

export function Details() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ZButton label="Show details" onClick={() => setOpen(true)} />
      <ZModal
        open={open}
        onClose={() => setOpen(false)}
        renderHeader={() => <h2>Details</h2>}
        renderFooter={() => (
          <ZButton label="Close" onClick={() => setOpen(false)} />
        )}
      >
        <p>Additional information.</p>
      </ZModal>
    </>
  );
}
```
