import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { describe, expect, it } from "vitest";
import { ZImagePageComponentModel } from "./image-page.cm.mjs";
import { ZImagePage } from "./image-page.js";

describe("ZListPage", () => {
  async function createTestTarget() {
    const element = <ZImagePage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZImagePageComponentModel);
  }

  it("should render the page", async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
