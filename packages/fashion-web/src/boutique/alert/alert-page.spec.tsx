import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZTestRouter } from "@zthun/fashion-boutique";
import type { ZFashionName } from "@zthun/fashion-theme";
import { ZFashionPriority, ZFashionSeverity } from "@zthun/fashion-theme";
import { createMemoryHistory } from "history";
import { lowerCase } from "lodash-es";
import { afterEach, describe, expect, it } from "vitest";

import { ZAlertPageComponentModel } from "./alert-page.cm.mjs";
import { ZAlertPage } from "./alert-page.js";

describe("ZAlertPage", () => {
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  async function createTestTarget() {
    const history = createMemoryHistory();
    const element = (
      <ZTestRouter location={history.location} navigator={history}>
        <ZAlertPage />
      </ZTestRouter>
    );

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZAlertPageComponentModel);
  }

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  describe("Message", () => {
    it("should render the message.", async () => {
      // Arrange.
      const target = await createTestTarget();
      // Act.
      const alert = await target.alert();
      const actual = await (await alert.message()).text();
      // Assert.
      expect(actual).toBeTruthy();
    });
  });

  describe("Header", () => {
    it("should render when the toggle is on", async () => {
      // Arrange.
      const target = await createTestTarget();
      const header = await target.header();
      await header.toggle(false);
      // Act.
      await header.toggle(true);
      const actual = await (await target.alert()).heading();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should not render when the toggle is off", async () => {
      // Arrange.
      const target = await createTestTarget();
      const header = await target.header();
      await header.toggle(true);
      // Act.
      await header.toggle(false);
      const actual = await (await target.alert()).heading();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Avatar", () => {
    it("should render when the toggle is on", async () => {
      // Arrange.
      const target = await createTestTarget();
      const avatar = await target.avatar();
      await avatar.toggle(false);
      // Act.
      await avatar.toggle(true);
      const actual = await (await target.alert()).avatar();
      // Assert.
      expect(actual).toBeTruthy();
    });

    it("should not render when the toggle is off", async () => {
      // Arrange.
      const target = await createTestTarget();
      const avatar = await target.avatar();
      await avatar.toggle(true);
      // Act.
      await avatar.toggle(false);
      const actual = await (await target.alert()).avatar();
      // Assert.
      expect(actual).toBeFalsy();
    });
  });

  describe("Fashion", () => {
    const shouldUpdateFashionTo = async (expected: ZFashionName) => {
      // Arrange.
      const target = await createTestTarget();
      const fashion = await target.fashion();
      // Act.
      await fashion.select(expected);
      const alert = await target.alert();
      const actual = await alert.fashion();
      // Assert.
      expect(lowerCase(actual)).toEqual(expected);
    };

    it("should update the fashion to secondary", () =>
      shouldUpdateFashionTo(ZFashionPriority.Secondary));
    it("should update the fashion to success", async () =>
      shouldUpdateFashionTo(ZFashionSeverity.Success));
  });
});
