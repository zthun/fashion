import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZDataPoint } from "./data-point.mjs";

export interface IZChart<TPoint = IZDataPoint[]>
  extends IZComponentName, IZComponentStyle {
  points: TPoint;
}
