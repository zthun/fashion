# Router

[Back to Fashion Boutique](../../README.md)

Configure hash-based navigation and nested routes.

## Exports

| Export                                  | Description                                                      |
| --------------------------------------- | ---------------------------------------------------------------- |
| `ZRouter`                               | Alias for HashRouter.                                            |
| `ZRoute / ZRouteMap`                    | Aliases for Route and Routes.                                    |
| `ZNavigate / ZOutlet`                   | Redirect and nested route outlet components.                     |
| `useNavigate / useLocation / useParams` | Navigation, location, and route parameter hooks.                 |
| `ZTestRouter / IZRouterProps`           | Low-level router wrapper accepting location and navigator props. |

Render routing hooks and route maps inside a router. `ZRouter` stores paths in
the URL hash, such as `#/settings`.

## Usage

```tsx
import { ZLink, ZRoute, ZRouteMap, ZRouter } from "@zthun/fashion-boutique";

export function App() {
  return (
    <ZRouter>
      <ZLink href="#/settings" label="Settings" />
      <ZRouteMap>
        <ZRoute path="/" element={<p>Home</p>} />
        <ZRoute path="/settings" element={<p>Settings</p>} />
      </ZRouteMap>
    </ZRouter>
  );
}
```
