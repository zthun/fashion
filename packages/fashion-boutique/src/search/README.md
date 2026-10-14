# Search

[Back to Fashion Boutique](../../README.md)

Update a data request with a search string and return to its first page.

## Exports

| Export               | Description                           |
| -------------------- | ------------------------------------- |
| `ZSearch / IZSearch` | Search input with data request state. |

Search changes commit through the underlying text input on blur or Enter. The
new request preserves other settings and sets the page to 1.

## Usage

```tsx
import { ZGridView, ZSearch } from "@zthun/fashion-boutique";
import { ZDataRequestBuilder, ZDataSourceStatic } from "@zthun/helpful-query";
import { useState } from "react";

const source = new ZDataSourceStatic(["Alpha", "Beta", "Gamma"]);
export function SearchableResults() {
  const [request, setRequest] = useState(() =>
    new ZDataRequestBuilder().build(),
  );
  return (
    <>
      <ZSearch
        label="Search results"
        value={request}
        onValueChange={setRequest}
      />
      <ZGridView
        dataSource={source}
        value={request}
        renderItem={(item) => <p key={item}>{item}</p>}
      />
    </>
  );
}
```
