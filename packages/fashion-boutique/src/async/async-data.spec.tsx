import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZAsyncLoading } from "@zthun/helpful-react";
import type { FunctionComponent } from "react";
import { afterEach, describe, expect, it } from "vitest";

import { ZBoxComponentModel } from "../box/box.cm.mjs";
import { ZBox } from "../box/box.js";
import type { IZAsyncData } from "./async-data.js";
import { ZAsyncDataError } from "./async-data-error.js";
import { ZAsyncDataLoaded } from "./async-data-loaded.js";
import { ZAsyncDataLoading } from "./async-data-loading.js";

describe("ZAsyncData", () => {
  const error = new Error("Something went wrong");
  const data = "My data loaded successfully";

  let _renderer: IZCircusSetup | undefined;
  let _driver: IZCircusDriver | undefined;

  const createTestTarget = async <V, C>(
    Component: FunctionComponent<IZAsyncData<V, C>>,
    props: Omit<IZAsyncData<V, C>, "children">,
  ) => {
    const { value } = props;

    const renderChild = () => <ZBox className="ZAsync-root" />;
    const element = <Component value={value}>{renderChild}</Component>;

    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.optional(_driver, ZBoxComponentModel);
  };

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  describe("Loading", () => {
    it("should render if the data is loading", async () => {
      expect(
        await createTestTarget(ZAsyncDataLoading, { value: ZAsyncLoading }),
      ).toBeTruthy();
    });

    it("should not render if the data is errored", async () => {
      expect(
        await createTestTarget(ZAsyncDataLoading, { value: error }),
      ).toBeFalsy();
    });

    it("should not render if the data is loaded", async () => {
      expect(
        await createTestTarget(ZAsyncDataLoading, { value: data }),
      ).toBeFalsy();
    });
  });

  describe("Error", () => {
    it("should not render if the data is loading", async () => {
      expect(
        await createTestTarget(ZAsyncDataError, { value: ZAsyncLoading }),
      ).toBeFalsy();
    });

    it("should render if the data is errored", async () => {
      expect(
        await createTestTarget(ZAsyncDataError, { value: error }),
      ).toBeTruthy();
    });

    it("should not render if the data is loaded", async () => {
      expect(
        await createTestTarget(ZAsyncDataError, { value: data }),
      ).toBeFalsy();
    });
  });

  describe("Loaded", () => {
    it("should not render if the data is loading", async () => {
      expect(
        await createTestTarget(ZAsyncDataLoaded, { value: ZAsyncLoading }),
      ).toBeFalsy();
    });

    it("should not render if the data is errored", async () => {
      expect(
        await createTestTarget(ZAsyncDataLoaded, { value: error }),
      ).toBeFalsy();
    });

    it("should render if the data is loaded", async () => {
      expect(
        await createTestTarget(ZAsyncDataLoaded, { value: data }),
      ).toBeTruthy();
    });
  });
});
