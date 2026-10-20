import {
  type IZCircusDriver,
  type IZCircusSetup,
  ZCircusBy,
  ZCircusDestroy,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZUrlBuilder } from "@zthun/webigail-url";
import { afterEach, describe, expect, it } from "vitest";

import { ZAvatarFontAwesomeBuilder } from "../avatar/avatar-font-awesome.mjs";
import { ZAvatarImageBuilder } from "../avatar/avatar-image.mjs";
import { ZExplorerTitleComponentModel } from "./explorer-title.cm.mjs";
import type { IZExplorerTitle } from "./explorer-title.js";
import { ZExplorerTitle } from "./explorer-title.js";
import type { IZExplorerState } from "./use-explorer.mjs";
import { ZExplorerContext } from "./use-explorer.mjs";

describe("ZExplorerTitle", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  const createTestTarget = async (
    props?: Partial<IZExplorerTitle>,
    explorer?: Partial<IZExplorerState>,
  ) => {
    const element = (
      <ZExplorerContext value={{ ...explorer }}>
        <ZExplorerTitle {...props} />
      </ZExplorerContext>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZExplorerTitleComponentModel);
  };

  describe("Heading", () => {
    it("should not render if no header is specified", async () => {
      // Arrange.
      const target = await createTestTarget(undefined, { expanded: true });

      // Act.
      const actual = await target.heading();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should not render if the explorer is collapsed", async () => {
      // Arrange.
      const heading = "Should not show";
      const target = await createTestTarget({ heading });

      // Act.
      const actual = await target.heading();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should render the heading when specified and the parent explorer is expanded", async () => {
      // Arrange.
      const heading = "My App Name";
      const target = await createTestTarget({ heading }, { expanded: true });

      // Act.
      const _heading = await target.heading();
      const actual = await _heading?.text();

      // Assert.
      expect(actual).toEqual(heading);
    });
  });

  describe("Avatar", () => {
    it("should not render if no avatar is specified", async () => {
      // Arrange.
      const target = await createTestTarget();

      // Act.
      const icon = await target.icon();
      const image = await target.image();

      // Assert.
      expect(icon).toBeFalsy();
      expect(image).toBeFalsy();
    });

    it("should render an icon", async () => {
      // Arrange.
      const avatar = new ZAvatarFontAwesomeBuilder().name("folder").build();
      const target = await createTestTarget({ avatar });

      // Act.
      const icon = await target.icon();
      const actual = await icon?.name();

      // Assert.
      expect(actual).toEqual(avatar.name);
    });

    it("should render an image", async () => {
      // Arrange.
      const gravatar = new ZUrlBuilder().gravatar().build();
      const avatar = new ZAvatarImageBuilder().src(gravatar).build();
      const target = await createTestTarget({ avatar });

      // Act.
      const image = await target.image();

      // Assert.
      expect(image).toBeTruthy();
    });
  });
});
