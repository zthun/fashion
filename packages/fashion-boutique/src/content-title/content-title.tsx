import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import type { ElementType, ReactNode } from "react";
import { isValidElement, useMemo } from "react";
import type { IZComponentAdornment } from "../component/component-adornment.mjs";
import type { IZComponentAvatar } from "../component/component-avatar.mjs";
import type { IZComponentHeading } from "../component/component-heading.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import { ZFlex } from "../stack/flex.js";
import { ZStack } from "../stack/stack.js";
import { ZH2, ZSubtitle } from "../typography/typography.js";

export interface IZContentTitle
  extends
    IZComponentHeading,
    IZComponentStyle,
    IZComponentAvatar,
    IZComponentAdornment {}

export function ZContentTitle(props: IZContentTitle) {
  const { avatar, className, heading, prefix, subHeading, suffix } = props;

  const _heading = useMemo(() => {
    if (heading == null || isValidElement(heading)) {
      return heading;
    }

    return <ZH2 compact>{heading}</ZH2>;
  }, [heading]);

  const _subHeading = useMemo(() => {
    if (subHeading == null || isValidElement(subHeading)) {
      return subHeading;
    }

    return <ZSubtitle compact>{subHeading}</ZSubtitle>;
  }, [subHeading]);

  const renderSection = (
    part: ReactNode,
    name: string,
    Element: ElementType = "div",
  ) => {
    if (part == null) {
      return null;
    }

    return <Element className={`ZContentTitle-${name}`}>{part}</Element>;
  };

  return (
    <ZStack
      align={{ items: "center" }}
      className={cssJoinDefined("ZContentTitle-root", className)}
      orientation={ZOrientation.Horizontal}
      gap={ZSizeFixed.Small}
    >
      {renderSection(avatar, "avatar")}
      <ZStack orientation={ZOrientation.Vertical} gap={ZSizeFixed.ExtraSmall}>
        {renderSection(_heading, "heading", "header")}
        {renderSection(_subHeading, "sub-heading", "sub")}
      </ZStack>
      <ZFlex grow={1}>{renderSection(prefix, "prefix")}</ZFlex>
      {renderSection(suffix, "suffix")}
    </ZStack>
  );
}
