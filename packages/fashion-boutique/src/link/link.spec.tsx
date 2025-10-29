import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, describe, expect, it } from "vitest";
import { ZLinkComponentModel } from "./link.cm.mjs";
import type { IZLink } from "./link.js";
import { ZLink } from "./link.js";

describe("ZLink", () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createTestTarget(props?: Partial<IZLink>) {
    const element = <ZLink {...props} />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZLinkComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  it("should set the name.", async () => {
    // Arrange.
    const name = "test-link-name";
    const target = await createTestTarget({ name });

    // Act.
    const actual = await target.name();

    // Assert.
    expect(actual).toEqual(name);
  });

  it("should set the hypertext reference.", async () => {
    // Arrange.
    const href = "#/path/to/resource";
    const target = await createTestTarget({ href });

    // Act.
    const actual = await target.reference();

    // Assert.
    expect(actual).toEqual(href);
  });

  it("should retrieve the underlying label", async () => {
    // Arrange.
    const label = "Label";
    const target = await createTestTarget({ label });

    // Act.
    const actual = await target.label();

    // Assert.
    expect(actual).toEqual(label);
  });
});
