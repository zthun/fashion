import {
  ZCircusDestroy,
  type IZCircusDriver,
  type IZCircusSetup,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import type { ZSizeVoid } from "@zthun/fashion-tailor";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import type { Property } from "csstype";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { ZGridSpan } from "./grid-span.js";
import { ZGrid } from "./grid.js";

describe("ZGrid", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  let gap: ZSizeFixed | ZSizeVoid | undefined;
  let height: ZSizeVaried | undefined;
  let xs: Property.GridTemplateColumns | undefined;
  let sm: Property.GridTemplateColumns | undefined;
  let md: Property.GridTemplateColumns | undefined;
  let lg: Property.GridTemplateColumns | undefined;
  let xl: Property.GridTemplateColumns;

  beforeEach(() => {
    gap = undefined;
    height = undefined;

    xs = undefined;
    sm = undefined;
    md = undefined;
    lg = undefined;
    xl = "1fr";
  });

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  async function createTestTarget() {
    const element = (
      <ZGrid
        className="ZTestGrid-root"
        height={height}
        gap={gap}
        columns={{ xl, lg, md, sm, xs }}
      >
        <ZGridSpan />
      </ZGrid>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return _driver;
  }

  it("should render with a gap", async () => {
    // Arrange.
    gap = ZSizeFixed.Medium;
    height = ZSizeVaried.Full;
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });

  it("should render without a gap", async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });

  it("should render with responsive columns", async () => {
    // Arrange.
    xl = "auto auto auto auto auto";
    lg = "auto auto auto auto";
    md = "auto auto auto";
    sm = "auto auto";
    xs = "auto";
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
