# Breadcrumbs

[Back to Fashion Boutique](../../README.md)

Build a breadcrumb trail from the current router pathname.

## Exports

| Export                  | Description                                          |
| ----------------------- | ---------------------------------------------------- |
| `ZBreadcrumbsLocation`  | Splits the current pathname into linked segments.    |
| `IZBreadcrumbsLocation` | Props including an optional home entry.              |
| `IZBreadcrumbs`         | Shared breadcrumb props and onPathSelected callback. |

Render inside a router. Links use hash paths; `onPathSelected` receives the
selected href, including `#`.

## Usage

```tsx
import { ZBreadcrumbsLocation, ZRouter } from "@zthun/fashion-boutique";

export function App() {
  return (
    <ZRouter>
      <ZBreadcrumbsLocation home={{ name: "Home", path: "/" }} />
    </ZRouter>
  );
}
```
