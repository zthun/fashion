import {
  type IZCircusDriver,
  type IZCircusSetup,
  ZCircusBy,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import {
  ZDataRequestBuilder,
  ZFilterBinaryBuilder,
  ZSortBuilder,
} from "@zthun/helpful-query";
import { describe, expect, it, vi } from "vitest";

import { ZButtonComponentModel } from "../button/button.cm.mjs";
import type { IZRefresh } from "./refresh.js";
import { ZRefresh } from "./refresh.js";

describe("ZRefresh", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async (props?: Partial<IZRefresh>) => {
    const element = <ZRefresh {...props} />;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZButtonComponentModel);
  };

  it("should raise a new request when the button is clicked", async () => {
    // Arrange.
    const onValueChange = vi.fn();
    const filter = new ZFilterBinaryBuilder()
      .subject("company")
      .equal()
      .value("Nintendo")
      .build();
    const sort = new ZSortBuilder().ascending("name").build();
    const expected = new ZDataRequestBuilder()
      .page(2)
      .size(24)
      .search("nes")
      .filter(filter)
      .sort(sort)
      .build();
    const target = await createTestTarget({ onValueChange, value: expected });

    // Act.
    await target.click();

    // Assert.
    expect(onValueChange).toHaveBeenCalledWith(expected);
  });

  it("should still raise the onClick event when the button is clicked", async () => {
    // Arrange.
    const onClick = vi.fn();
    const target = await createTestTarget({ ButtonProps: { onClick } });

    // Act.
    await target.click();

    // Assert.
    expect(onClick).toHaveBeenCalled();
  });
});
