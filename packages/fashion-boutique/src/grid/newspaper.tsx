import type { ZDeviceValue } from "@zthun/fashion-tailor";
import { ZDeviceValues, ZSizeVaried } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import { ZGridSpan } from "./grid-span.js";
import type { IZGrid } from "./grid.js";
import { ZGrid } from "./grid.js";

export type ZNewspaperColumn = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type ZNewspaperRange = [ZNewspaperColumn, ZNewspaperColumn];

export interface IZNewspaper extends IZComponentStyle, IZComponentHierarchy {
  GridProps?: Omit<
    IZGrid,
    "columns" | "children" | "className" | "name" | "width" | "height"
  >;
  range?: ZDeviceValue<ZNewspaperRange>;
}

export function ZNewspaper(props: IZNewspaper) {
  const { GridProps, className, range, children } = props;

  const _range = new ZDeviceValues(range, [1, 12]);

  const [sXl, eXl] = _range.xl;
  const [sLg, eLg] = _range.lg;
  const [sMd, eMd] = _range.md;
  const [sSm, eSm] = _range.sm;
  const [sXs, eXs] = _range.xs;

  return (
    <ZGrid
      {...GridProps}
      className={cssJoinDefined("ZNewspaper-root", className)}
      columns="1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr"
      width={ZSizeVaried.Full}
    >
      <ZGridSpan
        columnStart={{
          xl: sXl,
          lg: sLg,
          md: sMd,
          sm: sSm,
          xs: sXs,
        }}
        columnEnd={{
          xl: eXl + 1,
          lg: eLg + 1,
          md: eMd + 1,
          sm: eSm + 1,
          xs: eXs + 1,
        }}
      >
        {children}
      </ZGridSpan>
    </ZGrid>
  );
}
