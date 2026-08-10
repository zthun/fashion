import type { Ref } from "react";

/**
 * A component that has a ref.
 */
export interface IZComponentRef<T> {
  /**
   * The target ref.
   */
  ref?: Ref<T>;
}
