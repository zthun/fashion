# Content Title

[Back to Fashion Boutique](../../README.md)

Arrange a heading, subheading, avatar, and optional surrounding content.

## Exports

| Export           | Description                                                |
| ---------------- | ---------------------------------------------------------- |
| `ZContentTitle`  | Reusable title layout for cards and banners.               |
| `IZContentTitle` | Props for heading, subHeading, avatar, prefix, and suffix. |

Heading and adornment props accept React nodes, allowing buttons or icons
alongside the title.

## Usage

```tsx
import { ZButton, ZContentTitle } from "@zthun/fashion-boutique";

export function PageTitle() {
  return (
    <ZContentTitle
      heading="Projects"
      subHeading="Manage your work"
      suffix={<ZButton label="New project" />}
    />
  );
}
```
