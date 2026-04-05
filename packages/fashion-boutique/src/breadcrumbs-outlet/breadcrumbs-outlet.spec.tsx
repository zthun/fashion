import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { createMemoryHistory } from "history";
import { afterEach, describe, expect, it } from "vitest";

import { ZTestRouter } from "../router/test-router.js";
import { ZBreadcrumbsOutletComponentModel } from "./breadcrumbs-outlet.cm.mjs";
import { ZBreadcrumbsOutlet } from "./breadcrumbs-outlet.js";

describe("ZBreadcrumbsOutlet", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  async function createTestTarget() {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter navigator={history} location={history.location}>
        <ZBreadcrumbsOutlet />
      </ZTestRouter>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZBreadcrumbsOutletComponentModel);
  }

  it("should render the breadcrumbs", async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    // Assert.
    await expect(target.breadcrumbs()).resolves.toBeTruthy();
  });
});
