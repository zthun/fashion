import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import type { FunctionComponent } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { ZSuspenseComponentModel } from "./suspense.cm.mjs";
import type { IZSuspense } from "./suspense.mjs";
import { ZSuspenseProgress } from "./suspense-progress.js";
import { ZSuspenseRotate } from "./suspense-rotate.js";

describe("ZSuspense", () => {
  let _setup: IZCircusSetup;
  let _driver: IZCircusDriver;

  afterEach(() => ZCircusDestroy.sequential(_driver, _setup));

  async function createTestTarget(
    Suspense: FunctionComponent<IZSuspense>,
    props?: IZSuspense,
  ) {
    _setup = new ZCircusSetupRenderer(<Suspense {...props} />);
    _driver = await _setup.setup();
    return ZCircusBy.first(_driver, ZSuspenseComponentModel);
  }

  async function shouldDisplayWhenThereIsSuspense(
    createTestTarget: (props?: IZSuspense) => Promise<ZSuspenseComponentModel>,
  ) {
    // Arrange.
    const target = await createTestTarget({ disabled: false });

    // Act.
    const actual = await target.loading();

    // Assert.
    expect(actual).toBeTruthy();
  }

  async function shouldHideWhenThereIsNoSuspense(
    createTestTarget: (props?: IZSuspense) => Promise<ZSuspenseComponentModel>,
  ) {
    // Arrange.
    const target = await createTestTarget({ disabled: true });

    // Act.
    const actual = await target.loading();

    // Assert.
    expect(actual).toBeFalsy();
  }

  describe("Rotate", () => {
    const createRotate = createTestTarget.bind(null, ZSuspenseRotate);

    it("should display when the suspense is loading", async () => {
      await shouldDisplayWhenThereIsSuspense(createRotate);
    });

    it("should hide when the suspense is not loading", async () => {
      await shouldHideWhenThereIsNoSuspense(createRotate);
    });
  });

  describe("Progress", () => {
    const createProgress = createTestTarget.bind(null, ZSuspenseProgress);

    it("should display when the suspense is loading", async () => {
      await shouldDisplayWhenThereIsSuspense(createProgress);
    });

    it("should hide when the suspense is not loading", async () => {
      await shouldHideWhenThereIsNoSuspense(createProgress);
    });
  });
});
