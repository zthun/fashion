# Not Found

[Back to Fashion Boutique](../../README.md)

Show a missing-page message and a button to return home.

## Exports

| Export                   | Description                                       |
| ------------------------ | ------------------------------------------------- |
| `ZNotFound / IZNotFound` | Missing-page view with a configurable home route. |
| `ZSadFace`               | Illustration used by the missing-page view.       |

`ZNotFound` uses router navigation, so render it inside a router. Its `home`
route defaults to `/`.

## Usage

```tsx
import { ZNotFound, ZRoute, ZRouteMap, ZRouter } from "@zthun/fashion-boutique";

export function App() {
  return (
    <ZRouter>
      <ZRouteMap>
        <ZRoute path="/" element={<p>Home</p>} />
        <ZRoute path="*" element={<ZNotFound home="/" />} />
      </ZRouteMap>
    </ZRouter>
  );
}
```
