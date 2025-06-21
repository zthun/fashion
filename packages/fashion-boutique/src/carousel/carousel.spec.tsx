import { ZBrandKnown } from "@zthun/helpful-brands";
import type { IZCarousel } from "./carousel.js";
import { ZCarousel } from "./carousel.js";

import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZOrientation } from "@zthun/helpful-fn";
import { describe, expect, it, vi } from "vitest";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZIconComponentModel } from "../icon/icon.cm.mjs";
import { ZCarouselComponentModel } from "./carousel.cm.mjs";

describe("ZCarousel", () => {
  const brands = ZBrandKnown.all();

  const createTestTarget = async (props?: Partial<IZCarousel>) => {
    const element = (
      <ZCarousel
        count={brands.length}
        renderAtIndex={(i) => <ZIconFontAwesome name={brands[i].id} />}
        {...props}
      />
    );

    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZCarouselComponentModel);
  };

  describe("State", () => {
    it("should initialize on the controlled value", async () => {
      // Arrange.
      const value = 2;
      const target = await createTestTarget({ value });

      // Act.
      const actual = await target.index();
      // Assert.
      expect(actual).toEqual(value);
    });

    it("should be ready to navigate the count of items", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const actual = await target.count();

      // Assert.
      expect(actual).toEqual(brands.length);
    });

    it("should render the content at the given value", async () => {
      // Arrange.
      const target = await createTestTarget();
      const expected = brands[0].name;

      // Act.
      const icon = ZCircusBy.optional(
        await target.content(),
        ZIconComponentModel,
        expected,
      );

      // Assert.
      expect(icon).toBeTruthy();
    });

    it("should render nothing if the count is 0 and renderEmpty is not set", async () => {
      // Arrange.
      const target = await createTestTarget({ count: 0 });

      // Act.
      const content = await target.content();
      const actual = await content.text();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should render empty if the count is 0", async () => {
      // Arrange.
      const expected = "?";
      const renderEmpty = () => expected;
      const target = await createTestTarget({ count: 0, renderEmpty });

      // Act.
      const content = await target.content();
      const actual = await content.text();

      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe("Orientation", () => {
    it("should set the specified orientation", async () => {
      // Arrange.
      const orientation = ZOrientation.Vertical;
      const target = await createTestTarget({ orientation });

      // Act.
      const actual = await target.orientation();

      // Assert.
      expect(actual).toEqual(orientation);
    });

    it("should render left for reverse when oriented horizontally", async () => {
      // Arrange.
      const orientation = ZOrientation.Horizontal;
      const target = await createTestTarget({ orientation });
      const reverse = await target.reverse();

      // Act.
      const left = await ZCircusBy.first(reverse.driver, ZIconComponentModel);
      const actual = await left.name();

      // Assert.
      expect(actual).toEqual("chevron-left");
    });

    it("should render right for forward when oriented horizontally", async () => {
      // Arrange.
      const orientation = ZOrientation.Horizontal;
      const target = await createTestTarget({ orientation });
      const forward = await target.forward();

      // Act.
      const right = await ZCircusBy.first(forward.driver, ZIconComponentModel);
      const actual = await right.name();

      // Assert.
      expect(actual).toEqual("chevron-right");
    });

    it("should render up for reverse when oriented vertically", async () => {
      // Arrange.
      const orientation = ZOrientation.Vertical;
      const target = await createTestTarget({ orientation });
      const reverse = await target.reverse();

      // Act.
      const up = await ZCircusBy.first(reverse.driver, ZIconComponentModel);
      const actual = await up.name();

      // Assert.
      expect(actual).toEqual("chevron-up");
    });

    it("should render down for forward when oriented vertically", async () => {
      // Arrange.
      const orientation = ZOrientation.Vertical;
      const target = await createTestTarget({ orientation });
      const forward = await target.forward();

      // Act.
      const down = await ZCircusBy.first(forward.driver, ZIconComponentModel);
      const actual = await down.name();

      // Assert.
      expect(actual).toEqual("chevron-down");
    });
  });

  describe("Navigation", () => {
    describe("Reverse", () => {
      it("should be disabled if the count is 1", async () => {
        // Arrange.
        const target = await createTestTarget({ count: 1, ReverseProps: {} });

        // Act.
        const reverse = await target.reverse();
        const actual = await reverse.disabled();

        // Assert.
        expect(actual).toBeTruthy();
      });

      it("should navigate to the previous item", async () => {
        // Arrange.
        const target = await createTestTarget();
        const forward = await target.forward();
        await forward.click();
        const current = await target.index();

        // Act.
        const reverse = await target.reverse();
        await reverse.click();
        const actual = await target.index();

        // Assert.
        expect(actual).toEqual(current - 1);
      });

      it("should navigate to the last item if on the first item", async () => {
        // Arrange.
        const value = 0;
        const onValueChange = vi.fn();
        const target = await createTestTarget({ value, onValueChange });

        // Act.
        const reverse = await target.reverse();
        await reverse.click();

        // Assert.
        expect(onValueChange).toHaveBeenCalledWith(brands.length - 1);
      });
    });

    describe("Forward", () => {
      it("should be disabled if the count is 1", async () => {
        // Arrange.
        const target = await createTestTarget({ count: 1, ForwardProps: {} });

        // Act.
        const forward = await target.forward();
        const actual = await forward.disabled();

        // Assert.
        expect(actual).toBeTruthy();
      });

      it("should navigate to the next item", async () => {
        // Arrange.
        const target = await createTestTarget();
        // Act.
        const forward = await target.forward();
        await forward.click();
        await forward.click();
        const actual = await target.index();
        // Assert.
        expect(actual).toEqual(2);
      });

      it("should navigate to the first item if on the last item", async () => {
        // Arrange.
        const value = brands.length - 1;
        const onValueChange = vi.fn();
        const target = await createTestTarget({ value, onValueChange });
        // Act.
        const forward = await target.forward();
        await forward.click();
        // Assert.
        expect(onValueChange).toHaveBeenCalledWith(0);
      });
    });
  });
});
