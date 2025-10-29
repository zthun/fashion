import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZOrientation } from "@zthun/helpful-fn";
import { afterEach, describe, expect, it } from "vitest";
import { ZLabelComponentModel } from "./label.cm.mjs";
import type { IZLabeled } from "./labeled.js";
import { ZLabeled } from "./labeled.js";

describe("ZLabeled", () => {
  describe("With", () => {
    let _driver: IZCircusDriver;
    let _renderer: IZCircusSetup;

    const createTestTarget = async (props?: IZLabeled) => {
      const element = <ZLabeled label="My Label" {...props} />;
      _renderer = new ZCircusSetupRenderer(element);
      _driver = await _renderer.setup();
      return ZCircusBy.first(_driver, ZLabelComponentModel);
    };

    afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

    it("should set the text of the label.", async () => {
      // Arrange.
      const label = "My Label";
      const target = await createTestTarget({ label });
      // Act.
      const actual = await target.text();
      // Assert.
      expect(actual).toEqual(label);
    });

    describe("Required", () => {
      const shouldBeRequired = async (expected: boolean | undefined) => {
        // Arrange.
        const orientation = ZOrientation.Horizontal;
        const gap = ZSizeFixed.Small;
        const required = expected;
        const target = await createTestTarget({
          orientation,
          gap,
          LabelProps: { required },
        });
        // Act.
        const actual = await target.required();
        // Assert.
        expect(actual).toEqual(!!expected);
      };

      it("should turn on the flag.", async () => await shouldBeRequired(true));
      it("should turn off the flag.", async () =>
        await shouldBeRequired(false));
      it("should be false by default.", async () =>
        await shouldBeRequired(undefined));
    });
  });

  describe("Without", () => {
    it("should not render a label", async () => {
      // Arrange.
      const element = <ZLabeled />;
      const renderer = new ZCircusSetupRenderer(element);
      const driver = await renderer.setup();
      // Act.
      const actual = await ZCircusBy.optional(driver, ZLabelComponentModel);
      // Assert.
      expect(actual).toBeFalsy();
      await ZCircusDestroy.sequential(driver, renderer);
    });
  });
});
