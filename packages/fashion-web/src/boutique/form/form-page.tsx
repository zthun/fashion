import {
  ZBox,
  ZCard,
  ZForm,
  ZFormField,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import type { IZBrand } from "@zthun/helpful-brands";
import { ZBrandBuilder } from "@zthun/helpful-brands";
import { ZMetadataBuilder } from "@zthun/helpful-query";
import { useState } from "react";
import { ZFashionRouteForm } from "../../routes.mjs";

const metaName = new ZMetadataBuilder()
  .id("name")
  .path("name")
  .name("Name")
  .text()
  .editable()
  .build();

const metaOwner = new ZMetadataBuilder()
  .id("owner")
  .path("owner")
  .name("Owner")
  .text()
  .editable()
  .build();

const metaFounded = new ZMetadataBuilder()
  .id("founded")
  .path("founded")
  .name("Year Founded")
  .number()
  .editable()
  .build();

export function ZFormPage() {
  const [value, setValue] = useState<IZBrand>(new ZBrandBuilder().build());

  return (
    <ZCard
      className="ZFormPage-root"
      TitleProps={{
        heading: ZFashionRouteForm.name,
        subHeading: ZFashionRouteForm.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteForm.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Forms are commonly used in many apps to gather information about a
          state from the user. In single page applications, forms tend to be
          less useful since you are not sending form data back to your backend
          and you often have a rest api that acts as the intermittent way to
          save the data.
        </ZParagraph>

        <ZParagraph>
          The Zthunworks Fashion system uses forms in a different way -- instead
          of a transport layer to send data back to your rest api backend, they
          are used to generate a set of inputs based on the metadata of the
          fields you want to modify.
        </ZParagraph>

        <ZForm value={value} onValueChange={setValue}>
          <ZFormField meta={metaName} />
          <ZFormField meta={metaOwner} />
          <ZFormField meta={metaFounded} />
        </ZForm>
      </ZBox>

      <ZH3>Options</ZH3>
    </ZCard>
  );
}
