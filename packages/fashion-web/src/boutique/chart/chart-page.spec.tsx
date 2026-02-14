import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZTestRouter } from "@zthun/fashion-boutique";
import { createMemoryHistory } from "history";
import { afterEach, describe, expect, it } from "vitest";
import { ZChartPageComponentModel } from "./chart-page.cm.mjs";
import { ZChartPage } from "./chart-page.js";

describe("ZChartPage", () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZChartPage />
      </ZTestRouter>
    );
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZChartPageComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  describe("Progress", () => {
    const shouldRenderChart = async (
      name: "hp" | "attack" | "defense" | "intelligence" | "speed",
    ) => {
      // Arrange
      const target = await createTestTarget();
      const progress = await target.progress();
      // Act.
      const chart = await progress[name]();
      // Assert.
      expect(chart).toBeTruthy();
    };

    it("should render the hp progress chart", async () => {
      await shouldRenderChart("hp");
    });

    it("should render the attack progress chart", async () => {
      await shouldRenderChart("attack");
    });

    it("should render the defense progress chart", async () => {
      await shouldRenderChart("defense");
    });

    it("should render the intelligence progress chart", async () => {
      await shouldRenderChart("intelligence");
    });

    it("should render the speed progress chart", async () => {
      await shouldRenderChart("speed");
    });
  });
});
