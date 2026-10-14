# Icon

[Back to Fashion Boutique](../../README.md)

Render Font Awesome or Material icons with themed colors and responsive sizing.

## Exports

| Export                                             | Description                                                  |
| -------------------------------------------------- | ------------------------------------------------------------ |
| `ZIconFontAwesome / IZIconFontAwesome`             | Font Awesome icon with family, style, and animation options. |
| `ZIconMaterial`                                    | Material icon rendered by name.                              |
| `IZIcon`                                           | Common icon props.                                           |
| `useIconStyles / useIconProvider`                  | Shared styles and stylesheet loading.                        |
| `ZIconFontAwesomeProvider / ZIconMaterialProvider` | Provider stylesheet URLs.                                    |
| `ZIconFontAwesomeVendor / ZIconMaterialVendor`     | Vendor identifiers.                                          |

The components load their provider stylesheet into the document. Names must
match the selected icon provider. `width` controls icon size.

## Usage

```tsx
import { ZIconFontAwesome, ZIconMaterial } from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";

export function Icons() {
  return (
    <>
      <ZIconFontAwesome name="check" width={ZSizeFixed.Small} />
      <ZIconMaterial name="home" width={ZSizeFixed.Medium} />
    </>
  );
}
```
