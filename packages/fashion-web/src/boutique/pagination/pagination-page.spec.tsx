import {
  ZCircusBy,
  ZCircusDestroy,
  type IZCircusDriver,
  type IZCircusSetup,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, describe, expect, it } from "vitest";
import { ZPaginationPageComponentModel } from "./pagination-page.cm.mjs";
import { ZPaginationPage } from "./pagination-page.js";

describe("ZPaginationPage", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  const createTestTarget = async () => {
    const element = <ZPaginationPage />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZPaginationPageComponentModel);
  };

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  it("should render the pagination component", async () => {
    // Arrange.
    const target = await createTestTarget();

    // Act.
    const actual = await target.pagination();

    // Assert.
    expect(actual).toBeTruthy();
  });
});
