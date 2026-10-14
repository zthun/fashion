# Image

[Back to Fashion Boutique](../../README.md)

Display an image with size presets and a configurable object fit.

## Exports

| Export          | Description                                  |
| --------------- | -------------------------------------------- |
| `ZImage`        | Image with responsive dimensions.            |
| `IZImageSource` | Props for src, name, fit, width, and height. |

`name` supplies the image's alternative text. The default `fit` is `fill`; use
`contain` or `cover` when appropriate.

## Usage

```tsx
import { ZImage } from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";

export function Logo() {
  return (
    <ZImage
      src="/images/logo.svg"
      name="Company logo"
      fit="contain"
      width={ZSizeFixed.Small}
      height={ZSizeFixed.Small}
    />
  );
}
```
