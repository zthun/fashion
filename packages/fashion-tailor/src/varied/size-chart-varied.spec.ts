import { describe, expect, it } from "vitest";

import { createSizeChartVariedCss } from "./size-chart-varied-css.mjs";
import type { ZSizeChartVaried } from "./size-varied.mjs";
import { ZSizeVaried } from "./size-varied.mjs";

describe("Size Chart Varied", () => {
  it("should set the sizes", () => {
    // Arrange.
    const expected: ZSizeChartVaried<string> = {
      [ZSizeVaried.Default]: "auto",
      [ZSizeVaried.Fit]: "fit-content",
      [ZSizeVaried.Full]: "100%",
    };
    // Act.
    const actual = createSizeChartVariedCss();
    // Assert.
    expect(actual).toEqual(expected);
  });
});
