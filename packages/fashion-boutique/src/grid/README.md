# Grid

[Back to Fashion Boutique](../../README.md)

Arrange content using CSS Grid, responsive spans, or a twelve-column newspaper
layout.

## Exports

| Export                               | Description                                             |
| ------------------------------------ | ------------------------------------------------------- |
| `ZGrid / IZGrid`                     | Grid container with columns, rows, gaps, and alignment. |
| `ZGridSpan / IZGridSpan`             | Positions content at grid row and column boundaries.    |
| `ZNewspaper / IZNewspaper`           | Twelve-column layout with an inclusive column range.    |
| `ZNewspaperColumn / ZNewspaperRange` | Types for newspaper column numbers and ranges.          |

`columns` and `gap` can vary by device using an object with an `xl` default and
smaller breakpoint overrides. Newspaper ranges use column numbers from 1 to 12.

## Usage

```tsx
import { ZGrid, ZGridSpan, ZNewspaper } from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";

export function Layout() {
  return (
    <>
      <ZGrid columns={{ xl: "1fr 1fr", xs: "1fr" }} gap={ZSizeFixed.Small}>
        <div>First column</div>
        <div>Second column</div>
        <ZGridSpan columnStart={1} columnEnd={-1}>
          Full-width footer
        </ZGridSpan>
      </ZGrid>
      <ZNewspaper range={{ xl: [3, 10], xs: [1, 12] }}>
        Article content
      </ZNewspaper>
    </>
  );
}
```
