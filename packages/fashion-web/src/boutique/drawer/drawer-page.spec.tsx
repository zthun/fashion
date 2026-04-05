import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZTestRouter } from "@zthun/fashion-boutique";
import type { ZSideAnchor } from "@zthun/helpful-fn";
import { ZHorizontalAnchor, ZVerticalAnchor } from "@zthun/helpful-fn";
import { createMemoryHistory } from "history";
import { afterEach, describe, expect, it } from "vitest";

import { ZDrawerPageComponentModel } from "./drawer-page.cm.mjs";
import { ZDrawerPage } from "./drawer-page.js";

describe("ZDrawerPage", () => {
  let _setup: IZCircusSetup;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZDrawerPage />
      </ZTestRouter>
    );
    _setup = new ZCircusSetupRenderer(element);
    _driver = await _setup.setup();
    return ZCircusBy.first(_driver, ZDrawerPageComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _setup));

  async function shouldPositionDrawer(expected: ZSideAnchor) {
    // Arrange.
    const target = await createTestTarget();
    await target.anchor(expected);
    // Act.
    const button = await target.open();
    await button.click();
    const actual = await (await target.drawer()).anchor();
    // Assert.
    expect(actual).toEqual(expected);
  }

  it("should position the drawer on the left", async () => {
    await shouldPositionDrawer(ZHorizontalAnchor.Left);
  });

  it("should position the drawer on the right", async () => {
    await shouldPositionDrawer(ZHorizontalAnchor.Right);
  });

  it("should position the drawer on the top", async () => {
    await shouldPositionDrawer(ZVerticalAnchor.Top);
  });

  it("should position the drawer on the bottom", async () => {
    await shouldPositionDrawer(ZVerticalAnchor.Bottom);
  });

  it("should close the drawer", async () => {
    // Arrange.
    const target = await createTestTarget();
    const open = await target.open();
    await open.click();

    // Act.
    const close = await target.close();
    await close.click();
    const drawer = await target.drawer();
    await drawer.waitForClose();
    const actual = await (await target.drawer()).opened();

    // Assert.
    expect(actual).toBeFalsy();
  });
});
