import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZDataRequestBuilder } from "@zthun/helpful-query";
import { afterEach, describe, expect, it, vi } from "vitest";

import { ZTextComponentModel } from "../text/text.cm.mjs";
import type { IZSearch } from "./search.js";
import { ZSearch } from "./search.js";

describe("ZSearch", () => {
  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  async function createTestTarget(props?: Partial<IZSearch>) {
    const element = <ZSearch {...props} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZTextComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  describe("Label", () => {
    it("should set the the label text", async () => {
      // Arrange.
      const expected = "Buscar";
      const target = await createTestTarget({ label: expected });

      // Act.
      const label = await target.label();
      const actual = await label?.text();

      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe("Value", () => {
    it("should render the provided search request value", async () => {
      // Arrange.
      const expected = "velvet";
      const value = new ZDataRequestBuilder().search(expected).build();
      const target = await createTestTarget({ value });

      // Act.
      const actual = await target.value();

      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe("Search", () => {
    it("should raise onValueChange when the user runs a search", async () => {
      // Arrange.
      const onValueChange = vi.fn();
      const search = "new boots";
      const target = await createTestTarget({ onValueChange });

      // Act.
      await target.keyboard(search);

      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(
        expect.objectContaining({
          search,
        }),
      );
    });

    it("should raise onValueChange with a page size of 1 when a user runs a search", async () => {
      // Arrange.
      const value = new ZDataRequestBuilder().page(4).build();
      const onValueChange = vi.fn();
      const search = "new boots";
      const target = await createTestTarget({ onValueChange, value });

      // Act.
      await target.keyboard(search);

      // Assert.
      expect(onValueChange).toHaveBeenCalledWith(
        expect.objectContaining({
          page: 1,
        }),
      );
    });
  });
});
