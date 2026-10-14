# Button

[Back to Fashion Boutique](../../README.md)

Trigger an action with a themed button containing a label and optional avatar.

## Exports

| Export     | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| `ZButton`  | Button with outline, borderless, compact, and disabled options. |
| `IZButton` | Button props including native button DOM events.                |

Pass content through `label`. The default type is `button`; use `type="submit"`
or `type="reset"` inside a form.

## Usage

```tsx
import { ZButton } from "@zthun/fashion-boutique";
import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <ZButton
      label={`Clicked ${count} times`}
      onClick={() => setCount(count + 1)}
    />
  );
}
```
