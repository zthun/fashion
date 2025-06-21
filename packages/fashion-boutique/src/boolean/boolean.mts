import type { IZComponentDisabled } from "../component/component-disabled.mjs";
import type { IZComponentFashion } from "../component/component-fashion.mjs";
import type { IZComponentLabel } from "../component/component-label.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentRequired } from "../component/component-required.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentValue } from "../component/component-value.mjs";

export interface IZBoolean<T>
  extends IZComponentDisabled,
    IZComponentValue<T>,
    IZComponentStyle,
    IZComponentLabel,
    IZComponentName,
    IZComponentRequired,
    IZComponentFashion {}
