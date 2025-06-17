import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { describe, expect, it } from "vitest";
import { ZFormPageComponentModel } from "./form-page.cm.mjs";
import { ZFormPage } from "./form-page.js";

describe("ZFormAutoPage", () => {
  async function createTestTarget() {
    const element = <ZFormPage />;
    const driver = await new ZCircusSetupRenderer(element).setup();
    return ZCircusBy.first(driver, ZFormPageComponentModel);
  }

  it("should render the page", async () => {
    // Arrange.
    // Act.
    const target = await createTestTarget();
    // Assert.
    expect(target).toBeTruthy();
  });
});
