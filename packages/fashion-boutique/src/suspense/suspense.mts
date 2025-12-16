import type { IZComponentDisabled } from "../component/component-disabled.mjs";
import type { IZComponentFashion } from "../component/component-fashion.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";

/**
 * Represents properties for a suspense component.
 */
export interface IZSuspense
  extends
    IZComponentStyle,
    IZComponentDisabled,
    IZComponentFashion,
    IZComponentName {}
