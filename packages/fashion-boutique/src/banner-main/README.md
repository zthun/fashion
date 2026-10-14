# Banner Main

[Back to Fashion Boutique](../../README.md)

Compose a themed application shell with a title banner and padded main content.

## Exports

| Export         | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| `ZBannerMain`  | Combines ZStyled, ZBanner, ZContentTitle, and a main region. |
| `IZBannerMain` | Children and TitleProps for the page header.                 |

`TitleProps` accepts headings, an avatar, and prefix or suffix content. The
shell applies global body styling through `ZStyled`.

## Usage

```tsx
import { ZBannerMain, ZParagraph } from "@zthun/fashion-boutique";

export function App() {
  return (
    <ZBannerMain
      TitleProps={{ heading: "Dashboard", subHeading: "Your daily overview" }}
    >
      <ZParagraph>Welcome back.</ZParagraph>
    </ZBannerMain>
  );
}
```
