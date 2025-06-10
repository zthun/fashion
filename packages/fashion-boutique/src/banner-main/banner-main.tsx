import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZBanner } from "../banner/banner.js";
import { ZBox } from "../box/box.js";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import type { IZContentTitle } from "../content-title/content-title.js";
import { ZContentTitle } from "../content-title/content-title.js";
import { useFashionTheme } from "../theme/fashion.mjs";
import { ZStyled } from "../theme/styled.js";

export interface IZBannerMain extends IZComponentHierarchy {
  TitleProps?: IZContentTitle;
}

/**
 * Represents a layout that uses a banner with main content.
 */
export function ZBannerMain(props: IZBannerMain) {
  const { children, TitleProps } = props;
  const { primary } = useFashionTheme();

  return (
    <ZStyled className="ZBannerMain-root">
      <ZBanner className="ZBannerMain-header" fashion={primary}>
        <ZContentTitle {...TitleProps} />
      </ZBanner>
      <ZBox padding={ZSizeFixed.Large}>
        <main className="ZBannerMain-content">{children}</main>
      </ZBox>
    </ZStyled>
  );
}
