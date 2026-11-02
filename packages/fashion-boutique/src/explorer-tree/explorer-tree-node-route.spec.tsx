import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import type { MemoryHistory } from "history";
import { createMemoryHistory } from "history";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ZExplorerContext } from "../explorer/use-explorer.mjs";
import { ZRouteBuilder } from "../route/route.mjs";
import { ZTestRouter } from "../router/test-router.js";
import { ZRouteMatchStrategy } from "../router/use-route-match.mjs";
import { ZExplorerTreeNodeComponentModel } from "./explorer-tree-node.cm.js";
import {
  type IZExplorerTreeNodeRoute,
  ZExplorerTreeNodeRoute,
} from "./explorer-tree-node-route.js";

describe("ZExplorerTreeNodeRoute", () => {
  let _history: MemoryHistory;
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  beforeEach(() => {
    _history = createMemoryHistory();
  });

  const createTestTarget = async (props?: Partial<IZExplorerTreeNodeRoute>) => {
    const element = (
      <ZTestRouter location={_history.location} navigator={_history}>
        <ZExplorerContext value={{ expanded: true }}>
          <ZExplorerTreeNodeRoute
            value={new ZRouteBuilder().build()}
            {...props}
          />
        </ZExplorerContext>
      </ZTestRouter>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZExplorerTreeNodeComponentModel);
  };

  it("should render the route name", async () => {
    // Arrange.
    const value = new ZRouteBuilder().name("Home").build();
    const target = await createTestTarget({ value });

    // Act.
    const heading = await target.heading();
    const actual = await heading?.text();

    // Assert.
    expect(actual).toEqual(value.name);
  });

  it("should be highlighted if the pathname matches", async () => {
    // Arrange.
    const value = new ZRouteBuilder().path("/").name("Fashion").build();
    _history = createMemoryHistory({ initialEntries: [value.path] });
    const target = await createTestTarget({
      value,
      matchStrategy: ZRouteMatchStrategy.Exact,
    });

    // Act.
    const actual = await target.highlighted();

    // Assert.
    expect(actual).toBeTruthy();
  });

  it("should not be highlighted if the pathname does not match", async () => {
    // Arrange.
    const value = new ZRouteBuilder()
      .path("/some/child/path")
      .name("Child Path")
      .build();
    const target = await createTestTarget({
      value,
      matchStrategy: ZRouteMatchStrategy.StartsWith,
    });

    // Act.
    const actual = await target.highlighted();

    // Assert.
    expect(actual).toBeFalsy();
  });

  it("should navigate to the given path when clicked", async () => {
    // Arrange.
    const value = new ZRouteBuilder()
      .path("/components/image")
      .name("Image")
      .build();
    const target = await createTestTarget({ value });

    // Act.
    await target.click();

    // Assert.
    expect(_history.location.pathname).toEqual(value.path);
  });
});
