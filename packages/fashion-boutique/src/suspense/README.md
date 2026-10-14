# Suspense

[Back to Fashion Boutique](../../README.md)

Show an animated indicator while work is in progress.

## Exports

| Export                                   | Description                      |
| ---------------------------------------- | -------------------------------- |
| `ZSuspenseProgress / IZSuspenseProgress` | Animated horizontal loading bar. |
| `ZSuspenseRotate / IZSuspenseRotate`     | Rotating loading indicator.      |
| `IZSuspense`                             | Shared indicator props.          |

`disabled` hides the indicator. These components display loading state; they do
not suspend rendering like React's Suspense component.

## Usage

```tsx
import { ZSuspenseProgress, ZSuspenseRotate } from "@zthun/fashion-boutique";

export function Loading({ loading }: { loading: boolean }) {
  return (
    <>
      <ZSuspenseProgress disabled={!loading} />
      <ZSuspenseRotate disabled={!loading} />
    </>
  );
}
```
