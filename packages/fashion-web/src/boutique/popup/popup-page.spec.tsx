import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZTestRouter } from "@zthun/fashion-boutique";
import { createMemoryHistory } from "history";
import { afterEach, describe, expect, it } from "vitest";

import { ZPopupPageComponentModel } from "./popup-page.cm.mjs";
import { ZPopupPage } from "./popup-page.js";

describe("ZPopupPage", () => {
  let _setup: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZPopupPage />
      </ZTestRouter>
    );
    _setup = new ZCircusSetupRenderer(element);
    _driver = await _setup.setup();
    return ZCircusBy.first(_driver, ZPopupPageComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _setup));

  it("should open the popup", async () => {
    // Arrange.
    const target = await createTestTarget();
    const popup = await target.popup();

    // Act.
    const open = await target.open();
    await open.click();
    await popup.waitForOpen();
    const actual = await popup.opened();

    // Assert.
    expect(actual).toBeTruthy();
  });

  it("should close the popup", async () => {
    // Arrange.
    const target = await createTestTarget();
    const popup = await target.popup();
    const open = await target.open();
    await open.click();
    await popup.waitForOpen();

    // Act.
    const close = await target.close();
    await close.click();
    await popup.waitForClose();
    const actual = await popup.opened();

    // Assert.
    expect(actual).toBeFalsy();
  });
});
