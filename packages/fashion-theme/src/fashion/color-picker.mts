import type { ZRequiredDeep } from "@zthun/helpful-fn";
import { firstDefined } from "@zthun/helpful-fn";
import type { IZFashionState } from "./fashion-state.mjs";
import type { IZFashion } from "./fashion.mjs";

/**
 * Represents a helper fashion that retrieves rules based on a set of requirements.
 *
 * A color picker will return a color for every state and part, with idle
 * being the fallback for everything.
 */
export class ZColorPicker implements ZRequiredDeep<Omit<IZFashion, "name">> {
  public constructor(public fashion: IZFashion) {}

  public get idle() {
    const { fashion } = this;
    return {
      get foreground() {
        return fashion.idle.foreground;
      },
      get contrast() {
        return fashion.idle.contrast;
      },
      get background() {
        return firstDefined(this.foreground, fashion.idle.background);
      },
      get border() {
        return firstDefined(this.foreground, fashion.idle.border);
      },
    };
  }

  public get hover() {
    return this._getStateWithFallbackToIdle(this.fashion.hover);
  }

  public get focus() {
    return this._getStateWithFallbackToIdle(this.fashion.focus);
  }

  public get active() {
    return this._getStateWithFallbackToIdle(this.fashion.active);
  }

  private _getStateWithFallbackToIdle(state?: IZFashionState) {
    const { idle } = this;

    return {
      get foreground() {
        return firstDefined(idle.foreground, state?.foreground);
      },
      get background() {
        return firstDefined(
          idle.background,
          state?.background,
          state?.foreground,
        );
      },
      get contrast() {
        return firstDefined(idle.contrast, state?.contrast);
      },
      get border() {
        return firstDefined(idle.border, state?.border, state?.foreground);
      },
    };
  }
}
