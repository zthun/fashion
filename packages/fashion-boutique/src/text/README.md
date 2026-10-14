# Text

[Back to Fashion Boutique](../../README.md)

Edit text with themed single-line and multiline inputs.

## Exports

| Export                                 | Description                                        |
| -------------------------------------- | -------------------------------------------------- |
| `ZTextInput / IZTextInput / ZTextType` | Single-line text or password input.                |
| `ZTextArea / IZTextArea`               | Multiline text input with size-based row counts.   |
| `IZText`                               | Shared value, label, adornment, and control props. |
| `useText / withEnterCommit`            | Draft text state and an Enter commit handler.      |

Text is edited locally and committed through `onValueChange` on blur.
`ZTextInput` also commits on Enter. Use `prefix` and `suffix` for adornments,
and `ZTextType.Password` for passwords.

## Usage

```tsx
import { ZTextArea, ZTextInput } from "@zthun/fashion-boutique";
import { useState } from "react";

export function ProfileFields() {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  return (
    <>
      <ZTextInput
        label="Name"
        value={name}
        onValueChange={setName}
        placeholder="Your name"
      />
      <ZTextArea label="Notes" value={notes} onValueChange={setNotes} />
    </>
  );
}
```
