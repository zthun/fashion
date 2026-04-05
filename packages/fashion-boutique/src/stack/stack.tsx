import {
  createSizeChartVariedCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
  ZSizeVoid,
} from "@zthun/fashion-tailor";
import {
  css,
  cssJoinDefined,
  firstDefined,
  ZOrientation,
} from "@zthun/helpful-fn";
import type { Property } from "csstype";

import type { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import type { IZComponentHeight } from "../component/component-height.mjs";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentOrientation } from "../component/component-orientation.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentWidth } from "../component/component-width.mjs";
import { useFashionDevice, useFashionTailor } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";

export interface IZStack
  extends
    IZComponentHierarchy,
    IZComponentStyle,
    IZComponentName,
    IZComponentDomEvents<HTMLDivElement>,
    IZComponentOrientation,
    IZComponentWidth<ZSizeVaried>,
    IZComponentHeight<ZSizeVaried> {
  align?: {
    items?: Property.AlignItems;
    content?: Property.AlignContent;
  };
  gap?: ZSizeFixed | ZSizeVoid;
  justify?: { content?: Property.JustifyContent };
  inline?: boolean;
  wrap?: Property.FlexWrap;
}

const DimensionChart = createSizeChartVariedCss();

export function ZStack(props: IZStack) {
  const {
    className,
    align,
    justify,
    gap,
    name,
    orientation,
    children,
    inline,
    wrap,
    height,
    width,
    ...dom
  } = props;
  const device = useFashionDevice();
  const tailor = useFashionTailor();
  const _display = inline ? "inline-flex" : "flex";
  const _direction = orientation === ZOrientation.Horizontal ? "row" : "column";
  const _gap = tailor.gap(firstDefined(ZSizeVoid.None, gap));
  const _alignItems = firstDefined("stretch", align?.items);
  const _alignContent = firstDefined("normal", align?.content);
  const _justifyContent = firstDefined("start", justify?.content);
  const _wrap = firstDefined("nowrap", wrap);
  const _width = new ZDeviceValues(width, ZSizeVaried.Default);
  const _height = new ZDeviceValues(height, ZSizeVaried.Default);

  const _className = useCss(css`
    & {
      align-content: ${_alignContent};
      align-items: ${_alignItems};
      display: ${_display};
      flex-direction: ${_direction};
      flex-wrap: ${_wrap};
      gap: ${_gap};
      height: ${DimensionChart[_height.xl]};
      justify-content: ${_justifyContent};
      width: ${DimensionChart[_width.xl]};
    }

    ${device.break(ZSizeFixed.Large)} {
      height: ${DimensionChart[_height.lg]};
      width: ${DimensionChart[_width.lg]};
    }

    ${device.break(ZSizeFixed.Medium)} {
      height: ${DimensionChart[_height.md]};
      width: ${DimensionChart[_width.md]};
    }

    ${device.break(ZSizeFixed.Small)} {
      height: ${DimensionChart[_height.sm]};
      width: ${DimensionChart[_width.sm]};
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      height: ${DimensionChart[_height.xs]};
      width: ${DimensionChart[_width.xs]};
    }
  `);

  return (
    <div
      className={cssJoinDefined("ZStack-root", _className, className)}
      {...dom}
      data-orientation={orientation}
      data-name={name}
      data-inline={inline}
    >
      {children}
    </div>
  );
}
