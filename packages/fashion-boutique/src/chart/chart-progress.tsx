import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  ZDeviceValues,
  ZSizeFixed,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { css, cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import { useMemo } from "react";

import type { IZComponentHeight } from "../component/component-height.mjs";
import { ZGrid } from "../grid/grid.js";
import { ZLabeled } from "../label/labeled.js";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";
import type { IZChart } from "./chart.mjs";
import type { IZDataPoint } from "./data-point.mjs";

const HeightChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), "rem"),
};

export interface IZChartProgress
  extends IZChart<IZDataPoint>, IZComponentHeight<ZSizeFixed> {}

export function ZChartProgress(props: IZChartProgress) {
  const { secondary } = useFashionTheme();
  const device = useFashionDevice();
  const tailor = useFashionTailor();
  const { className, points, name, height } = props;
  const { x, y, name: label, fashion } = points;
  const _height = new ZDeviceValues(height, ZSizeFixed.Medium);
  const _fashion = firstDefined(secondary, fashion);
  const picker = new ZColorPicker(_fashion);

  const _y = useMemo(() => Math.max(y, 0), [y]);
  const _x = useMemo(() => Math.max(x, 0), [x]);
  const _per = useMemo(() => (_x / _y) * 100, [_y, _x]);

  const _label = useMemo(() => `${label} (${_x} / ${_y})`, [label, _x, _y]);

  const _className = useCss(css`
    .ZChart-bar {
      border-color: ${picker.idle.border};
      border-style: solid;
      border-width: ${tailor.thickness()};
      position: relative;
    }

    .ZChart-point {
      height: ${HeightChart[_height.xl]};
      background: ${picker.idle.background};
    }

    ${device.break(ZSizeFixed.Large)} {
      .ZChart-point {
        height: ${HeightChart[_height.lg]};
      }
    }

    ${device.break(ZSizeFixed.Medium)} {
      .ZChart-point {
        height: ${HeightChart[_height.md]};
      }
    }

    ${device.break(ZSizeFixed.Small)} {
      .ZChart-point {
        height: ${HeightChart[_height.sm]};
      }
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      .ZChart-point {
        height: ${HeightChart[_height.xs]};
      }
    }
  `);

  return (
    <div
      className={cssJoinDefined(
        "ZChart-root",
        "ZChart-progress",
        className,
        _className,
      )}
      data-name={name}
    >
      <ZLabeled label={_label}>
        <ZGrid
          columns="1fr auto"
          gap={ZSizeFixed.Small}
          align={{ items: "center" }}
        >
          <section className="ZChart-bar">
            <div
              className="ZChart-point"
              data-value={_per}
              data-x={_x}
              data-y={_y}
              data-name={label}
              data-fashion={fashion?.name}
              style={{ width: `${_per}%` }}
            />
          </section>
        </ZGrid>
      </ZLabeled>
    </div>
  );
}
