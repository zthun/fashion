# Link

[Back to Fashion Boutique](../../README.md)

Display a themed anchor with a text or React node label.

## Exports

| Export           | Description                                       |
| ---------------- | ------------------------------------------------- |
| `ZLink / IZLink` | Anchor with href, label, fashion, and DOM events. |

Use `label` for the link content. For routes under `ZRouter`, use hash hrefs
such as `#/projects`.

## Usage

```tsx
import { ZLink } from "@zthun/fashion-boutique";

export function Navigation() {
  return <ZLink href="#/projects" label="View projects" />;
}
```
