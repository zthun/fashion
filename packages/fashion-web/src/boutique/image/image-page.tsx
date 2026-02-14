import {
  ZBox,
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
import { ZOrientation } from "@zthun/helpful-fn";
import { ZUrlBuilder } from "@zthun/webigail-url";
import type { Property } from "csstype";
import { useMemo, useState } from "react";
import { ZFashionRouteImage } from "../../routes.mjs";
import { ZCardDemoComponent } from "../common/card-demo-component.js";
import { ZChoiceDropDownSize } from "../common/choice-drop-down-size.js";

const Png = new ZUrlBuilder().gravatar().build();

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
    <ZCardDemoComponent
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

        <ZStack
          orientation={ZOrientation.Horizontal}
          justify={{ content: "center" }}
          width={ZSizeVaried.Full}
        >
          <ZImage src={Png} width={width} height={height} fit={fit} />
        </ZStack>
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
    </ZCardDemoComponent>
  );
}
