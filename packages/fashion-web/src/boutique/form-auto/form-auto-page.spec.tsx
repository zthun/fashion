import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { describe, expect, it } from "vitest";
import { ZImagePageComponentModel } from "./form-auto-page.cm.mjs";
import { ZFormAutoPage } from "./form-auto-page.js";

describe("ZFormAutoPage", () => {
  async function createTestTarget() {
    const element = <ZFormAutoPage />;
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
