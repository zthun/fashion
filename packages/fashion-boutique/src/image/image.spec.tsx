import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZUrlBuilder } from "@zthun/webigail-url";
import { afterEach, describe, expect, it } from "vitest";
import { ZImageComponentModel } from "./image.cm.mjs";
import type { IZImageSource } from "./image.js";
import { ZImage } from "./image.js";

describe("ZImage", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  async function createTestTarget(props?: Partial<IZImageSource>) {
    const element = <ZImage {...props} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZImageComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  async function shouldRenderNameAttribute() {
    // Arrange
    const name = "test-image";
    const target = await createTestTarget({ name });
    // Act.
    const actual = await target.name();
    // Assert.
    expect(actual).toEqual(name);
  }

  describe("Empty", () => {
    it("renders an empty div.", async () => {
      // Arrange
      const target = await createTestTarget();

      // Act
      const actual = await target.empty();

      // Assert
      expect(actual).toBeTruthy();
    });

    it("renders the name property", async () => {
      await shouldRenderNameAttribute();
    });
  });

  describe("IMG", () => {
    it("should render the app icon as a raster image if the url is not a svg data url.", async () => {
      // Arrange
      const src = new ZUrlBuilder().gravatar().build();
      const target = await createTestTarget({ src });

      // Act
      const actual = await target.img();

      // Assert
      expect(actual).toBeTruthy();
    });

    it("renders the name property", async () => {
      await shouldRenderNameAttribute();
    });
  });
});
