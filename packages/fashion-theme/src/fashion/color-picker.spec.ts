import type { ZMutable } from "@zthun/helpful-fn";
import { describe, expect, it } from "vitest";

import { ZColorPicker } from "./color-picker.mjs";
import type { IZFashion } from "./fashion.mjs";
import { ZFashionBuilder } from "./fashion.mjs";
import { ZFashionStateBuilder } from "./fashion-state.mjs";

describe("FashionColorPicker", () => {
  const createTestFashion = (): ZMutable<IZFashion> => {
    return new ZFashionBuilder()
      .name("TestFashion")
      .idle(
        new ZFashionStateBuilder()
          .foreground("#336699")
          .contrast("#FFFFFF")
          .background("linear-gradient(90deg, #336699 0%, #6699CC 100%)")
          .border("#224466")
          .build(),
      )
      .hover(
        new ZFashionStateBuilder()
          .foreground("#4477AA")
          .contrast("#FFFFFF")
          .background("linear-gradient(90deg, #4477AA 0%, #77AADD 100%)")
          .border("#335588")
          .build(),
      )
      .focus(
        new ZFashionStateBuilder()
          .foreground("#336699")
          .background("linear-gradient(90deg, #333433 0%, #77AADD 100%)")
          .contrast("#FFFFFF")
          .border("#FFAA00")
          .build(),
      )
      .active(
        new ZFashionStateBuilder()
          .foreground("#224466")
          .contrast("#EEEEEE")
          .background("linear-gradient(90deg, #224466 0%, #446688 100%)")
          .border("#112233")
          .build(),
      )
      .build();
  };

  const createTestTarget = (fashion: IZFashion) => new ZColorPicker(fashion);

  describe("Idle", () => {
    describe("Foreground", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).idle.foreground).toEqual(
          fashion.idle.foreground,
        );
      });
    });

    describe("Contrast", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).idle.contrast).toEqual(
          fashion.idle.contrast,
        );
      });
    });

    describe("Background", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).idle.background).toEqual(
          fashion.idle.background,
        );
      });

      it("should fallback to foreground if not set", () => {
        const fashion = createTestFashion();
        delete fashion.idle.background;

        expect(createTestTarget(fashion).idle.background).toEqual(
          fashion.idle.foreground,
        );
      });
    });

    describe("Border", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).idle.border).toEqual(
          fashion.idle.border,
        );
      });

      it("should fall back to foreground if not set", () => {
        const fashion = createTestFashion();
        delete fashion.idle.border;

        expect(createTestTarget(fashion).idle.border).toEqual(
          fashion.idle.foreground,
        );
      });
    });
  });

  describe("Hover", () => {
    describe("Foreground", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).hover.foreground).toEqual(
          fashion.hover!.foreground,
        );
      });

      it("should fallback to idle foreground if not set", () => {
        const fashion = createTestFashion();
        delete fashion.hover;

        expect(createTestTarget(fashion).hover.foreground).toEqual(
          fashion.idle.foreground,
        );
      });
    });

    describe("Contrast", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).hover.contrast).toEqual(
          fashion.hover!.contrast,
        );
      });
    });

    describe("Background", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).hover.background).toEqual(
          fashion.hover!.background,
        );
      });

      it("should fallback to foreground if not set", () => {
        const fashion = createTestFashion();
        delete fashion.hover!.background;

        expect(createTestTarget(fashion).hover.background).toEqual(
          fashion.hover!.foreground,
        );
      });

      it("should fallback to idle background if not set", () => {
        const fashion = createTestFashion();
        delete fashion.hover;

        expect(createTestTarget(fashion).hover.background).toEqual(
          fashion.idle.background,
        );
      });
    });

    describe("Border", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).hover.border).toEqual(
          fashion.hover!.border,
        );
      });

      it("should fall back to foreground if not set", () => {
        const fashion = createTestFashion();
        delete fashion.hover!.border;

        expect(createTestTarget(fashion).hover.border).toEqual(
          fashion.hover!.foreground,
        );
      });

      it("should fallback to idle border if not set", () => {
        const fashion = createTestFashion();
        delete fashion.hover;

        expect(createTestTarget(fashion).hover.border).toEqual(
          fashion.idle.border,
        );
      });
    });
  });

  describe("Focus", () => {
    describe("Foreground", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).focus.foreground).toEqual(
          fashion.focus!.foreground,
        );
      });

      it("should fallback to idle foreground if not set", () => {
        const fashion = createTestFashion();
        delete fashion.focus;

        expect(createTestTarget(fashion).focus.foreground).toEqual(
          fashion.idle.foreground,
        );
      });
    });

    describe("Contrast", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).focus.contrast).toEqual(
          fashion.focus!.contrast,
        );
      });
    });

    describe("Background", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).focus.background).toEqual(
          fashion.focus!.background,
        );
      });

      it("should fallback to foreground if not set", () => {
        const fashion = createTestFashion();
        delete fashion.focus!.background;

        expect(createTestTarget(fashion).focus.background).toEqual(
          fashion.focus!.foreground,
        );
      });

      it("should fallback to idle background if not set", () => {
        const fashion = createTestFashion();
        delete fashion.focus;

        expect(createTestTarget(fashion).focus.background).toEqual(
          fashion.idle.background,
        );
      });
    });

    describe("Border", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).focus.border).toEqual(
          fashion.focus!.border,
        );
      });

      it("should fall back to foreground if not set", () => {
        const fashion = createTestFashion();
        delete fashion.focus!.border;

        expect(createTestTarget(fashion).focus.border).toEqual(
          fashion.focus!.foreground,
        );
      });

      it("should fallback to idle border if not set", () => {
        const fashion = createTestFashion();
        delete fashion.focus;

        expect(createTestTarget(fashion).focus.border).toEqual(
          fashion.idle.border,
        );
      });
    });
  });

  describe("Active", () => {
    describe("Foreground", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).active.foreground).toEqual(
          fashion.active!.foreground,
        );
      });

      it("should fallback to idle foreground if not set", () => {
        const fashion = createTestFashion();
        delete fashion.active;

        expect(createTestTarget(fashion).active.foreground).toEqual(
          fashion.idle.foreground,
        );
      });
    });

    describe("Contrast", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).active.contrast).toEqual(
          fashion.active!.contrast,
        );
      });
    });

    describe("Background", () => {
      it("should return the value if set", () => {
        const fashion = createTestFashion();

        expect(createTestTarget(fashion).active.background).toEqual(
          fashion.active!.background,
        );
      });

      it("should fallback to foreground if not set", () => {
        const fashion = createTestFashion();
        delete fashion.active!.background;

        expect(createTestTarget(fashion).active.background).toEqual(
          fashion.active!.foreground,
        );
      });

      it("should fallback to idle background if not set", () => {
        const fashion = createTestFashion();
        delete fashion.active;

        expect(createTestTarget(fashion).active.background).toEqual(
          fashion.idle.background,
        );
      });
    });
  });
});
