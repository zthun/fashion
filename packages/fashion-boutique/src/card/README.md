# Card

[Back to Fashion Boutique](../../README.md)

Display content in a themed surface with an optional title and footer.

## Exports

| Export   | Description                                              |
| -------- | -------------------------------------------------------- |
| `ZCard`  | Surface container with header, body, and footer regions. |
| `IZCard` | Props for TitleProps, footer, dimensions, and children.  |

`TitleProps` configures `ZContentTitle`. Width and height can be responsive size
values.

## Usage

```tsx
import { ZButton, ZCard } from "@zthun/fashion-boutique";

export function ProfileCard() {
  return (
    <ZCard
      TitleProps={{ heading: "Profile", subHeading: "Account details" }}
      footer={<ZButton label="Edit profile" />}
    >
      <p>Alex Morgan</p>
    </ZCard>
  );
}
```
