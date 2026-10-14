# Typography

[Back to Fashion Boutique](../../README.md)

Display headings and text with consistent sizes, weights, and theme colors.

## Exports

| Export                                                       | Description                                            |
| ------------------------------------------------------------ | ------------------------------------------------------ |
| `ZH1 / ZH2 / ZH3 / ZH4 / ZH5 / ZH6`                          | Heading presets.                                       |
| `ZParagraph / ZCaption / ZSubtitle / ZButtonText`            | Paragraph, caption, subtitle, and button text presets. |
| `Typography / IZTypography / IZTypographyNamed / FontWeight` | General typography component and prop types.           |
| `useTypographyCss`                                           | Shared typography styles.                              |

`Element` overrides the rendered tag, and `compact` removes spacing. The general
`Typography` component also accepts `size`, `weight`, and `transform`. Caption
and subtitle presets render a `sub` element; button text renders a `div`.

## Usage

```tsx
import { Typography, ZCaption, ZH1, ZParagraph } from "@zthun/fashion-boutique";

export function Article() {
  return (
    <>
      <ZH1>Getting started</ZH1>
      <ZParagraph>A short introduction to the application.</ZParagraph>
      <Typography Element="strong" weight="bold">
        Remember to save your work.
      </Typography>
      <ZCaption>Last updated today</ZCaption>
    </>
  );
}
```
