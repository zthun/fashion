import type { IZComponentDisabled } from "../component/component-disabled.mjs";
import type { IZComponentFashion } from "../component/component-fashion.mjs";
import type { IZComponentLabel } from "../component/component-label.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentRange } from "../component/component-range.mjs";
import type { IZComponentRequired } from "../component/component-required.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentValue } from "../component/component-value.mjs";

/**
 * Represents a component that lets the user enter or select a number.
 */
export interface IZNumber<T = number>
  extends
    IZComponentValue<T>,
    IZComponentDisabled,
    IZComponentFashion,
    IZComponentRange<number>,
    IZComponentName,
    IZComponentLabel,
    IZComponentRequired,
    IZComponentStyle {
  step?: number;
}
