import {
  type IZCircusDriver,
  type IZCircusSetup,
  ZCircusActBuilder,
  ZCircusBy,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { describe, expect, it, vi } from "vitest";

import { ZExplorerComponentModel } from "./explorer.cm.mjs";
import type { IZExplorer } from "./explorer.js";
import { ZExplorer } from "./explorer.js";

describe("ZExplorer", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async (props?: Partial<IZExplorer>) => {
    const element = <ZExplorer {...props} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZExplorerComponentModel);
  };

  describe("Sidebar", () => {
    it("should render the content in the sidebar", async () => {
      // Arrange.
      const sidebar = "Sidebar content";
      const target = await createTestTarget({ sidebar });

      // Act.
      const content = await target.sidebar();
      const actual = await content.text();

      // Assert.
      expect(actual).toContain(sidebar);
    });
  });

  describe("Main", () => {
    it("should render the main content", async () => {
      // Arrange.
      const main = "Main content";
      const target = await createTestTarget({ children: main });

      // Act.
      const content = await target.main();
      const actual = await content.text();

      // Assert.
      expect(actual).toContain(main);
    });
  });

  describe("Expansion", () => {
    it("should be expanded when the expanded prop is true", async () => {
      // Arrange.
      const target = await createTestTarget({ expanded: true });

      // Act.
      const actual = await target.expanded();

      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should be collapsed when the expanded prop is false", async () => {
      // Arrange.
      const target = await createTestTarget({ expanded: false });

      // Act.
      const actual = await target.expanded();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should raise the onExpandedChange when the expansion toggles", async () => {
      // Arrange.
      const onExpandedChange = vi.fn();
      const target = await createTestTarget({
        expanded: true,
        onExpandedChange,
      });

      // Act.
      await target.open(false);

      // Assert.
      expect(onExpandedChange).toHaveBeenCalledWith(false);
    });

    it("should expand when the expand button is clicked while collapsed", async () => {
      // Arrange.
      const target = await createTestTarget();
      await target.open(false);

      // Act.
      await target.open(true);
      const actual = await target.expanded();

      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should collapse when the expand button is clicked while expanded", async () => {
      // Arrange.
      const target = await createTestTarget();
      await target.open(true);

      // Act.
      await target.open(false);
      const actual = await target.expanded();

      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Backdrop", () => {
    it("should close the sidebar when clicked", async () => {
      // Arrange.
      const target = await createTestTarget();
      await target.open();

      // Act.
      const click = new ZCircusActBuilder().click().build();
      const backdrop = await target.backdrop();
      await backdrop?.perform(click);
      const actual = await target.expanded();

      // Assert.
      expect(actual).toBeFalsy();
    });
  });
});
