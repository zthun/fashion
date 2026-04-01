import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import type { IZTypographyNamed } from "./typography.js";
import {
  Typography,
  ZButtonText,
  ZCaption,
  ZH1,
  ZH2,
  ZH3,
  ZH4,
  ZH5,
  ZH6,
  ZParagraph,
  ZSubtitle,
} from "./typography.js";

describe("Typography", () => {
  let _renderers: IZCircusSetup[];
  let _drivers: IZCircusDriver[];

  afterEach(() => ZCircusDestroy.sequential(..._drivers, ..._renderers));

  beforeEach(() => {
    _renderers = [];
    _drivers = [];
  });

  async function createTestTarget(
    Typography: (props: IZTypographyNamed) => ReactElement,
  ) {
    const element = <Typography className="ZTypography-test"></Typography>;
    const renderer = new ZCircusSetupRenderer(element);
    const driver = await renderer.setup();
    _renderers.push(renderer);
    _drivers.push(driver);
    return driver.select(".ZTypography-test");
  }

  async function assertTypography(
    expected: string,
    Typography: (props: IZTypographyNamed) => ReactElement,
  ) {
    // Arrange
    const target = await createTestTarget(Typography);
    // Act
    const actual = (await target.tag()).toLowerCase();
    // Assert
    expect(actual).toEqual(expected);
  }

  describe("Generic", () => {
    it("should render generic typography", async () => {
      await assertTypography("div", Typography);
    });
  });

  describe("Headers", () => {
    it("should render an h1 tag", async () => {
      await assertTypography("h1", ZH1);
    });

    it("should render an h2 tag", async () => {
      await assertTypography("h2", ZH2);
    });

    it("should render an h3 tag", async () => {
      await assertTypography("h3", ZH3);
    });

    it("should render an h4 tag", async () => {
      await assertTypography("h4", ZH4);
    });

    it("should render an h5 tag", async () => {
      await assertTypography("h5", ZH5);
    });

    it("should render an h5 tag", async () => {
      await assertTypography("h6", ZH6);
    });
  });

  describe("Text", () => {
    it("should render a paragraph", async () => {
      await assertTypography("p", ZParagraph);
    });

    it("should render a subtitle", async () => {
      await assertTypography("sub", ZSubtitle);
    });

    it("should render a caption", async () => {
      await assertTypography("sub", ZCaption);
    });

    it("should render an button text", async () => {
      await assertTypography("div", ZButtonText);
    });
  });
});
