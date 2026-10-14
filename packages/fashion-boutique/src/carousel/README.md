# Carousel

[Back to Fashion Boutique](../../README.md)

Show one item at a time with forward and reverse navigation.

## Exports

| Export       | Description                                                         |
| ------------ | ------------------------------------------------------------------- |
| `ZCarousel`  | Carousel that renders content at the current index.                 |
| `IZCarousel` | Props including count, renderAtIndex, orientation, and index state. |

Indices start at zero. Navigation wraps at either end. `renderEmpty` supplies
content when `count` is zero; `ForwardProps` and `ReverseProps` customize the
buttons.

## Usage

```tsx
import { ZCarousel } from "@zthun/fashion-boutique";

const slides = ["First slide", "Second slide", "Third slide"];
export function Slideshow() {
  return (
    <ZCarousel
      count={slides.length}
      renderAtIndex={(index) => <p>{slides[index]}</p>}
      renderEmpty={() => <p>No slides.</p>}
    />
  );
}
```
