# Alert

[Back to Fashion Boutique](../../README.md)

Display a themed feedback message with an optional heading and avatar.

## Exports

| Export    | Description                                               |
| --------- | --------------------------------------------------------- |
| `ZAlert`  | Renders a message with the alert role.                    |
| `IZAlert` | Props for the heading, message, avatar, and color scheme. |

The default color scheme is the theme's `error` fashion. Pass `fashion` to use
another severity.

## Usage

```tsx
import { ZAlert, useFashionTheme } from "@zthun/fashion-boutique";

export function SavedNotice() {
  const { success } = useFashionTheme();
  return (
    <ZAlert
      heading="Saved"
      message="Your changes were saved."
      fashion={success}
    />
  );
}
```
