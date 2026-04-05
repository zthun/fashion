import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ZBoxComponentModel } from "./box.cm.mjs";
import type { IZBox } from "./box.js";
import { ZBox } from "./box.js";

describe("ZBox", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  async function createTestTarget(props?: Partial<IZBox>) {
    const element = <ZBox {...props} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZBoxComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  it("should render the component", async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget({
      padding: ZSizeFixed.Small,
      margin: ZSizeFixed.Medium,
    });
    // Assert.
    expect(target).toBeTruthy();
  });

  it("should raise the onClick event when the layout is clicked", async () => {
    // Arrange.
    const onClick = vi.fn();
    const target = await createTestTarget({
      onClick,
      interactive: true,
      cursor: "pointer",
    });
    // Act.
    await target.click();
    // Assert.
    expect(onClick).toHaveBeenCalled();
  });
});
