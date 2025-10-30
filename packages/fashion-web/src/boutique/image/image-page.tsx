import {
  ZBox,
  ZCard,
  ZChoiceSelect,
  ZGrid,
  ZH3,
  ZIconFontAwesome,
  ZImage,
  ZParagraph,
  ZStack,
} from "@zthun/fashion-boutique";
import type { ZSize } from "@zthun/fashion-tailor";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { ZDataUrlBuilder, ZUrlBuilder } from "@zthun/webigail-url";
import type { Property } from "csstype";
import { useMemo, useState } from "react";
import { ZFashionRouteImage } from "../../routes.mjs";
import { ZChoiceDropDownSize } from "../common/choice-drop-down-size.js";

const Svg =
  '<svg focusable="false" viewBox="0 0 24 24" fill="white"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path></svg>';
const Png = new ZUrlBuilder().gravatar().build();
const Data = new ZDataUrlBuilder()
  .buffer(Svg)
  .encode("base64")
  .mimeType("image/svg+xml")
  .build();

export function ZImagePage() {
  const [width, setWidth] = useState<ZSize>();
  const [height, setHeight] = useState<ZSize>();
  const [fit, setFit] = useState<Property.ObjectFit>();
  const fixed: ZSize[] = useMemo(() => Object.values(ZSizeFixed), []);
  const varied: ZSize[] = useMemo(() => Object.values(ZSizeVaried), []);
  const sizes = useMemo(() => fixed.concat(varied), []);
  const fits = useMemo(
    () => ["fill", "contain", "cover", "none", "scale-down"],
    [],
  );

  return (
    <ZCard
      className="ZImagePage-root"
      TitleProps={{
        heading: ZFashionRouteImage.name,
        subHeading: ZFashionRouteImage.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteImage.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Images are great and make your site visual appealing. Fashion images
          supports support raster and vector graphics. It also supports data
          urls that embed the graphics within the url. If an SVG is supplied in
          this way, then it is directly added to the browser.
        </ZParagraph>

        <ZGrid columns={{ xl: "1fr 1fr", xs: "1fr" }} gap={ZSizeFixed.Medium}>
          <ZStack justify={{ content: "center" }} align={{ items: "center" }}>
            <ZImage src={Png} width={width} height={height} fit={fit} />
          </ZStack>
          <ZStack justify={{ content: "center" }} align={{ items: "center" }}>
            <ZImage src={Data} width={width} height={height} fit={fit} />
          </ZStack>
        </ZGrid>
      </ZBox>

      <ZH3>Options</ZH3>

      <ZGrid columns={{ xl: "1fr 1fr 1fr", sm: "1fr" }} gap={ZSizeFixed.Small}>
        <ZChoiceSelect
          options={fits}
          value={fit}
          onValueChange={setFit}
          label="Fit"
          name="fit"
        />
        <ZChoiceDropDownSize
          sizes={sizes}
          value={width}
          onValueChange={setWidth}
          label="Width"
          name="width"
        />
        <ZChoiceDropDownSize
          sizes={sizes}
          value={height}
          onValueChange={setHeight}
          label="Height"
          name="height"
        />
      </ZGrid>
    </ZCard>
  );
}
