import type {
  IZCircusDriver,
  IZCircusSetup,
  ZCircusComponentConstructor,
  ZCircusComponentModel,
} from "@zthun/cirque";
import { ZCircusBy } from "@zthun/cirque";
import { ZCircusSetupRenderer } from "@zthun/cirque-du-react";
import { ZBrandMetadata } from "@zthun/helpful-brands";
import type { IZMetadata } from "@zthun/helpful-query";
import { afterEach, describe, expect, it } from "vitest";
import { ZBooleanComponentModel } from "../boolean/boolean.cm.mjs";
import { ZTextComponentModel } from "../text/text.cm.mjs";
import { ZFormField } from "./form-field.js";
import { ZFormComponentModel } from "./form.cm.mjs";
import type { IZForm } from "./form.js";
import { ZForm } from "./form.js";

describe("ZForm", () => {
  let _renderer: IZCircusSetup;
  let _driver: IZCircusDriver;

  const createTestTarget = async (props?: IZForm) => {
    const element = (
      <ZForm {...props}>
        <ZFormField meta={ZBrandMetadata.$name()} />
        <ZFormField meta={ZBrandMetadata.active()} />
        <ZFormField meta={ZBrandMetadata.launched()} />
      </ZForm>
    );
    _renderer = new ZCircusSetupRenderer(element);
    _driver = await _renderer.setup();
    return ZCircusBy.first(_driver, ZFormComponentModel);
  };

  afterEach(() => {
    _driver?.destroy?.call(_driver);
    _renderer?.destroy?.call(_renderer);
  });

  describe("Render", () => {
    const shouldRenderComponent = async <T extends ZCircusComponentModel>(
      meta: IZMetadata,
      ctor: ZCircusComponentConstructor<T>,
    ) => {
      // Arrange.
      const { id } = meta;
      const target = await createTestTarget();
      const field = await target.field(id);

      // Act.
      const actual = ZCircusBy.first(field!.driver, ctor);

      // Assert.
      expect(actual).toBeTruthy();
    };

    describe("Text", () => {
      it("should render a text input", async () => {
        await shouldRenderComponent(
          ZBrandMetadata.$name(),
          ZTextComponentModel,
        );
      });
    });

    describe("Boolean", () => {
      it("should render a switch", async () => {
        await shouldRenderComponent(
          ZBrandMetadata.active(),
          ZBooleanComponentModel,
        );
      });
    });
  });
});
