import {
  type IZCircusDriver,
  type IZCircusSetup,
  ZCircusBy,
  ZCircusDestroy,
} from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import type { MemoryHistory } from "history";
import { createMemoryHistory } from "history";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ZAvatarFontAwesomeBuilder } from "../avatar/avatar-font-awesome.mjs";
import { ZRouteBuilder } from "../route/route.mjs";
import { ZTestRouter } from "../router/test-router.js";
import { ZExplorerListNavComponentModel } from "./explorer-list-nav.cm.mjs";
import type { IZExplorerListNav } from "./explorer-list-nav.js";
import { ZExplorerListNav } from "./explorer-list-nav.js";
import type { IZExplorerState } from "./use-explorer.mjs";
import { ZExplorerContext } from "./use-explorer.mjs";

describe("ZExplorerListNav", () => {
  const avatarFile = new ZAvatarFontAwesomeBuilder().name("file").build();
  const avatarFolder = new ZAvatarFontAwesomeBuilder().name("folder").build();

  const alpha = new ZRouteBuilder()
    .avatar(avatarFile)
    .name("Alpha")
    .path("/alpha")
    .build();
  const bravo = new ZRouteBuilder()
    .avatar(avatarFolder)
    .name("Bravo")
    .path("/bravo")
    .build();

  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;
  let history: MemoryHistory;

  beforeEach(() => {
    history = createMemoryHistory({ initialEntries: ["/alpha"] });
  });

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  const createTestTarget = async (
    props?: Partial<IZExplorerListNav>,
    explorer?: Partial<IZExplorerState>,
  ) => {
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZExplorerContext value={{ ...explorer }}>
          <ZExplorerListNav {...props} />
        </ZExplorerContext>
      </ZTestRouter>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();

    return ZCircusBy.first(_driver, ZExplorerListNavComponentModel);
  };

  it("should render a list item for each route", async () => {
    // Arrange.
    const target = await createTestTarget(
      { value: [alpha, bravo] },
      { expanded: true },
    );
    const list = await target.list();

    // Act.
    const _alpha = await list.item(alpha.name!);
    const _bravo = await list.item(bravo.name!);

    // Assert.
    expect(_alpha).toBeTruthy();
    expect(_bravo).toBeTruthy();
  });

  it("should navigate to the route path when clicked", async () => {
    // Arrange.
    const target = await createTestTarget({ value: [alpha, bravo] });
    const list = await target.list();
    const _bravo = await list.item(bravo.name!);

    // Act.
    await _bravo?.click();

    // Assert.
    expect(history.location.pathname).toEqual(bravo.path);
  });
});
