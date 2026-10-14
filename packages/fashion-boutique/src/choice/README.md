# Choice

[Back to Fashion Boutique](../../README.md)

Choose one or more values from a list of options.

## Exports

| Export                                    | Description                                    |
| ----------------------------------------- | ---------------------------------------------- |
| `ZChoiceSelect`                           | Select control for choosing options.           |
| `ZChoiceToggle`                           | Group of toggle controls for choosing options. |
| `useChoice`                               | Shared selection, lookup, and rendering logic. |
| `IZChoice / IZChoiceOption / IZChoiceApi` | Props, option records, and selection API.      |

`identifier` maps an option to its value and `display` supplies its text. Single
selection emits a value or `null`; multiple selection emits an array or `null`
when cleared.

## Usage

```tsx
import { ZChoiceSelect, ZChoiceToggle } from "@zthun/fashion-boutique";

const sizes = ["Small", "Medium", "Large"];
export function SizeChoices() {
  return (
    <>
      <ZChoiceSelect label="Size" options={sizes} />
      <ZChoiceToggle label="Available sizes" options={sizes} multiple />
    </>
  );
}
```
