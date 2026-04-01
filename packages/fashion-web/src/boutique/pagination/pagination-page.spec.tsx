import {
  type IZCircusDriver,
  type IZCircusSetup,
  ZCircusBy,
  ZCircusDestroy,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import {
  ZPaginationSizesMultiplesOfFive,
  ZPaginationSizesMultiplesOfTwelve,
  ZTestRouter,
} from "@zthun/fashion-boutique";
import { createMemoryHistory } from "history";
import { afterEach, describe, expect, it } from "vitest";

import { ZPaginationPageComponentModel } from "./pagination-page.cm.mjs";
import { ZPaginationPage } from "./pagination-page.js";

describe("ZPaginationPage", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  const createTestTarget = async () => {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZPaginationPage />
      </ZTestRouter>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZPaginationPageComponentModel);
  };

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  describe("Error", () => {
    it("should render an errored pagination when the error switch is turned on", async () => {
      // Arrange.
      const target = await createTestTarget();
      const error = await target.error();

      // Act.
      await error.toggle(true);
      const pagination = await target.pagination();
      const actual = await pagination.error();

      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe("Page Sizes", () => {
    const shouldChangeSizes = async (
      expected: number[],
      start: "Multiples of 5" | "Multiples of 12",
      size: "Multiples of 5" | "Multiples of 12",
    ) => {
      // Arrange.
      const target = await createTestTarget();
      const sizes = await target.sizes();
      await sizes.select(start);

      // Act.
      await sizes.select(size);
      const pagination = await target.pagination();
      const pageSizes = await pagination.size();
      const options = await pageSizes.open();
      const actual = await Promise.all(
        options.map((o) => o.text().then((x) => Number(String(x)))),
      );

      // Asset.
      expect(actual).toEqual(expected);
    };

    it("should change the page sizes to multiples of 5", async () => {
      await shouldChangeSizes(
        ZPaginationSizesMultiplesOfFive,
        "Multiples of 12",
        "Multiples of 5",
      );
    });

    it("should change the page sizes to multiples of 12", async () => {
      await shouldChangeSizes(
        ZPaginationSizesMultiplesOfTwelve,
        "Multiples of 5",
        "Multiples of 12",
      );
    });
  });
});
