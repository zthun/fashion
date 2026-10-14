# Component Contracts

[Back to Fashion Boutique](../../README.md)

Compose shared TypeScript prop interfaces for custom components.

## Exports

| Export                                                                                                                    | Description                                               |
| ------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| `IZComponentValue / IZComponentValueReadonly`                                                                             | Editable and read-only value contracts.                   |
| `IZComponentHierarchy / IZComponentStyle`                                                                                 | Children and CSS class props.                             |
| `IZComponentLabel / IZComponentHeading / IZComponentAvatar / IZComponentAdornment`                                        | Label, heading, avatar, and prefix or suffix content.     |
| `IZComponentFashion / IZComponentWidth / IZComponentHeight`                                                               | Color scheme and responsive dimension props.              |
| `IZComponentDisabled / IZComponentRequired / IZComponentLoading`                                                          | Control state flags.                                      |
| `IZComponentDomEvents / IZComponentRef`                                                                                   | DOM events and refs.                                      |
| `IZComponentDataSource / IZComponentRange / IZComponentName / IZComponentSource / IZComponentFooter / IZComponentCompact` | Data, limits, identity, source, footer, and compact mode. |

These interfaces describe props and have no runtime behavior.
`IZComponentOrientation` is defined in this directory but is not exported from
the package root.

## Usage

```tsx
import type {
  IZComponentHierarchy,
  IZComponentStyle,
  IZComponentValue,
} from "@zthun/fashion-boutique";

interface RatingProps
  extends IZComponentHierarchy, IZComponentStyle, IZComponentValue<number> {}

export function Rating({
  value = 0,
  onValueChange,
  className,
  children,
}: RatingProps) {
  return (
    <button className={className} onClick={() => onValueChange?.(value + 1)}>
      {children}: {value}
    </button>
  );
}
```
