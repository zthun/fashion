import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZDataRequestBuilder, ZDataSourceStatic } from "@zthun/helpful-query";
import { range } from "lodash-es";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ZGridViewComponentModel } from "./grid-view.cm.mjs";
import type { IZGridView } from "./grid-view.js";
import { ZGridView } from "./grid-view.js";

describe("ZGridView", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const renderItem = (item: any) => (
    <div key={item} className="item">
      {item.toString()}
    </div>
  );

  async function createTestTarget(props?: Partial<IZGridView>) {
    const element = <ZGridView renderItem={renderItem} {...props} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZGridViewComponentModel);
  }

  async function loadTestTarget(props?: Partial<IZGridView>) {
    const target = await createTestTarget(props);

    const suspense = await target.suspense();
    await suspense.load();

    return target;
  }

  afterEach(async () => {
    await ZCircusDestroy.sequential(_driver, _renderer);
  });

  describe("Page Size", () => {
    const data = range(0, 100);
    const dataSource = new ZDataSourceStatic(data);

    it("should render available items", async () => {
      // Arrange.
      const renderItem = vi.fn();
      const value = new ZDataRequestBuilder().build();

      // Act.
      await loadTestTarget({ value, dataSource, renderItem });

      // Assert.
      expect(renderItem).toHaveBeenCalledTimes(data.length);
    });

    it("should not render any errors", async () => {
      // Arrange.
      const target = await loadTestTarget({ dataSource });

      // Act.
      const actual = await target.error();

      // Assert.
      expect(actual).toBeFalsy();
    });

    it("should render items up to the page size of the value", async () => {
      // Arrange.
      const value = new ZDataRequestBuilder().page(1).size(12).build();
      const target = await loadTestTarget({ value, dataSource });

      // Act.
      const actual = await target.driver.query(".item");

      // Assert.
      expect(actual.length).toEqual(value.size);
    });
  });

  describe("Error", () => {
    const dataSource = new ZDataSourceStatic(new Error("Something went wrong"));

    it("should render the error message", async () => {
      // Arrange.
      const target = await loadTestTarget({ dataSource });

      // Act.
      const actual = await target.error();

      // Assert.
      expect(actual).toBeTruthy();
    });
  });
});
