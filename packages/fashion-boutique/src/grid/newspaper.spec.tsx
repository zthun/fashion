import {
  type IZCircusDriver,
  type IZCircusSetup,
  ZCircusDestroy,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import type { ZNewspaperRange } from "./newspaper.js";
import { ZNewspaper } from "./newspaper.js";

describe("ZNewspaper", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  let xl: ZNewspaperRange;

  beforeEach(() => {
    xl = [1, 12];
  });

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  async function createTestTarget() {
    const element = (
      <ZNewspaper className="ZTestNewspaper-root" range={xl}>
        12 Column Content
      </ZNewspaper>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return _driver;
  }

  it("should render will full ranges", async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
