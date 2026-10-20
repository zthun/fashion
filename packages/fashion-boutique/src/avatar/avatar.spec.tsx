import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZUrlBuilder } from "@zthun/webigail-url";
import { afterEach, describe, expect, it } from "vitest";

import { ZIconComponentModel } from "../icon/icon.cm.mjs";
import { ZImageComponentModel } from "../image/image.cm.mjs";
import type { IZAvatar } from "./avatar.js";
import { ZAvatar } from "./avatar.js";
import { ZAvatarFontAwesomeBuilder } from "./avatar-font-awesome.mjs";
import { ZAvatarImageBuilder } from "./avatar-image.mjs";

describe("ZAvatar", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  afterEach(async () => {
    await ZCircusDestroy.sequential(_driver, _renderer);
  });

  const createTestTarget = async (props?: Partial<IZAvatar>) => {
    const element = <ZAvatar {...props} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return _driver;
  };

  describe("Empty", () => {
    it("should render empty if the value is not set", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const image = await ZCircusBy.optional(target, ZImageComponentModel);
      const icon = await ZCircusBy.optional(target, ZIconComponentModel);

      // Assert.
      expect(image).toBeNull();
      expect(icon).toBeNull();
    });
  });

  describe("Image", () => {
    it("should render an image if an image descriptor is passed", async () => {
      // Arrange.
      const src = new ZUrlBuilder().gravatar().build();
      const value = new ZAvatarImageBuilder().src(src).build();
      const target = await createTestTarget({ value });

      // Act.
      const actual = await ZCircusBy.optional(target, ZImageComponentModel);

      // Act.
      expect(actual).not.toBeNull();
    });
  });

  describe("Icon", () => {
    it("should render an icon if a font awesome image descriptor is passed", async () => {
      // Arrange.
      const name = "folder";
      const value = new ZAvatarFontAwesomeBuilder()
        .name(name)
        .animation("spin")
        .family("classic")
        .style("solid")
        .build();
      const target = await createTestTarget({ value });

      // Act.
      const actual = await ZCircusBy.optional(target, ZIconComponentModel);

      // Assert.
      expect(actual).not.toBeNull();
    });
  });
});
