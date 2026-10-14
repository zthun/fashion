# Chip

[Back to Fashion Boutique](../../README.md)

Display a compact themed label with optional prefix and suffix content.

## Exports

| Export   | Description                                             |
| -------- | ------------------------------------------------------- |
| `ZChip`  | Source component with prefix, body, and suffix regions. |
| `IZChip` | Source interface for chip props.                        |

`ZChip` and `IZChip` are not exported from the package root. The example uses a
relative import from within this source directory.

## Usage

```tsx
import { ZChip } from "./chip.js";

export function Status() {
  return <ZChip prefix={<span aria-hidden="true">✓</span>}>Active</ZChip>;
}
```
