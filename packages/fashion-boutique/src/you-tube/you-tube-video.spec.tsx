import type { IZCircusDriver, IZCircusSetup } from "@zthun/cirque";
import { ZCircusBy, ZCircusDestroy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { afterEach, describe, expect, it } from "vitest";
import { ZYouTubeVideoComponentModel } from "./you-tube-video.cm.mjs";
import { ZYouTubeVideo } from "./you-tube-video.js";

describe("YouTubeVideo", () => {
  const Video = "Vr2OkMB2Wr0";
  let _renderer: IZCircusSetup<IZCircusDriver>;
  let _driver: IZCircusDriver;

  const createTestTarget = async () => {
    const element = <ZYouTubeVideo identity={Video} />;
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZYouTubeVideoComponentModel);
  };

  afterEach(() => ZCircusDestroy.sequential(_driver, _renderer));

  it("should render the video with the correct id", async () => {
    // Arrange.
    const target = await createTestTarget();
    // Act.
    const actual = await target.identity();
    // Assert.
    expect(actual).toEqual(Video);
  });
});
