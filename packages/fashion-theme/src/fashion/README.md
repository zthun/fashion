# Fashion

[Back to Fashion Theme](../../README.md)

Build coordinated color schemes for idle, hover, focus, and active component
states.

## Exports

| Export                                  | Description                                  |
| --------------------------------------- | -------------------------------------------- |
| `IZFashionState / ZFashionStateBuilder` | State color overrides and their builder.     |
| `IZFashion / ZFashionBuilder`           | Named color scheme and its builder.          |
| `ZColorPicker`                          | Resolves each state's colors with fallbacks. |

A state can define `foreground`, `background`, `contrast`, and `border`.
Foreground is the main color; contrast is the color placed on top of it. An idle
fashion requires foreground and contrast, while other state colors are optional.
The default fashion has white foreground, black contrast, and a black border.

`ZFashionBuilder.idle` merges values into the idle state. `hover`, `focus`, and
`active` each replace that state's overrides. `clear()` removes these
interaction states and the idle background and border while retaining the name,
foreground, and contrast. `inherit()` and `transparent()` create the
corresponding special schemes. Both builders return deep copies from `build()`.

`ZColorPicker` falls back to idle colors when a state has no override. Idle
background and border fall back to idle foreground. For interaction states, a
foreground override also supplies background and border when those values are
absent. Contrast falls back to idle contrast.

## Usage

```ts
import {
  hex,
  white,
  ZColorPicker,
  ZFashionBuilder,
  ZFashionStateBuilder,
} from "@zthun/fashion-theme";

const idle = new ZFashionStateBuilder()
  .foreground(hex(0x0066cc))
  .contrast(white())
  .border(hex(0x004488))
  .build();

const fashion = new ZFashionBuilder()
  .name("Ocean")
  .idle(idle)
  .hover(new ZFashionStateBuilder().foreground(hex(0x0055aa)).build())
  .focus({ border: hex(0x003366) })
  .active({ foreground: hex(0x004488) })
  .build();

const picker = new ZColorPicker(fashion);
console.log(picker.idle.background); // "rgba(0, 102, 204, 1)"
console.log(picker.hover.background); // "rgba(0, 85, 170, 1)"
console.log(picker.hover.contrast); // "rgba(255, 255, 255, 1)"
console.log(picker.focus.border); // "rgba(0, 51, 102, 1)"
```
