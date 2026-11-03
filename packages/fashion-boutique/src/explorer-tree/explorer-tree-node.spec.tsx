import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
  type IZExplorerApi,
  ZExplorerContext,
} from "../explorer/use-explorer.mjs";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZExplorerTreeNodeComponentModel } from "./explorer-tree-node.cm.js";
import type { IZExplorerTreeNode } from "./explorer-tree-node.js";
import { ZExplorerTreeNode } from "./explorer-tree-node.js";

describe("ZExplorerTreeNode", () => {
  const alphabet = [
    "alpha",
    "bravo",
    "charlie",
    "delta",
    "echo",
    "foxtrot",
    "golf",
    "hotel",
    "india",
    "juliet",
    "kilo",
    "lima",
    "mike",
    "november",
    "oscar",
    "papa",
    "quebec",
    "romeo",
    "sierra",
    "tango",
    "uniform",
    "victor",
    "whiskey",
    "xray",
    "yankee",
    "zulu",
  ];

  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  const createLeafTestTarget = async (
    props?: Partial<IZExplorerTreeNode>,
    explorer?: Partial<IZExplorerApi>,
  ) => {
    const element = (
      <ZExplorerContext value={{ expanded: true, ...explorer }}>
        <ZExplorerTreeNode {...props} />
      </ZExplorerContext>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZExplorerTreeNodeComponentModel);
  };

  const createBranchTestTarget = async (
    props?: Partial<IZExplorerTreeNode>,
    explorer?: Partial<IZExplorerApi>,
  ) => {
    const element = (
      <ZExplorerContext
        value={{
          expanded: true,
          ...explorer,
        }}
      >
        <ZExplorerTreeNode name="phonetic-alphabet" {...props}>
          {alphabet.map((l) => {
            const letter = l.charAt(0);
            return (
              <ZExplorerTreeNode
                key={l}
                avatar={
                  <ZIconFontAwesome
                    name={letter}
                    width={ZSizeFixed.ExtraSmall}
                  />
                }
                name={l}
                heading={l}
                highlight={l === "november"}
              />
            );
          })}
        </ZExplorerTreeNode>
      </ZExplorerContext>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(
      _driver,
      ZExplorerTreeNodeComponentModel,
      "phonetic-alphabet",
    );
  };

  describe("Children", () => {
    it("should render all children when expanded", async () => {
      // Arrange.
      const target = await createBranchTestTarget();
      await target.toggle(true);

      // Act.
      const children = await target.nodes();
      const actual = await Promise.all(children.map((c) => c.name()));

      // Assert.
      expect(actual).toEqual(alphabet);
    });

    it("should not render any children when collapsed", async () => {
      // Arrange.
      const target = await createBranchTestTarget();
      await target.toggle(false);

      // Act.
      const actual = await target.nodes();

      // Assert.
      expect(actual.length).toEqual(0);
    });

    it("should not render any children when the explorer is collapsed", async () => {
      // Arrange.
      const target = await createBranchTestTarget(
        { expanded: true },
        { expanded: false },
      );

      // Act.
      const actual = await target.nodes();

      // Assert.
      expect(actual.length).toEqual(0);
    });
  });

  describe("Avatar", () => {
    it("should render the avatar if set", async () => {
      // Arrange.
      const avatar = "A";
      const target = await createBranchTestTarget({ avatar });

      // Act.
      const _avatar = await target.avatar();
      const actual = await _avatar?.text();

      // Assert.
      expect(actual).toEqual(avatar);
    });

    it("should not render the avatar if it is falsy", async () => {
      // Arrange.
      const target = await createLeafTestTarget();

      // Act.
      const actual = await target.avatar();

      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Header", () => {
    it("should render if set", async () => {
      // Arrange.
      const heading = "Heading";
      const target = await createLeafTestTarget({ heading });

      // Act.
      const _heading = await target.heading();
      const actual = await _heading?.text();

      // Assert.
      expect(actual).toEqual(heading);
    });

    it("should not render if it is not set", async () => {
      // Arrange.
      const target = await createLeafTestTarget();

      // Act.
      const actual = await target.heading();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should not render when the explorer is collapsed", async () => {
      // Arrange.
      const heading = "Heading";
      const target = await createLeafTestTarget(
        { heading },
        { expanded: false },
      );

      // Act.
      const actual = await target.heading();

      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Expand/Collapse", () => {
    it("should expand a parent if it is collapsed", async () => {
      // Arrange.
      const target = await createBranchTestTarget();
      await target.toggle(false);

      // Act.
      await target.toggle();
      const actual = await target.expanded();

      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should collapse a branch if it is expanded", async () => {
      // Arrange.
      const target = await createBranchTestTarget();
      await target.toggle(true);

      // Act.
      await target.toggle();
      const actual = await target.expanded();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should render the expanded state if the props are set", async () => {
      // Arrange.
      const target = await createBranchTestTarget({ expanded: true });

      // Act.
      await target.toggle();
      const actual = await target.expanded();

      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should raise the onExpandedChange event when expansion changes", async () => {
      // Arrange.
      const onExpandedChange = vi.fn();
      const target = await createBranchTestTarget({
        expanded: true,
        onExpandedChange,
      });

      // Act.
      await target.toggle();

      // Assert.
      expect(onExpandedChange).toHaveBeenCalledWith(false);
    });

    it("should expand if the explorer is collapsed", async () => {
      // Arrange.
      const onExpandedChange = vi.fn();
      const target = await createBranchTestTarget(
        { onExpandedChange },
        { expanded: false },
      );

      // Act.
      await target.toggle();

      // Assert.
      expect(onExpandedChange).toHaveBeenCalledWith(true);
    });

    it("should open the explorer if it is collapsed", async () => {
      // Arrange.
      const expand = vi.fn();
      const target = await createBranchTestTarget(
        {},
        { expanded: false, expand },
      );

      // Act.
      await target.toggle();

      // Assert.
      expect(expand).toHaveBeenCalled();
    });
  });

  describe("Activate", () => {
    it("should not raise the onActivate event for branch nodes", async () => {
      // Arrange.
      const onActivate = vi.fn();
      const target = await createBranchTestTarget({ onActivate });

      // Act.
      await target.toggle();

      // Assert.
      expect(onActivate).not.toHaveBeenCalled();
    });

    it("should raise onActivate when a leaf node is clicked", async () => {
      // Arrange.
      const onActivate = vi.fn();
      const target = await createLeafTestTarget({ onActivate });

      // Act.
      await target.click();

      // Assert.
      expect(onActivate).toHaveBeenCalled();
    });
  });

  describe("Interactive", () => {
    it("should not raise the onActivate if the nonInteractive flag is true", async () => {
      // Arrange.
      const onActivate = vi.fn();
      const target = await createLeafTestTarget({
        onActivate,
        nonInteractive: true,
      });

      // Act.
      await target.click();

      // Assert.
      expect(onActivate).not.toHaveBeenCalled();
    });
  });

  describe("Highlight", () => {
    it("should highlight leaf nodes that have the highlight flag as true", async () => {
      // Arrange.
      const target = await createLeafTestTarget({ highlight: true });

      // Act.
      const actual = await target.highlighted();

      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should not highlight a leaf node that has the highlight flag to false", async () => {
      // Arrange.
      const target = await createLeafTestTarget({ highlight: false });

      // Act.
      const actual = await target.highlighted();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should not highlight a branch if the branch is expanded and the explorer is expanded", async () => {
      // Arrange.
      const target = await createBranchTestTarget(
        { expanded: true },
        { expanded: true },
      );

      // Act.
      const actual = await target.highlighted();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should highlight a branch if the branch is collapsed and has a highlighted child", async () => {
      // Arrange.
      const target = await createBranchTestTarget({ expanded: false });

      // Act.
      const actual = await target.highlighted();

      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should highlight a branch if the parent explorer is collapsed and has a highlighted child", async () => {
      // Arrange.
      const target = await createBranchTestTarget(
        { expanded: true },
        { expanded: false },
      );

      // Act.
      const actual = await target.highlighted();

      // Assert.
      expect(actual).toBeTruthy();
    });
  });
});
