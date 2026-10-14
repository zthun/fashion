# Breadcrumbs Outlet

[Back to Fashion Boutique](../../README.md)

Display breadcrumbs above the content of a nested route.

## Exports

| Export                | Description                                     |
| --------------------- | ----------------------------------------------- |
| `ZBreadcrumbsOutlet`  | Combines ZBreadcrumbsLocation with ZOutlet.     |
| `IZBreadcrumbsOutlet` | Props including breadcrumbsProps for the trail. |

Use this component as a parent route element. Its outlet renders the matching
child route.

## Usage

```tsx
import {
  ZBreadcrumbsOutlet,
  ZRoute,
  ZRouteMap,
  ZRouter,
} from "@zthun/fashion-boutique";

export function App() {
  return (
    <ZRouter>
      <ZRouteMap>
        <ZRoute
          path="/projects"
          element={
            <ZBreadcrumbsOutlet breadcrumbsProps={{ home: { name: "Home" } }} />
          }
        >
          <ZRoute index element={<p>Projects</p>} />
          <ZRoute path=":id" element={<p>Project details</p>} />
        </ZRoute>
      </ZRouteMap>
    </ZRouter>
  );
}
```
