# Boolean

[Back to Fashion Boutique](../../README.md)

Edit boolean values with a checkbox or switch.

## Exports

| Export             | Description                                                           |
| ------------------ | --------------------------------------------------------------------- |
| `ZBooleanCheckbox` | Checkbox supporting true, false, and null for an indeterminate value. |
| `ZBooleanSwitch`   | Switch for true or false values.                                      |
| `IZBoolean`        | Shared value, label, disabled, required, and fashion props.           |

Use `value` and `onValueChange` to control the value. An indeterminate checkbox
becomes checked when activated.

## Usage

```tsx
import { ZBooleanCheckbox, ZBooleanSwitch } from "@zthun/fashion-boutique";
import { useState } from "react";

export function Preferences() {
  const [accepted, setAccepted] = useState<boolean | null>(null);
  const [enabled, setEnabled] = useState(false);
  return (
    <>
      <ZBooleanCheckbox
        label="Accept terms"
        value={accepted}
        onValueChange={setAccepted}
      />
      <ZBooleanSwitch
        label="Notifications"
        value={enabled}
        onValueChange={setEnabled}
      />
    </>
  );
}
```
