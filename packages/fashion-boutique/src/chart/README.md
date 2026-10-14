# Chart

[Back to Fashion Boutique](../../README.md)

Display progress as a portion of a total using a named data point.

## Exports

| Export                      | Description                                                       |
| --------------------------- | ----------------------------------------------------------------- |
| `ZChartProgress`            | Progress bar displaying x out of y.                               |
| `ZDataPointBuilder`         | Builds a point with coordinates, a name, and an optional fashion. |
| `IZDataPoint`               | Data point with x, y, name, and fashion.                          |
| `IZChart / IZChartProgress` | Chart and progress bar props.                                     |

Despite its plural name, `points` accepts one point in `ZChartProgress`. Use a
positive `y` total; the displayed percentage is `x / y * 100`.

## Usage

```tsx
import { ZChartProgress, ZDataPointBuilder } from "@zthun/fashion-boutique";

const progress = new ZDataPointBuilder(3, 10).name("Tasks completed").build();
export function TaskProgress() {
  return <ZChartProgress points={progress} />;
}
```
