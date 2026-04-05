import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import type { MemoryHistory } from "history";
import { createMemoryHistory } from "history";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ZTestRouter } from "../router/test-router.js";
import { ZNotFoundComponentModel } from "./not-found.cm.mjs";
import { ZNotFound } from "./not-found.js";

describe("ZNotFound", () => {
  let home: string | undefined;
  let history: MemoryHistory;
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZNotFound home={home} />
      </ZTestRouter>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZNotFoundComponentModel);
  }

  beforeEach(() => {
    history = createMemoryHistory();
    home = undefined;
  });

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  it("should route to the root path", async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    await target.returnHome();
    // Assert.
    expect(history.location.pathname).toEqual("/");
  });

  it("should route to the specified path", async () => {
    // Arrange.
    home = "/path/to/home";
    const target = await createTestTarget();
    // Act.
    await target.returnHome();
    // Assert.
    expect(history.location.pathname).toEqual(home);
  });
});
