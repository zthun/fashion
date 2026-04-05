import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZFashionBuilder } from "@zthun/fashion-theme";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ZChartComponentModel } from "./chart.cm.mjs";
import { ZChartProgress } from "./chart-progress.js";
import type { IZDataPoint } from "./data-point.mjs";
import { ZDataPointBuilder } from "./data-point.mjs";

describe("ZChart", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  let points: IZDataPoint[];

  beforeEach(() => {
    points = [
      new ZDataPointBuilder(10, 100)
        .fashion(new ZFashionBuilder().build())
        .name("P1")
        .build(),
      new ZDataPointBuilder(11, 100).name("P2").build(),
      new ZDataPointBuilder(12, 100).build(),
    ];
  });

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  const shouldRenderCorrectPointDimensions = async (
    expected: number[],
    createTestTarget: () => Promise<ZChartComponentModel>,
    actualFn: (point: IZDataPoint) => number,
  ) => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const points = await target.points();
    const actual = points.map((p) => actualFn(p));
    // Assert.
    expect(actual).toEqual(expected);
  };

  describe("Progress", () => {
    let point: IZDataPoint;

    beforeEach(() => {
      [point] = points;
    });

    const createTestTarget = async () => {
      const element = <ZChartProgress points={point} />;

      _renderer = new ZCircusSetupRenderer(element);
      _driver = await _renderer.setup();

      return ZCircusBy.first(_driver, ZChartComponentModel);
    };

    it("should render the correct x point value", async () => {
      await shouldRenderCorrectPointDimensions(
        [point.x],
        createTestTarget,
        (p) => p.x,
      );
    });

    it("should render the correct y point value", async () => {
      await shouldRenderCorrectPointDimensions(
        [point.y],
        createTestTarget,
        (p) => p.y,
      );
    });
  });
});
