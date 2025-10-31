import {
  ZCircusBy,
  ZCircusDestroy,
  type IZCircusDriver,
  type IZCircusSetup,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZBrandDataSourceFactory } from "@zthun/helpful-brands";
import { ZDataRequestBuilder } from "@zthun/helpful-query";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ZPaginationComponentModel } from "./pagination.cm.mjs";
import { ZPagination, type IZPagination } from "./pagination.js";

describe("ZPagination", () => {
  const dataSource = ZBrandDataSourceFactory.create();

  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  const createTestTarget = async (props?: Partial<IZPagination>) => {
    const element = <ZPagination {...props} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZPaginationComponentModel);
  };

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  describe("Navigation", () => {
    it("should be on the page specified by the request", async () => {
      // Arrange.
      const value = new ZDataRequestBuilder().page(3).size(5).build();
      const target = await createTestTarget({ dataSource, value });
      const page = await target.page();

      // Act.
      const actual = await page.value();

      // Assert.
      expect(actual).toEqual(value.page);
    });

    it("should navigate to the next page", async () => {
      // Arrange.
      const value = new ZDataRequestBuilder().page(2).size(5).build();
      const expected = new ZDataRequestBuilder().copy(value).page(3).build();
      const onValueChange = vi.fn();
      const target = await createTestTarget({
        dataSource,
        value,
        onValueChange,
      });
      await target.loader().then((l) => l.load());
      const page = await target.page();

      // Act.
      await page.increment();

      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expected);
    });
  });
});
