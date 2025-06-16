import {
  ZCircusBy,
  type IZCircusDriver,
  type IZCircusSetup,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { describe, expect, it } from "vitest";
import { ZFormAutoComponentModel } from "./form-auto.cm.mjs";
import type { IZFormAuto } from "./form-auto.js";
import { ZFormAuto } from "./form-auto.js";

describe("ZFormAuto", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async (props?: Partial<IZFormAuto>) => {
    const element = <ZFormAuto {...props} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZFormAutoComponentModel);
  };

  it("should render the component", async () => {
    // Arrange.

    // Act.
    const target = await createTestTarget();

    // Assert.
    expect(target).toBeTruthy();
  });
});
