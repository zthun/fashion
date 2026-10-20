import {
  type IZCircusDriver,
  type IZCircusSetup,
  ZCircusBy,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { describe, expect, it } from "vitest";

import { ZRouteBuilder } from "../route/route.mjs";
import { ZExplorerExternalsComponentModel } from "./explorer-externals.cm.js";
import type { IZExplorerExternals } from "./explorer-externals.js";
import { ZExplorerExternals } from "./explorer-externals.js";
import { type IZExplorerState, ZExplorerContext } from "./use-explorer.mjs";

describe("ZExplorerExternals", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async (
    props?: Partial<IZExplorerExternals>,
    explorer?: Partial<IZExplorerState>,
  ) => {
    const element = (
      <ZExplorerContext value={{ ...explorer }}>
        <ZExplorerExternals {...props} />
      </ZExplorerContext>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZExplorerExternalsComponentModel);
  };

  it("should render all links", async () => {
    // Arrange.
    const zthun = new ZRouteBuilder().github("zthun").build();
    const lizardByte = new ZRouteBuilder().github("lizardByte").build();
    const value = [zthun, lizardByte];
    const expected = value.map((v) => v.path);
    const target = await createTestTarget({ value });

    // Act.
    const links = await target.links();
    const actual = await Promise.all(links.map((l) => l.reference()));

    // Assert.
    expect(actual).toEqual(expected);
  });

  it("should render an empty list of links", async () => {
    // Arrange.
    const target = await createTestTarget(undefined, { expanded: true });

    // Act.
    const links = await target.links();

    // Assert.
    expect(links.length).toEqual(0);
  });
});
