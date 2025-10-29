import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import type { ZNumberComponentModel } from "@zthun/fashion-boutique";
import { afterEach, describe, expect, it } from "vitest";
import { ZNumberPageComponentModel } from "./number-page.cm.mjs";
import { ZNumberPage } from "./number-page.js";

type NumberInputFactory = (
  t: ZNumberPageComponentModel,
) => Promise<ZNumberComponentModel>;

describe("ZNumberPage", () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const element = <ZNumberPage />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZNumberPageComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  async function shouldUpdateTheValue(factory: NumberInputFactory) {
    // Arrange
    const target = await createTestTarget();
    const increment = 25;
    const num = await factory(target);
    const value = await target.value();
    const expected = (value || 0) + increment;
    // Act.
    await num.increment(increment);
    const actual = await target.value();
    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldClearTheValue(factory: NumberInputFactory) {
    // Arrange
    const target = await createTestTarget();
    const num = await factory(target);
    // Act.
    await num.clear();
    const actual = await target.value();
    // Assert.
    expect(actual).toBeNull();
  }

  describe("Spinner", () => {
    const factory: NumberInputFactory = (t) => t.spinner();

    it("should update the value", async () => {
      await shouldUpdateTheValue(factory);
    });

    it("should clear the value", async () => {
      await shouldClearTheValue(factory);
    });
  });
});
