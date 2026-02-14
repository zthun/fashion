import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZTestRouter } from "@zthun/fashion-boutique";
import { createMemoryHistory } from "history";
import { afterEach, describe, expect, it } from "vitest";
import { ZImagePageComponentModel } from "./image-page.cm.mjs";
import { ZImagePage } from "./image-page.js";

describe("ZImagePage", () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZImagePage />
      </ZTestRouter>
    );
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZImagePageComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  it("should render the page", async () => {
    // Arrange.

    // Act.
    const target = await createTestTarget();

    // Assert.
    expect(target).toBeTruthy();
  });
});
