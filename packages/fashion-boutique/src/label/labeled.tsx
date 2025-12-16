import type { ZSizeVoid } from "@zthun/fashion-tailor";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZOrientation, cssJoinDefined } from "@zthun/helpful-fn";
import type { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import type { IZComponentLabel } from "../component/component-label.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentOrientation } from "../component/component-orientation.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import { ZStack } from "../stack/stack.js";
import type { IZLabel } from "./label.js";
import { ZLabel } from "./label.js";

export interface IZLabeled
  extends
    IZComponentName,
    IZComponentLabel,
    IZComponentStyle,
    IZComponentDomEvents<HTMLDivElement>,
    IZComponentOrientation,
    IZComponentHierarchy {
  LabelProps?: IZLabel;
  gap?: ZSizeVoid | ZSizeFixed;
  position?: "prefix" | "suffix";
}

export function ZLabeled(props: IZLabeled) {
  const {
    children,
    className,
    label,
    name,
    gap = ZSizeFixed.ExtraSmall,
    orientation = ZOrientation.Vertical,
    LabelProps,
    position = "prefix",
    ...dom
  } = props;
  const items = orientation === ZOrientation.Horizontal ? "center" : undefined;
  const renderLabel = (_position: "prefix" | "suffix") =>
    position === _position && label && <ZLabel {...LabelProps}>{label}</ZLabel>;

  return (
    <ZStack
      {...dom}
      align={{ items }}
      className={cssJoinDefined("ZLabeled-root", className)}
      orientation={orientation}
      gap={gap}
      name={name}
    >
      {renderLabel("prefix")}
      <ZStack inline>{children}</ZStack>
      {renderLabel("suffix")}
    </ZStack>
  );
}
