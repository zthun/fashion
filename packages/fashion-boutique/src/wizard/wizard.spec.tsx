import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { firstDefined } from "@zthun/helpful-fn";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ZWizardComponentModel } from "./wizard.cm.mjs";
import type { IZWizard } from "./wizard.js";
import { ZWizard } from "./wizard.js";

describe("ZWizard", () => {
  let page1Disabled: boolean | undefined;
  let lastPageDisabled: boolean | undefined;
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  const createTestTarget = async ({ children, ...props }: IZWizard = {}) => {
    const _children = firstDefined(
      [
        <div data-name="Page 1" data-next-disabled={page1Disabled}>
          Page 1
        </div>,
        <div data-name="Page 2">Page 2</div>,
        <div data-name="Page 3" data-next-disabled={lastPageDisabled}>
          Page 3
        </div>,
      ],
      children,
    );
    const element = <ZWizard {...props}>{_children}</ZWizard>;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZWizardComponentModel);
  };

  beforeEach(() => {
    page1Disabled = undefined;
    lastPageDisabled = undefined;
  });

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  describe("Navigation", () => {
    describe("Next", () => {
      it("should move to the next page", async () => {
        // Arrange.
        const target = await createTestTarget();
        const current = await target.page();
        const next = await target.next();

        // Act.
        await next?.click();
        const actual = await target.page();

        // Assert.
        expect(actual).toEqual(current + 1);
      });

      it("should be hidden on the last page", async () => {
        // Arrange.
        const target = await createTestTarget({
          CardProps: {},
          PrevButtonProps: {},
          NextButtonProps: {},
          FinishButtonProps: {},
        });
        const next = await target.next();

        // Act.
        await next?.click();
        await next?.click();
        const actual = await target.next();

        // Assert.
        expect(actual).toBeNull();
      });

      it("should be hidden if the children list is empty", async () => {
        // Arrange.
        const target = await createTestTarget({ children: [] });

        // Act.
        const actual = await target.next();

        // Assert.
        expect(actual).toBeNull();
      });

      it("should disable the next button if the data disabled flag is truthy", async () => {
        // Arrange.
        page1Disabled = true;
        const target = await createTestTarget();
        const next = await target.next();
        // Act.
        const actual = await next?.disabled();
        // Assert.
        expect(actual).toBeTruthy();
      });
    });

    describe("Previous", () => {
      it("should move to the previous page", async () => {
        // Arrange.
        const target = await createTestTarget();
        const next = await target.next();
        await next?.click();
        await next?.click();
        const current = await target.page();
        const previous = await target.previous();
        // Act.
        await previous.click();
        const actual = await target.page();
        // Assert.
        expect(actual).toEqual(current - 1);
      });

      it("should be disabled if the current page is the first page", async () => {
        // Arrange.
        const target = await createTestTarget();
        const previous = await target.previous();
        // Act.
        const actual = await previous.disabled();
        // Assert.
        expect(actual).toBeTruthy();
      });

      it("should be disabled if the children list is empty", async () => {
        // Arrange.
        const target = await createTestTarget({ children: [] });
        const previous = await target.previous();

        // Act.
        const actual = await previous.disabled();

        // Assert.
        expect(actual).toBeTruthy();
      });
    });

    describe("Finish", () => {
      it("should be shown on the last page.", async () => {
        // Arrange.
        const target = await createTestTarget();
        const next = await target.next();

        // Act
        await next?.click();
        await next?.click();
        const actual = await target.finish();

        // Assert.
        expect(actual).toBeTruthy();
      });

      it("should be hidden before the last page.", async () => {
        // Arrange.
        const target = await createTestTarget();

        // Act.
        const actual = await target.finish();

        // Assert.
        expect(actual).toBeNull();
      });

      it("should be hidden if the child list is empty", async () => {
        // Arrange.
        const target = await createTestTarget({ children: [] });

        // Act.
        const actual = await target.finish();

        // Assert.
        expect(actual).toBeNull();
      });

      it("should be disabled if the data next disabled flag is true", async () => {
        // Arrange.
        lastPageDisabled = true;
        const target = await createTestTarget();
        const next = await target.next();
        await next?.click();
        await next?.click();

        // Act.
        const finish = await target.finish();
        const actual = await finish?.disabled();

        // Assert.
        expect(actual).toBeTruthy();
      });
    });
  });
});
