import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZTestRouter } from "@zthun/fashion-boutique";
import { createMemoryHistory } from "history";
import { afterEach, describe, expect, it } from "vitest";

import { ZListPageComponentModel } from "./list-page.cm.mjs";
import { ZListPage } from "./list-page.js";

describe("ZListPage", () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZListPage />
      </ZTestRouter>
    );
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZListPageComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  async function shouldIncrementCount(name: string) {
    // Arrange.
    const target = await createTestTarget();
    const list = await target.list();
    const item = await list.item(name);
    const current = await target.count();
    // Act.
    await item?.click();
    const actual = await target.count();
    // Assert.
    expect(actual).toEqual(current + 1);
  }

  it("should increment the count when alpha is clicked", async () => {
    await shouldIncrementCount("alpha");
  });
});
