import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import type { Mock } from "vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { ZIconComponentModel } from "../icon/icon.cm.mjs";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZBubbleComponentModel } from "./bubble.cm.mjs";
import { ZBubble } from "./bubble.js";

describe("ZBubble", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;
  let onClick: Mock | undefined;

  const createTestTarget = async () => {
    const element = (
      <ZBubble onClick={onClick}>
        <ZIconFontAwesome name="save" />
      </ZBubble>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZBubbleComponentModel);
  };

  beforeEach(() => {
    onClick = undefined;
  });

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  it("should render the content", async () => {
    // Arrange.
    const target = await createTestTarget();

    // Act.
    const actual = await ZCircusBy.first(target.driver, ZIconComponentModel);

    // Assert.
    expect(actual).toBeTruthy();
  });

  describe("Click", () => {
    it("should raise the onClick event", async () => {
      // Arrange.
      onClick = vi.fn();
      const target = await createTestTarget();

      // Act.
      await target.click();

      // Assert.
      expect(onClick).toHaveBeenCalled();
    });
  });
});
