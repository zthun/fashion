import {
  useFashionTheme,
  ZBox,
  ZCaption,
  ZCard,
  ZForm,
  ZFormButtonSubmit,
  ZFormField,
  ZH3,
  ZH4,
  ZIconFontAwesome,
  ZParagraph,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import type { IZBrand } from "@zthun/helpful-brands";
import { ZBrandKnown, ZBrandMetadata } from "@zthun/helpful-brands";
import { useMemo, useState } from "react";
import { ZFashionRouteForm } from "../../routes.mjs";

export function ZFormPage() {
  const { primary } = useFashionTheme();
  const [value, setValue] = useState<IZBrand>(ZBrandKnown.apple());
  const metadataName = useMemo(() => ZBrandMetadata.$name(), []);
  const metadataOwner = useMemo(() => ZBrandMetadata.owner(), []);
  const metadataActive = useMemo(() => ZBrandMetadata.active(), []);
  const metadataLaunched = useMemo(() => ZBrandMetadata.launched(), []);

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
          <ZStack gap={ZSizeFixed.Small}>
            <ZFormField meta={metadataName} />
            <ZFormField meta={metadataOwner} />
            <ZFormField meta={metadataLaunched} />
            <ZFormField meta={metadataActive} />
            <ZFormButtonSubmit ButtonProps={{ label: "Save" }} />
          </ZStack>
        </ZForm>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH4>Value</ZH4>
        <ZBox
          fashion={primary}
          border={{ width: ZSizeFixed.Medium, style: "solid" }}
          padding={ZSizeFixed.Small}
        >
          <pre>
            <ZCaption>{JSON.stringify(value, undefined, 2)}</ZCaption>
          </pre>
        </ZBox>
      </ZBox>
    </ZCard>
  );
}
