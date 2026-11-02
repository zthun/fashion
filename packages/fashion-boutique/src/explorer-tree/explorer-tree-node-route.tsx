import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";

import { ZAvatar } from "../avatar/avatar.js";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentValueReadonly } from "../component/component-value.mjs";
import type { IZRoute } from "../route/route.mjs";
import { useNavigate } from "../router/router-dom.mjs";
import type { ZRouteMatchStrategy } from "../router/use-route-matcher.mjs";
import { useRouteMatcher } from "../router/use-route-matcher.mjs";
import { ZExplorerTreeNode } from "./explorer-tree-node.js";

/**
 * Properties for the {@link ZExplorerTreeNodeRoute} component.
 */
export interface IZExplorerTreeNodeRoute
  extends Required<IZComponentValueReadonly<IZRoute>>, IZComponentStyle {
  matchStrategy?: ZRouteMatchStrategy;
}

/**
 * A basic explorer tree node that renders the
 * representation of an {@link IZRoute} object.
 *
 * A route node represents a leaf node in an explorer tree.
 * No children are allowed.
 */
export function ZExplorerTreeNodeRoute({
  className,
  value,
  matchStrategy,
}: IZExplorerTreeNodeRoute) {
  const { avatar, name, path } = value;
  const isMatch = useRouteMatcher();
  const navigate = useNavigate();

  return (
    <ZExplorerTreeNode
      className={cssJoinDefined("ZExplorerTreeNodeRoute-root", className)}
      avatar={<ZAvatar value={avatar} width={ZSizeFixed.ExtraSmall} />}
      heading={name}
      highlight={isMatch([path], { strategy: matchStrategy })}
      onActivate={() => navigate(path)}
    />
  );
}
