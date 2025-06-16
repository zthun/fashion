import {
  ZBox,
  ZCard,
  ZFormAuto,
  ZH3,
  ZIconFontAwesome,
  ZParagraph,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZFashionRouteFormAuto } from "../../routes.mjs";

export function ZFormAutoPage() {
  return (
    <ZCard
      className="ZFormMetaPage-root"
      TitleProps={{
        heading: ZFashionRouteFormAuto.name,
        subHeading: ZFashionRouteFormAuto.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteFormAuto.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Often times you just need to modify fields of an object. So what do
          most developers do? They build the form from scratch and tailor it to
          the exact need. The fashion system automatic form generates a form
          component given a series of metadata.
        </ZParagraph>

        <ZFormAuto />
      </ZBox>

      <ZH3>Options</ZH3>
    </ZCard>
  );
}
