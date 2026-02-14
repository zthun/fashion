import type { ZColor } from "../color/color.mjs";
import { transparent } from "../color/rgb.mjs";

/**
 * State object for a fashion.
 */
export interface IZFashionState {
  /**
   * Foreground color.
   *
   * This color should be flat and can be used for
   * backgrounds and text.
   *
   * Background supports more variance on what
   * backgrounds can be, including images, but this
   * color represents the fashion itself and all other
   * states revolve around the relationship to this color.
   */
  foreground?: ZColor;

  /**
   * Optional background color.
   *
   * This color supports gradients and images but should only
   * be used for things that support these kinds of css
   * values.
   *
   * Falls back to foreground if not set.
   */
  background?: ZColor;

  /**
   * A color that can be placed on top of the foreground
   * color and still be visible to the human eye.
   *
   * Should not have a fallback.
   */
  contrast?: ZColor;

  /**
   * Border color when a component adds a border stroke.
   *
   * This only specifies the color of the border, not the
   * width and style.
   *
   * Falls back to foreground if not set.
   */
  border?: ZColor;
}

/**
 * Represents a builder for a IZFashionState object.
 */
export class ZFashionStateBuilder {
  private _state: IZFashionState = {};

  /**
   * Sets the foreground (main) color.
   *
   * @param color -
   *        The color to set.
   *
   * @returns
   *        This object.
   */
  public foreground(color?: ZColor) {
    this._state.foreground = color;
    return this;
  }

  /**
   * Sets the background color.
   *
   * @param color -
   *        The color to set.
   *
   * @returns
   *        This object.
   */
  public background(color?: ZColor) {
    this._state.background = color;
    return this;
  }

  /**
   * Sets the contrast color.
   *
   * @param color -
   *        The color to set.
   *
   * @returns
   *        This object.
   */
  public contrast(color?: ZColor) {
    this._state.contrast = color;
    return this;
  }

  /**
   * Sets the border color.
   *
   * @param color -
   *        The color to set.
   *
   * @returns
   *        This object.
   */
  public border(color?: ZColor) {
    this._state.border = color;
    return this;
  }

  /**
   * Removes all states and sets the foreground and contrast to inherit.
   *
   * @returns
   *        This object.
   */
  public inherit() {
    return this.foreground("inherit").contrast("inherit").border().background();
  }

  /**
   * Same as {@link inherit} but sets the foreground to transparent.
   *
   * @returns
   *        This object.
   */
  public transparent() {
    return this.inherit().foreground(transparent());
  }

  /**
   * Returns a deep copy of the fashion state.
   *
   * @returns
   *        A deep copy of the state.
   */
  public build(): IZFashionState {
    return structuredClone(this._state);
  }
}
