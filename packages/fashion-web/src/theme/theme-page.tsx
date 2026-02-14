import {
  ZCard,
  ZGrid,
  ZH3,
  ZH4,
  ZIconFontAwesome,
  ZParagraph,
  ZStack,
  useFashionTheme,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZFashionRouteTheme } from "../routes.mjs";
import { ZFashionColors } from "./color/fashion-colors.js";

/**
 * Represents the theme page.
 *
 * @returns The JSX to render the theme page.
 */
export function ZThemePage() {
  const {
    primary,
    secondary,
    tertiary,
    success,
    warning,
    error,
    info,
    light,
    dark,
    body,
    surface,
    component,
  } = useFashionTheme();

  return (
    <ZCard
      className="ZThemePage-root"
      TitleProps={{
        heading: ZFashionRouteTheme.name,
        subHeading: ZFashionRouteTheme.description,
        avatar: (
          <ZIconFontAwesome
            name={ZFashionRouteTheme.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZStack gap={ZSizeFixed.ExtraLarge}>
        <ZParagraph compact>
          A fashion theme describes the different makeup of page colors that are
          used across common places in a website.
        </ZParagraph>

        <ZH3 compact>Priority</ZH3>

        <ZGrid
          columns={{ xl: "1fr 1fr 1fr", lg: "1fr 1fr", md: "1fr" }}
          gap={ZSizeFixed.Medium}
        >
          <ZFashionColors fashion={primary} />
          <ZFashionColors fashion={secondary} />
          <ZFashionColors fashion={tertiary} />
        </ZGrid>

        <ZH4 compact>Severity</ZH4>

        <ZGrid
          columns={{ xl: "1fr 1fr 1fr", lg: "1fr 1fr", md: "1fr" }}
          gap={ZSizeFixed.Medium}
        >
          <ZFashionColors fashion={success} />
          <ZFashionColors fashion={warning} />
          <ZFashionColors fashion={error} />
          <ZFashionColors fashion={info} />
        </ZGrid>

        <ZH4 compact>Area</ZH4>

        <ZGrid
          columns={{ xl: "1fr 1fr 1fr", lg: "1fr 1fr", md: "1fr" }}
          gap={ZSizeFixed.Medium}
        >
          <ZFashionColors fashion={body} />
          <ZFashionColors fashion={surface} />
          <ZFashionColors fashion={component} />
        </ZGrid>

        <ZH4>Contrast</ZH4>

        <ZGrid
          columns={{ xl: "1fr 1fr 1fr", lg: "1fr 1fr", md: "1fr" }}
          gap={ZSizeFixed.Medium}
        >
          <ZFashionColors fashion={light} />
          <ZFashionColors fashion={dark} />
        </ZGrid>
      </ZStack>
    </ZCard>
  );
}
