import {
  type IZCircusDriver,
  type IZCircusSetup,
  ZCircusBy,
  ZCircusDestroy,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZBrandDataSourceFactory } from "@zthun/helpful-brands";
import { ZDataRequestBuilder, ZDataSourceStatic } from "@zthun/helpful-query";
import { last } from "lodash-es";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ZPaginationComponentModel } from "./pagination.cm.mjs";
import {
  type IZPagination,
  ZPagination,
  ZPaginationSizesMultiplesOfFive,
} from "./pagination.js";

describe("ZPagination", () => {
  const brands = ZBrandDataSourceFactory.create();

  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  const createTestTarget = async (props?: Partial<IZPagination>) => {
    const element = <ZPagination dataSource={brands} {...props} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZPaginationComponentModel);
  };

  const loadTestTarget = async (props?: Partial<IZPagination>) => {
    const target = await createTestTarget(props);
    const loader = await target.loader();
    await loader.load();
    return target;
  };

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  describe("Error", () => {
    it("should render an error if the count cannot be loaded", async () => {
      // Arrange.
      const expected = "Here be Dragons!";
      const dataSource = new ZDataSourceStatic(new Error(expected));
      const target = await loadTestTarget({ dataSource });

      // Act.
      const error = await target.error();
      const actual = await error?.driver.text();

      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe("Navigation", () => {
    it("should be on the page specified by the request", async () => {
      // Arrange.
      const value = new ZDataRequestBuilder().page(3).size(5).build();
      const target = await loadTestTarget({ value });
      await target.loader().then((l) => l.load());
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
      const target = await loadTestTarget({ value, onValueChange });
      await target.loader().then((l) => l.load());
      const page = await target.page();

      // Act.
      await page.increment();

      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expected);
    });

    it("should navigate to the previous page", async () => {
      // Arrange.
      const value = new ZDataRequestBuilder().page(2).size(5).build();
      const expected = new ZDataRequestBuilder().copy(value).page(1).build();
      const onValueChange = vi.fn();
      const target = await loadTestTarget({ value, onValueChange });
      await target.loader().then((l) => l.load());
      const page = await target.page();

      // Act.
      await page.decrement();

      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expected);
    });

    it("should jump to a page", async () => {
      // Arrange.
      const value = new ZDataRequestBuilder().size(5).build();
      const expected = new ZDataRequestBuilder().copy(value).page(4).build();
      const onValueChange = vi.fn();
      const target = await loadTestTarget({ value, onValueChange });
      await target.loader().then((l) => l.load());
      const page = await target.page();

      // Act.
      await page.clear();
      await page.keyboard("4");

      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(expected);
    });
  });

  describe("Sizing", () => {
    it("should automatically select the correct size", async () => {
      // Arrange.
      const sizes = [1, 2, 4];
      const value = new ZDataRequestBuilder().size(sizes[1]).build();
      const target = await loadTestTarget({ sizes, value });

      // Act.
      const size = await target.size();
      const [selected] = await size.selected();
      const actual = await selected?.value();

      // Assert.
      expect(actual).toEqual(String(value.size));
    });

    it("should render the size in the value, even if it is not in the list", async () => {
      // Arrange.
      const sizes = [1, 2, 4];
      const value = new ZDataRequestBuilder().size(8).build();
      const target = await loadTestTarget({ sizes, value });

      // Act.
      const size = await target.size();
      const [selected] = await size.selected();
      const actual = await selected?.value();

      // Assert.
      expect(actual).toEqual(String(value.size));
    });

    it("should show sizing values specified", async () => {
      // Arrange.
      const sizes = [3, 5, 7, 11, 13];
      const target = await loadTestTarget({ sizes });

      // Act.
      const size = await target.size();
      const actual = await size.open();
      const values = await Promise.all(actual.map((s) => s.value()));
      const list = values.map((v) => Number(v));

      // Assert.
      expect(actual.length).toEqual(sizes.length);
      expect(list).toEqual(sizes);
    });

    it("should update the page size when a new value is selected", async () => {
      // Arrange.
      const sizes = ZPaginationSizesMultiplesOfFive;
      const expected = last(sizes)!;
      const value = new ZDataRequestBuilder().size(sizes[0]).build();
      const onValueChange = vi.fn();
      const target = await loadTestTarget({ sizes, value, onValueChange });
      const size = await target.size();

      // Act.
      await size.select(expected);

      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(
        expect.objectContaining({ size: expected }),
      );
    });

    it("should render All for Infinity by default", async () => {
      // Arrange.
      const sizes = [2, Infinity];
      const value = new ZDataRequestBuilder().build();
      const target = await loadTestTarget({ sizes, value });
      const size = await target.size();

      // Act.
      const [selected] = await size.selected();
      const actual = await selected?.text();

      // Assert.
      expect(actual).toEqual("All");
    });
  });
});
