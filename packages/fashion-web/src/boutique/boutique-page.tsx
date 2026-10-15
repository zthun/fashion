import type { IZRoute } from "@zthun/fashion-boutique";
import {
  useFashionTheme,
  useNavigate,
  ZAvatar,
  ZCaption,
  ZCard,
  ZContentTitle,
  ZGrid,
  ZH3,
  ZTile,
} from "@zthun/fashion-boutique";
import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";

import {
  ZFashionRouteAllComponents,
  ZFashionRouteBoutique,
} from "../routes.mjs";

/**
 * Represents the components page.
 *
 * @returns
 *        The JSX to render the page.
 */
export function ZBoutiquePage() {
  const { body } = useFashionTheme();
  const navigate = useNavigate();

  const renderComponent = (route: IZRoute) => (
    <ZTile
      className={cssJoinDefined("ZBoutiquePage-component")}
      fashion={body}
      key={route.path}
      onActivate={() => navigate(route.path)}
    >
      <ZContentTitle
        avatar={<ZAvatar value={route.avatar} width={ZSizeFixed.Small} />}
        heading={<ZH3 compact>{route.name}</ZH3>}
        subHeading={<ZCaption compact>{route.description}</ZCaption>}
      />
    </ZTile>
  );

  return (
    <ZCard
      className="ZBoutiquePage-root"
      TitleProps={{
        heading: ZFashionRouteBoutique.name,
        subHeading: ZFashionRouteBoutique.description,
        avatar: (
          <ZAvatar
            value={ZFashionRouteBoutique.avatar}
            width={ZSizeFixed.Medium}
          />
        ),
      }}
    >
      <ZGrid
        columns={{
          xl: "1fr 1fr 1fr 1fr",
          lg: "1fr 1fr 1fr",
          md: "1fr 1fr",
          sm: "1fr",
        }}
        gap={ZSizeFixed.Medium}
      >
        {ZFashionRouteAllComponents.map(renderComponent)}
      </ZGrid>
    </ZCard>
  );
}
