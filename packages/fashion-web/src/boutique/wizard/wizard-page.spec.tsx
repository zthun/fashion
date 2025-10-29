import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZTestRouter } from "@zthun/fashion-boutique";
import type { MemoryHistory } from "history";
import { createMemoryHistory } from "history";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ZFashionRouteBoutique } from "../../routes.mjs";
import { ZWizardPageComponentModel } from "./wizard-page.cm.mjs";
import { ZWizardPage } from "./wizard-page.js";

describe("ZWizardPage", () => {
  let history: MemoryHistory;
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZWizardPage />
      </ZTestRouter>
    );
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZWizardPageComponentModel);
  }

  beforeEach(() => {
    history = createMemoryHistory();
  });

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  it("should disable the finish button while the user has not checked the understand switch", async () => {
    // Arrange.
    const target = await createTestTarget();
    const next = await (await target.wizard()).next();
    await next?.click();
    await next?.click();
    // Act.
    const finish = await (await target.wizard()).finish();
    const actual = await finish?.disabled();
    // Assert.
    expect(actual).toBeTruthy();
  });

  it("should enable the finish button when the user has checked the understand switch", async () => {
    // Arrange.
    const target = await createTestTarget();
    const next = await (await target.wizard()).next();
    await next?.click();
    await next?.click();
    // Act.
    const understand = await target.understood();
    await understand?.toggle(true);
    const finish = await (await target.wizard()).finish();
    const actual = await finish?.disabled();
    // Assert.
    expect(actual).toBeFalsy();
  });

  it("should navigate back to the boutique page when the user finishes the wizard", async () => {
    // Arrange.
    const target = await createTestTarget();
    const next = await (await target.wizard()).next();
    await next?.click();
    await next?.click();
    const understand = await target.understood();
    await understand?.toggle(true);
    const finish = await (await target.wizard()).finish();
    // Act.
    await finish?.click();
    const actual = history.location.pathname;
    // Assert.
    expect(actual).toEqual(`/${ZFashionRouteBoutique.path}`);
  });
});
