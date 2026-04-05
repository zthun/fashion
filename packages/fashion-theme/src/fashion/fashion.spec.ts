import { describe, expect, it } from "vitest";

import { hsl } from "../color/hsl.mjs";
import { white } from "../color/rgb.mjs";
import { ZFashionBuilder } from "./fashion.mjs";
import { ZFashionStateBuilder } from "./fashion-state.mjs";

describe("ZFashion", () => {
  function createTestTarget() {
    return new ZFashionBuilder();
  }

  describe("Copy", () => {
    it("should copy another complementary object", () => {
      const main = hsl(220, 56, 72, 0.32);
      const contrast = white();
      const idle = new ZFashionStateBuilder()
        .background(main)
        .contrast(contrast)
        .build();
      const expected = createTestTarget().idle(idle).build();
      const actual = createTestTarget().copy(expected).build();
      expect(actual).toEqual(expected);
    });
  });
});
