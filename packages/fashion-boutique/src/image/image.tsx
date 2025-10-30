import {
  createSizeChartFixedCss,
  createSizeChartFixedGeometric,
  createSizeChartVariedCss,
  createSizeChartVoidCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import { ZDataUrlBuilder } from "@zthun/webigail-url";
import type { Property } from "csstype";
import type { IZComponentHeight } from "../component/component-height.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentSource } from "../component/component-source.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentWidth } from "../component/component-width.mjs";
import { useFashionDevice } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";

export interface IZImageSource
  extends IZComponentSource,
    IZComponentStyle,
    IZComponentWidth,
    IZComponentHeight,
    IZComponentName {
  fit?: Property.ObjectFit;
}

const ImageSizeChart = {
  ...createSizeChartFixedCss(createSizeChartFixedGeometric(2, 1), "rem"),
  ...createSizeChartVariedCss(),
  ...createSizeChartVoidCss(),
};

/**
 * Represents an image.
 *
 * This is a shortcut to placing an image tag, but it also supports svg data urls.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns The jsx for this component.
 */
export function ZImage(props: IZImageSource) {
  const device = useFashionDevice();
  const { className, fit = "fill", src, height, width, name } = props;
  const _height = new ZDeviceValues(height, ZSizeVaried.Default);
  const _width = new ZDeviceValues(width, ZSizeVaried.Default);

  const _className = useCss(css`
    & {
      object-fit: ${fit};
      width: ${ImageSizeChart[_width.xl]};
      height: ${ImageSizeChart[_height.xl]};
    }

    ${device.break(ZSizeFixed.Large)} {
      & {
        width: ${ImageSizeChart[_width.lg]};
        height: ${ImageSizeChart[_height.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      & {
        width: ${ImageSizeChart[_width.md]};
        height: ${ImageSizeChart[_height.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      & {
        width: ${ImageSizeChart[_width.sm]};
        height: ${ImageSizeChart[_height.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      & {
        width: ${ImageSizeChart[_width.xs]};
        height: ${ImageSizeChart[_height.xs]};
      }
    }
  `);

  const imageClass = cssJoinDefined("ZImage-root", className, _className);

  if (!src) {
    return <div className={imageClass} data-name={name} />;
  }

  if (src.startsWith("data:image/svg+xml")) {
    const info = new ZDataUrlBuilder().parse(src).info();
    const __html = new TextDecoder().decode(info.buffer);

    return (
      <div
        className={imageClass}
        dangerouslySetInnerHTML={{ __html }}
        data-name={name}
      />
    );
  }

  return <img className={imageClass} data-name={name} src={src} alt={name} />;
}

/**
 * @deprecated Use ZImage instead.
 */
export const ZImageSource = ZImage;
