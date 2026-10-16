import {
  useFashionTheme,
  ZAvatar,
  ZCard,
  ZGrid,
  ZH3,
  ZH4,
  ZParagraph,
  ZStack,
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
          <ZAvatar
            value={ZFashionRouteTheme.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZStack gap={ZSizeFixed.ExtraLarge}>
        <ZStack gap={ZSizeFixed.Medium}>
          <ZParagraph compact>
            The Zthunworks fashion system is a set of helper libraries that make
            it easier to quickly build a small web application. Small web
            applications are easier to maintain and having a lot of small web
            applications that all look and feel similar creates a better user
            experience. One of the best examples of taking a Monolith
            application and converting it down to smaller pieces was iTunes by
            Apple. While iTunes was excellent for playing and managing music,
            the features to manage movies and photos was out of place and caused
            iTunes to become very bloated with features. Apple eventually split
            the Monolith into Music, Photos, Podcasts, Books and TV.
          </ZParagraph>

          <ZParagraph compact>
            Fashion is built around this philosophy; users are most productive
            when they are focused on a single task at a time.
          </ZParagraph>

          <ZParagraph compact>
            At the root of the entire system is the theme. The theme describes
            the color scheme of your page and simplifies the way you handle the
            visual aspect of your site.
          </ZParagraph>
        </ZStack>

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
