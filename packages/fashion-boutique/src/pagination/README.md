# Pagination

[Back to Fashion Boutique](../../README.md)

Navigate pages and change page size for a data request.

## Exports

| Export                              | Description                                           |
| ----------------------------------- | ----------------------------------------------------- |
| `ZPagination / IZPagination`        | Paging controls using a data source to count results. |
| `ZPaginationSizesMultiplesOfFive`   | Page sizes: 25, 50, 100, and 200.                     |
| `ZPaginationSizesMultiplesOfTwelve` | Page sizes: 24, 48, 96, and 192.                      |

Use the same `dataSource` and request as your results view. `sizes` configures
page-size choices; `infinity` configures the label for all results.

## Usage

```tsx
import { ZGridView, ZPagination } from "@zthun/fashion-boutique";
import { ZDataRequestBuilder, ZDataSourceStatic } from "@zthun/helpful-query";
import { useState } from "react";

const source = new ZDataSourceStatic(["Alpha", "Beta", "Gamma"]);
export function PagedResults() {
  const [request, setRequest] = useState(() =>
    new ZDataRequestBuilder().build(),
  );
  return (
    <>
      <ZGridView
        dataSource={source}
        value={request}
        renderItem={(item) => <p key={item}>{item}</p>}
      />
      <ZPagination
        dataSource={source}
        value={request}
        onValueChange={setRequest}
      />
    </>
  );
}
```
