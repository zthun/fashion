import type { ReactNode } from "react";

import type { IZFashion } from "@zthun/fashion-theme";
import { ZColorPicker } from "@zthun/fashion-theme";

import {
  createSizeChartVariedCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import {
  css,
  cssJoinDefined,
  firstDefined,
  ZOrientation,
} from "@zthun/helpful-fn";
import type { IZComponentAvatar } from "../component/component-avatar.mjs";
import type { IZComponentCompact } from "../component/component-compact.mjs";
import type { IZComponentDisabled } from "../component/component-disabled.mjs";
import type { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import type { IZComponentFashion } from "../component/component-fashion.mjs";
import type { IZComponentLabel } from "../component/component-label.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentWidth } from "../component/component-width.mjs";
import { ZStack } from "../stack/stack.js";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";
import { ZButtonText } from "../typography/typography.js";

export interface IZButton
  extends IZComponentAvatar,
    IZComponentLabel,
    IZComponentCompact,
    IZComponentDomEvents<HTMLButtonElement>,
    IZComponentDisabled,
    IZComponentStyle,
    IZComponentName,
    IZComponentFashion<IZFashion>,
    IZComponentWidth<ZSizeVaried, ZSizeVaried> {
  borderless?: boolean;
  outline?: boolean;
  tooltip?: ReactNode;
  type?: "button" | "submit" | "reset";
}

const WidthChart = createSizeChartVariedCss();

/**
 * Represents a basic button component.
 *
 * @param props -
 *        The properties for this button.
 *
 * @returns The JSX to render this button.
 */
export function ZButton(props: IZButton) {
  const {
    avatar,
    className,
    borderless,
    compact,
    disabled,
    fashion,
    label,
    name,
    outline,
    type = "button",
    width,
    ...dom
  } = props;
  const device = useFashionDevice();
  const { component } = useFashionTheme();
  const tailor = useFashionTailor();
  const picker = new ZColorPicker(firstDefined(component, fashion));
  const _width = new ZDeviceValues(width, ZSizeVaried.Default);

  const _className = useCss(css`
    & {
      border-radius: 0.375rem;
      display: inline-flex;
      font-family: inherit;
      font-size: inherit;
      gap: ${tailor.gap(ZSizeFixed.ExtraSmall)};
      justify-content: center;
      overflow: hidden;
      position: relative;
      background: ${outline ? "transparent" : picker.idle.main};
      border-color: ${picker.idle.main};
      border-style: ${borderless ? "none" : "solid"};
      color: ${outline ? picker.idle.main : picker.idle.contrast};
      padding: ${compact ? 0 : tailor.gap(ZSizeFixed.ExtraSmall)};
      width: ${WidthChart[_width.xl]};
    }

    &:focus {
      outline-style: solid;
      outline-width: ${tailor.thickness(ZSizeFixed.Medium)};
      border-color: ${picker.focus.main};
      outline-color: ${picker.focus.border};
    }

    &:hover:not([disabled]) {
      background-color: ${picker.hover.main};
      border-color: ${picker.hover.border};
      color: ${picker.hover.contrast};
      cursor: pointer;
    }

    &:active:not([disabled]) {
      background-color: ${picker.active.main};
      border-color: ${picker.active.border};
      color: ${picker.active.contrast};
    }

    &:disabled {
      opacity: 0.25;
    }

    ${device.break(ZSizeFixed.Large)} {
      & {
        width: ${WidthChart[_width.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      & {
        width: ${WidthChart[_width.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      & {
        width: ${WidthChart[_width.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      & {
        width: ${WidthChart[_width.xs]};
      }
    }
  `);

  return (
    <button
      {...dom}
      className={cssJoinDefined("ZButton-root", className, _className)}
      disabled={disabled}
      name={name}
      type={type}
      data-borderless={borderless}
      data-compact={compact}
      data-fashion={fashion?.name}
      data-outline={outline}
    >
      <ZStack
        align={{ items: "center" }}
        orientation={ZOrientation.Horizontal}
        gap={ZSizeFixed.Small}
        inline
      >
        {avatar}
        <ZButtonText Element="div" compact className="ZButton-content">
          {label}
        </ZButtonText>
      </ZStack>
    </button>
  );
}
