import type { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZDeviceValues, ZSizeVaried, ZSizeVoid } from "@zthun/fashion-tailor";
import { cssJoinDefined, firstDefined, ZOrientation } from "@zthun/helpful-fn";
import type { Property } from "csstype";
import type { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentOrientation } from "../component/component-orientation.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentWidth } from "../component/component-width.mjs";
import type { IZComponentHeight } from "../index.mjs";
import { useFashionTailor } from "../theme/fashion.mjs";

export interface IZStack
  extends IZComponentHierarchy,
    IZComponentStyle,
    IZComponentName,
    IZComponentDomEvents<HTMLDivElement>,
    IZComponentOrientation,
    IZComponentWidth<ZSizeVaried, ZSizeVaried>,
    IZComponentHeight<ZSizeVaried, ZSizeVaried> {
  align?: { items?: Property.AlignItems; content?: Property.AlignContent };
  gap?: ZSizeFixed | ZSizeVoid;
  justify?: {
    items?: Property.JustifyItems;
    content?: Property.JustifyContent;
  };
  inline?: boolean;
  wrap?: Property.FlexWrap;
}

export function ZStack(props: IZStack) {
  const {
    className,
    align,
    justify,
    gap,
    height,
    name,
    orientation,
    children,
    inline,
    width,
    wrap,
    ...dom
  } = props;
  const tailor = useFashionTailor();
  const $width = new ZDeviceValues(width, ZSizeVaried.Full);
  const $height = new ZDeviceValues(height, ZSizeVaried.Fit);

  return (
    <div
      className={cssJoinDefined("ZStack-root", className)}
      style={{
        alignContent: align?.content,
        alignItems: align?.items,
        display: inline ? "inline-flex" : "flex",
        flexDirection:
          orientation === ZOrientation.Horizontal ? "row" : "column",
        gap: tailor.gap(firstDefined(ZSizeVoid.None, gap)),
        justifyContent: justify?.content,
        justifyItems: justify?.items,
        flexWrap: wrap,
        width: $width.xl === ZSizeVaried.Full ? "100%" : "fit-content",
        height: $height.xl === ZSizeVaried.Full ? "100%" : "fit-content",
      }}
      {...dom}
      data-orientation={orientation}
      data-name={name}
      data-inline={inline}
    >
      {children}
    </div>
  );
}
