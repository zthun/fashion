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
import { afterEach, describe, expect, it, vi } from "vitest";
import { ZBooleanComponentModel } from "../boolean/boolean.cm.mjs";
import { ZTextComponentModel } from "../text/text.cm.mjs";
import { ZFormButton } from "./form-button.js";
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
        <ZFormField metadata={ZBrandMetadata.$name()} />
        <ZFormField metadata={ZBrandMetadata.active()} />
        <ZFormField metadata={ZBrandMetadata.launched()} />
        <ZFormButton type="reset" />
        <ZFormButton />
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

  describe("Commit/BackOut", () => {
    const fillOutForm = async (target: ZFormComponentModel) => {
      const name = await target.field(ZBrandMetadata.$name().id);
      const active = await target.field(ZBrandMetadata.active().id);

      const _name = await name.text();
      const _active = await active.boolean();

      await _name?.keyboard("Salesforce");
      await _active?.toggle();
    };

    describe("Submit", () => {
      it("should submit the form", async () => {
        // Arrange.
        const onValueChange = vi.fn();
        const target = await createTestTarget({ onValueChange });
        await fillOutForm(target);
        const formButton = await target.button("submit");
        const submit = await formButton.underlying();

        // Act.
        await submit.click();

        // Assert.
        expect(onValueChange).toHaveBeenCalledTimes(1);
      });

      it("should be disabled if the form is clean", async () => {
        // Arrange.
        const target = await createTestTarget();
        const formButton = await target.button("submit");
        const button = await formButton.underlying();

        // Act.
        const actual = await button.disabled();

        // Assert.
        expect(actual).toBeTruthy();
      });

      it("should be enabled if the form is dirty", async () => {
        // Arrange.
        const target = await createTestTarget();
        await fillOutForm(target);
        const formButton = await target.button("submit");
        const button = await formButton.underlying();

        // Act.
        const actual = await button.disabled();

        // Assert.
        expect(actual).toBeFalsy();
      });
    });

    describe("Reset", () => {
      it("should reset the form", async () => {
        // Arrange.
        const onValueChange = vi.fn();
        const target = await createTestTarget({ onValueChange });
        await fillOutForm(target);
        const formButton = await target.button("reset");
        const reset = await formButton.underlying();

        // Act.
        await reset.click();

        // Assert.
        expect(await reset.disabled()).toBeTruthy();
        expect(onValueChange).not.toHaveBeenCalled();
      });
    });
  });
});
