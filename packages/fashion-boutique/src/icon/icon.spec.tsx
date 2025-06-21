import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZFashionThemeBuilder } from "@zthun/fashion-theme";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { IZIconFontAwesome } from "./icon-font-awesome.js";
import {
  ZIconFontAwesome,
  ZIconFontAwesomeProvider,
  ZIconFontAwesomeVendor,
} from "./icon-font-awesome.js";
import {
  ZIconMaterial,
  ZIconMaterialProvider,
  ZIconMaterialVendor,
} from "./icon-material.js";
import { ZIconComponentModel } from "./icon.cm.mjs";
import type { IZIcon } from "./icon.mjs";

describe("ZIcon", () => {
  let _renderers: IZCircusSetup[];
  let _drivers: IZCircusDriver[];

  beforeEach(() => {
    _renderers = [];
    _drivers = [];
  });

  afterEach(async () => {
    await Promise.all(_drivers.map((d) => d.destroy?.call(d)));
    await Promise.all(_renderers.map((r) => r.destroy?.call(r)));
  });

  type CreateTestTarget = <T extends IZIcon>(
    props?: T,
  ) => Promise<ZIconComponentModel>;

  async function shouldRegisterTheProvider(
    expected: string,
    createTestTarget: CreateTestTarget,
  ) {
    // Arrange.
    await createTestTarget({ name: "save" });
    await createTestTarget({ name: "home" });
    // Act.
    const actual = document.head.querySelectorAll(
      `link[href="${expected}"]`,
    ).length;
    // Assert.
    expect(actual).toEqual(1);
  }

  async function shouldRenderTheIconByName(
    expected: string,
    createTestTarget: CreateTestTarget,
  ) {
    // Arrange.
    const target = await createTestTarget({ name: expected });

    // Act.
    const actual = await target.name();

    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldProvideTheCorrectVendor(
    expected: string,
    createTestTarget: CreateTestTarget,
  ) {
    // Arrange.
    const target = await createTestTarget({ name: "save" });

    // Act.
    const actual = await target.vendor();

    // Assert.
    expect(actual).toEqual(expected);
  }

  async function shouldRaiseTheOnClickEventWhenClicked(
    createTestTarget: CreateTestTarget,
  ) {
    // Arrange.
    const onClick = vi.fn();
    const target = await createTestTarget({ name: "home", onClick });

    // Act.
    await target.click();

    // Assert.
    expect(onClick).toHaveBeenCalled();
  }

  async function shouldRenderTheCorrectFashion(
    createTestTarget: CreateTestTarget,
  ) {
    // Arrange.
    const { secondary } = new ZFashionThemeBuilder().build();
    const target = await createTestTarget({ name: "save", fashion: secondary });

    // Assert.
    const actual = await target.fashion();

    // Assert.
    expect(actual).toEqual(secondary.name);
  }

  describe("Material", () => {
    async function createTestTarget(props: IZIcon = {}) {
      const { name } = props;
      const element = <ZIconMaterial {...props} />;

      const renderer = new ZCircusSetupRenderer(element);
      const driver = await renderer.setup();

      _renderers.push(renderer);
      _drivers.push(driver);

      return ZCircusBy.first(driver, ZIconComponentModel, name);
    }

    it("should register the provider.", async () => {
      await shouldRegisterTheProvider(ZIconMaterialProvider, createTestTarget);
    });

    it("should render the icon by name.", async () => {
      await shouldRenderTheIconByName("save", createTestTarget);
    });

    it("should provide the correct vendor.", async () => {
      await shouldProvideTheCorrectVendor(
        ZIconMaterialVendor,
        createTestTarget,
      );
    });

    it("should render the icon with a given fashion.", async () => {
      await shouldRenderTheCorrectFashion(createTestTarget);
    });

    it("should raise the onClick event when clicked.", async () => {
      await shouldRaiseTheOnClickEventWhenClicked(createTestTarget);
    });
  });

  describe("Font Awesome", () => {
    async function createTestTarget(props: IZIconFontAwesome = {}) {
      const { name } = props;
      const element = <ZIconFontAwesome {...props} />;

      const renderer = new ZCircusSetupRenderer(element);
      const driver = await renderer.setup();

      _renderers.push(renderer);
      _drivers.push(driver);

      return ZCircusBy.first(driver, ZIconComponentModel, name);
    }

    it("should render the icon with the correct family", async () => {
      // Arrange.
      const target = await createTestTarget({
        name: "facebook",
        family: "brands",
      });

      // Act.
      const actual = await target.driver.attribute("data-family");

      // Assert.
      expect(actual).toEqual("brands");
    });

    it("should render the icon with the correct style", async () => {
      // Arrange.
      const target = await createTestTarget({ name: "save", style: "regular" });

      // Act.
      const actual = await target.driver.attribute("data-style");

      // Assert.
      expect(actual).toEqual("regular");
    });

    it("should register the provider.", async () => {
      await shouldRegisterTheProvider(
        ZIconFontAwesomeProvider,
        createTestTarget,
      );
    });

    it("should render the icon by name.", async () => {
      await shouldRenderTheIconByName("save", createTestTarget);
    });

    it("should provide the correct vendor.", async () => {
      await shouldProvideTheCorrectVendor(
        ZIconFontAwesomeVendor,
        createTestTarget,
      );
    });

    it("should render the icon with a given fashion.", async () => {
      await shouldRenderTheCorrectFashion(createTestTarget);
    });

    it("should raise the onClick event when clicked.", async () => {
      await shouldRaiseTheOnClickEventWhenClicked(createTestTarget);
    });
  });
});
