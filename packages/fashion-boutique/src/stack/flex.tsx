import { cssJoinDefined } from "@zthun/helpful-fn";
import type { Property } from "csstype";

import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";

export interface IZFlex extends IZComponentHierarchy, IZComponentStyle {
  basis?: Property.FlexBasis;
  grow?: Property.FlexGrow;
  shrink?: Property.FlexShrink;
}

export function ZFlex(props: IZFlex) {
  const { basis, children, className, grow, shrink } = props;

  return (
    <div
      className={cssJoinDefined("ZFlex-root", className)}
      style={{ flexBasis: basis, flexGrow: grow, flexShrink: shrink }}
    >
      {children}
    </div>
  );
}
