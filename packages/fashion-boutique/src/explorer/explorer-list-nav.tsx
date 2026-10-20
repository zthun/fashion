import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZOrientation } from "@zthun/helpful-fn";
import { useCallback, useMemo } from "react";

import { ZAvatar } from "../avatar/avatar.js";
import type { IZComponentValueReadonly } from "../component/component-value.mjs";
import { ZList } from "../list/list.js";
import { ZListItem } from "../list/list-item.js";
import type { IZRoute } from "../route/route.mjs";
import { useLocation, useNavigate } from "../router/router-dom.mjs";
import { ZStack } from "../stack/stack.js";
import { ZSubtitle } from "../typography/typography.js";
import { useExplorer } from "./use-explorer.mjs";

export interface IZExplorerListNav extends IZComponentValueReadonly<
  IZRoute[]
> {}

export function ZExplorerListNav({ value }: IZExplorerListNav) {
  const { expanded } = useExplorer();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const _pathname = useMemo(
    () =>
      pathname
        .split("/")
        .filter((x) => !!x)
        .join("/"),
    [pathname],
  );

  const isMatch = useCallback(
    (route: IZRoute) => {
      const { path } = route;
      const _path = path
        .split("/")
        .filter((x) => !!x)
        .join("/");

      return _path === _pathname;
    },
    [_pathname],
  );

  const renderRoute = (route: IZRoute) => {
    const avatar = (
      <ZAvatar
        value={route.avatar}
        width={ZSizeFixed.ExtraSmall}
        height={ZSizeFixed.ExtraSmall}
      />
    );
    const label = <ZSubtitle compact>{route.name}</ZSubtitle>;

    const nodes = [avatar];

    if (expanded) {
      nodes.push(label);
    }

    return (
      <ZListItem
        compact
        interactive
        cursor="pointer"
        key={route.path}
        name={route.name}
        highlight={isMatch(route)}
        onClick={() => navigate(route.path)}
      >
        <ZStack
          align={{ items: "center" }}
          orientation={ZOrientation.Horizontal}
          gap={ZSizeFixed.Small}
          justify={{ content: expanded ? "start" : "center" }}
        >
          {nodes}
        </ZStack>
      </ZListItem>
    );
  };

  return (
    <ZList className="ZExplorerListNav-root" compact>
      {value?.map((v) => renderRoute(v))}
    </ZList>
  );
}
