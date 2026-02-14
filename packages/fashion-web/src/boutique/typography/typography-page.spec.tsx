import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZTestRouter } from "@zthun/fashion-boutique";
import { ZFashionThemeBuilder } from "@zthun/fashion-theme";
import { createMemoryHistory } from "history";
import { afterEach, describe, expect, it } from "vitest";
import { ZTypographyPageComponentModel } from "./typography-page.cm.mjs";
import { ZTypographyPage } from "./typography-page.js";

describe("ZTypographyPage", () => {
  const theme = new ZFashionThemeBuilder().build();
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZTypographyPage />
      </ZTestRouter>
    );
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZTypographyPageComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  async function shouldSetFashion(expected: string) {
    // Arrange.
    const target = await createTestTarget();
    const fashion = await target.fashion();
    // Act.
    await fashion.select(expected);
    const paragraph = await target.paragraph();
    const actual = await paragraph.fashion();
    // Assert.
    expect(actual).toEqual(expected);
  }

  describe("Fashion", () => {
    it("should set the fashion to Primary", async () => {
      await shouldSetFashion(theme.primary.name!);
    });

    it("should set the fashion to Secondary", async () => {
      await shouldSetFashion(theme.secondary.name!);
    });

    it("should set the fashion to Success", async () => {
      await shouldSetFashion(theme.success.name!);
    });

    it("should set the fashion to Warning", async () => {
      await shouldSetFashion(theme.warning.name!);
    });

    it("should set the fashion to Error", async () => {
      await shouldSetFashion(theme.error.name!);
    });

    it("should set the fashion to Info", async () => {
      await shouldSetFashion(theme.info.name!);
    });

    it("should set the fashion to Surface", async () => {
      await shouldSetFashion(theme.surface.name!);
    });

    it("should set the fashion to Body", async () => {
      await shouldSetFashion(theme.body.name!);
    });
  });
});
