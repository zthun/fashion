# Theme

[Back to Fashion Theme](../../README.md)

Group component color schemes into a named application theme.

## Exports

| Export                          | Description                                                  |
| ------------------------------- | ------------------------------------------------------------ |
| `ZFashionThemeBuilder`          | Builder with setters for named theme color schemes.          |
| `IZFashionTheme`                | Named theme containing every standard fashion.               |
| `ZFashionName / ZFashionRecord` | Union of fashion names and a record mapping them to schemes. |
| `ZFashionPriority`              | Names for primary, secondary, and tertiary schemes.          |
| `ZFashionSeverity`              | Names for success, warning, error, and info schemes.         |
| `ZFashionArea`                  | Names for body, surface, and component schemes.              |
| `ZFashionContrast`              | Names for dark, light, and opposite schemes.                 |
| `ZFashionIntrinsic`             | Names for inherit and transparent schemes.                   |

The builder starts with a theme named `Default`. Its priority, severity, area,
and contrast entries all use the baseline white-and-black fashion; the enum
names do not assign distinct colors. Inherit and transparent entries use their
special schemes.

Customize an entry with its matching builder method, such as `primary`,
`success`, or `body`. `copy(theme)` deep-copies an existing theme into the
builder. `build()` returns a deep copy with the top-level object frozen; nested
fashion objects are not frozen.

## Usage

```ts
import {
  black,
  hex,
  white,
  ZFashionBuilder,
  ZFashionPriority,
  ZFashionThemeBuilder,
} from "@zthun/fashion-theme";

const primary = new ZFashionBuilder()
  .name("Ocean")
  .idle({ foreground: hex(0x0066cc), contrast: white() })
  .build();

const body = new ZFashionBuilder()
  .name("Page")
  .idle({ foreground: white(), background: white(), contrast: black() })
  .build();

const theme = new ZFashionThemeBuilder()
  .name("Ocean theme")
  .primary(primary)
  .body(body)
  .build();

console.log(theme.name); // "Ocean theme"
console.log(theme[ZFashionPriority.Primary].name); // "Ocean"

const variant = new ZFashionThemeBuilder()
  .copy(theme)
  .name("Ocean variant")
  .build();
```
