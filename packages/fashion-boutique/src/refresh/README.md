# Refresh

[Back to Fashion Boutique](../../README.md)

Request a fresh retrieval by rebuilding the current data request.

## Exports

| Export                 | Description                                                          |
| ---------------------- | -------------------------------------------------------------------- |
| `ZRefresh / IZRefresh` | Refresh button with data request state and customizable ButtonProps. |

The component emits a newly built request with the current settings. It does not
retrieve data itself; pass the updated request to your data view.

## Usage

```tsx
import { ZGridView, ZRefresh } from "@zthun/fashion-boutique";
import { ZDataRequestBuilder, ZDataSourceStatic } from "@zthun/helpful-query";
import { useState } from "react";

const source = new ZDataSourceStatic(["Alpha", "Beta"]);
export function RefreshableResults() {
  const [request, setRequest] = useState(() =>
    new ZDataRequestBuilder().build(),
  );
  return (
    <>
      <ZRefresh
        value={request}
        onValueChange={setRequest}
        ButtonProps={{ label: "Refresh" }}
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
