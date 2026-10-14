# Grid View

[Back to Fashion Boutique](../../README.md)

Retrieve data from a data source and render the results in a grid.

## Exports

| Export                   | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `ZGridView / IZGridView` | Data-driven grid with loading and error feedback. |

`value` is an `IZDataRequest`; `renderItem` renders each retrieved item. Supply
stable keys in the returned elements. `GridProps` configures the layout. The
current implementation uses its built-in error alert even when `renderError` is
supplied.

## Usage

```tsx
import { ZGridView } from "@zthun/fashion-boutique";
import { ZDataSourceStatic } from "@zthun/helpful-query";

const source = new ZDataSourceStatic([
  { id: "a", name: "Alpha" },
  { id: "b", name: "Beta" },
]);
export function Results() {
  return (
    <ZGridView
      dataSource={source}
      heading={<h2>Results</h2>}
      GridProps={{ columns: "1fr 1fr" }}
      renderItem={(item) => <div key={item.id}>{item.name}</div>}
    />
  );
}
```
