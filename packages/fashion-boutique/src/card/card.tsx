import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import {
  css,
  cssJoinDefined,
  firstDefined,
  pickDataAttributes,
} from "@zthun/helpful-fn";
import type { IZComponentFashion } from "../component/component-fashion.mjs";
import type { IZComponentFooter } from "../component/component-footer.mjs";
import type { IZComponentHeight } from "../component/component-height.mjs";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentWidth } from "../component/component-width.mjs";
import type { IZContentTitle } from "../content-title/content-title.js";
import { ZContentTitle } from "../content-title/content-title.js";
import { ZStack } from "../stack/stack.js";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";

export interface IZCard
  extends
    IZComponentHierarchy,
    IZComponentFashion,
    IZComponentFooter,
    IZComponentStyle,
    IZComponentName,
    IZComponentWidth,
    IZComponentHeight {
  TitleProps?: Omit<IZContentTitle, "className">;
}

const WidthChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(1.5, 15), "rem"),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss(),
};

const HeightChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(5, 20), "rem"),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss(),
};

export function ZCard(props: IZCard) {
  const { surface } = useFashionTheme();
  const tailor = useFashionTailor();
  const device = useFashionDevice();
  const {
    className,
    children,
    footer,
    fashion,
    name,
    width,
    height,
    TitleProps,
  } = props;
  const _fashion = firstDefined(surface, fashion);
  const picker = new ZColorPicker(_fashion);
  const _surface = new ZColorPicker(surface);
  const _width = new ZDeviceValues(width, ZSizeVaried.Default);
  const _height = new ZDeviceValues(height, ZSizeVaried.Default);

  const _className = useCss(css`
    & {
      background: ${_surface.idle.background};
      border-radius: ${tailor.rounding(ZSizeFixed.Medium)};
      box-shadow: 0 0.2rem 8pt #101010;
      color: ${_surface.idle.contrast};
      max-width: ${WidthChart[_width.xl]};
      min-height: ${HeightChart[_height.xl]};
      padding: ${tailor.gap(ZSizeFixed.Medium)};
    }

    > .ZCard-header {
      background: ${picker.idle.background};
      color: ${picker.idle.contrast};
    }

    > .ZCard-footer {
      padding-top: 0;
    }

    ${device.break(ZSizeFixed.Large)} {
      & {
        max-width: ${WidthChart[_width.lg]};
        min-height: ${HeightChart[_height.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      & {
        max-width: ${WidthChart[_width.md]};
        min-height: ${HeightChart[_height.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      & {
        max-width: ${WidthChart[_width.sm]};
        min-height: ${HeightChart[_height.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      & {
        max-width: ${WidthChart[_width.xs]};
        min-height: ${HeightChart[_height.xs]};
      }
    }
  `);

  return (
    <ZStack
      align={{ items: "stretch" }}
      className={cssJoinDefined("ZCard-root", className, _className)}
      name={name}
      gap={ZSizeFixed.Medium}
      {...pickDataAttributes(props)}
      data-fashion={_fashion.name}
    >
      <ZContentTitle {...TitleProps} className="ZCard-header" />

      <article style={{ flexGrow: 1 }} className="ZCard-content">
        {children}
      </article>

      {footer && <footer className="ZCard-footer">{footer}</footer>}
    </ZStack>
  );
}
