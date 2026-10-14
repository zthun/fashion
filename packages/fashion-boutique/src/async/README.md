# Async Data

[Back to Fashion Boutique](../../README.md)

Render content according to whether asynchronous data is loading, loaded, or
errored.

## Exports

| Export              | Description                                               |
| ------------------- | --------------------------------------------------------- |
| `ZAsyncDataLoading` | Renders its callback while the value is a loading symbol. |
| `ZAsyncDataLoaded`  | Renders its callback with the loaded value.               |
| `ZAsyncDataError`   | Renders its callback with an Error.                       |
| `IZAsyncData`       | Shared value and render callback props.                   |

These components render an existing state; use `useAsyncState` from
`@zthun/helpful-react` to perform the asynchronous work.

## Usage

```tsx
import {
  ZAsyncDataError,
  ZAsyncDataLoaded,
  ZAsyncDataLoading,
} from "@zthun/fashion-boutique";
import { useAsyncState } from "@zthun/helpful-react";

export function Greeting() {
  const [data] = useAsyncState(() => Promise.resolve("Hello!"), []);
  return (
    <>
      <ZAsyncDataLoading value={data}>
        {() => <p>Loading…</p>}
      </ZAsyncDataLoading>
      <ZAsyncDataLoaded value={data}>
        {(message) => <p>{message}</p>}
      </ZAsyncDataLoaded>
      <ZAsyncDataError value={data}>
        {(error) => <p>{error.message}</p>}
      </ZAsyncDataError>
    </>
  );
}
```
