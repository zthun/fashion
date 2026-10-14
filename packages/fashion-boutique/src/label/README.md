# Label

[Back to Fashion Boutique](../../README.md)

Label a control or arrange a label alongside its content.

## Exports

| Export                 | Description                                       |
| ---------------------- | ------------------------------------------------- |
| `ZLabel / IZLabel`     | Native label with an optional required indicator. |
| `ZLabeled / IZLabeled` | Layout combining label and children.              |

Connect a native label to a control using `htmlFor`. `ZLabeled` supports
horizontal or vertical orientation and prefix or suffix label placement.

## Usage

```tsx
import { ZLabel, ZLabeled } from "@zthun/fashion-boutique";

export function Fields() {
  return (
    <>
      <ZLabel htmlFor="email" required>
        Email
      </ZLabel>
      <input id="email" type="email" />
      <ZLabeled label="Notes" LabelProps={{ htmlFor: "notes" }}>
        <textarea id="notes" />
      </ZLabeled>
    </>
  );
}
```
