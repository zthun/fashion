import type { ZMutable, ZRequiredPick } from "@zthun/helpful-fn";

import { black, white } from "../color/rgb.mjs";
import type { IZFashionState } from "./fashion-state.mjs";
import { ZFashionStateBuilder } from "./fashion-state.mjs";

/**
 * Represents a set of colors that create a coordinated fashion grouping.
 */
export interface IZFashion {
  /**
   * Optional name of the fashion.
   */
  readonly name?: string;

  /**
   * Idle state.
   */
  readonly idle: ZRequiredPick<IZFashionState, "foreground" | "contrast">;

  /**
   * Color overrides for when a component is hovered.
   */
  readonly hover?: IZFashionState;

  /**
   * Color overrides for when a component is focused.
   */
  readonly focus?: IZFashionState;

  /**
   * Color overrides for when a component is active.
   */
  readonly active?: IZFashionState;
}

/**
 * Represents a builder for a complementary fashion objects.
 *
 * The default fashion is pure black and white.
 */
export class ZFashionBuilder {
  private _fashion: ZMutable<IZFashion> = {
    idle: {
      foreground: white(),
      contrast: black(),
      border: black(),
    },
  };

  /**
   * Sets the name.
   *
   * @param name -
   *        The name.
   *
   * @returns
   *        This object.
   */
  public name(name: string): this {
    this._fashion.name = name;
    return this;
  }

  /**
   * Removes everything but idle foreground and contrast, and the fashion name.
   *
   * @returns
   *        This object.
   */
  public clear() {
    delete this._fashion.active;
    delete this._fashion.focus;
    delete this._fashion.hover;
    delete this._fashion.idle.background;
    delete this._fashion.idle.border;
    return this;
  }

  /**
   * Sets the idle state.
   *
   * Note that main and contrast will be fully held and, if not set in
   * the state, will be ignored.
   *
   * @param state -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public idle(state: IZFashionState): this {
    this._fashion.idle = Object.assign({}, this._fashion.idle, state);
    return this;
  }

  /**
   * Sets the focus state.
   *
   * @param state -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public focus(state: IZFashionState): this {
    this._fashion.focus = { ...state };
    return this;
  }

  /**
   * Sets the hover state.
   *
   * @param state -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public hover(state: IZFashionState): this {
    this._fashion.hover = { ...state };
    return this;
  }

  /**
   * Sets the active state.
   *
   * @param state -
   *        The fashion overrides.
   *
   * @returns
   *        This object.
   */
  public active(state: IZFashionState): this {
    this._fashion.active = { ...state };
    return this;
  }

  /**
   * Builds the transparent fashion.
   *
   * @returns -
   *        This object.
   */
  public transparent(): this {
    return this.clear()
      .name("Transparent")
      .idle(new ZFashionStateBuilder().transparent().build());
  }

  /**
   * Builds the inherit fashion.
   *
   * @returns -
   *        This object.
   */
  public inherit(): this {
    return this.clear()
      .name("Inherit")
      .idle(new ZFashionStateBuilder().inherit().build());
  }

  /**
   * Clones another fashion complements object into this builder object.
   *
   * @param other -
   *        The complements object to copy.
   *
   * @returns
   *        This object.
   */
  public copy(other: IZFashion): this {
    this._fashion = JSON.parse(JSON.stringify(other));
    return this;
  }

  /**
   * Builds the complementary object.
   *
   * @returns
   *        The built complementary object.
   */
  public build(): IZFashion {
    return structuredClone(this._fashion);
  }
}
