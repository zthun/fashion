import { ZSizeFixed } from "@zthun/fashion-tailor";
import { cssJoinDefined } from "@zthun/helpful-fn";

import { ZAvatar } from "../avatar/avatar.js";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentValueReadonly } from "../component/component-value.mjs";
import type { IZRoute } from "../route/route.mjs";
import { useNavigate } from "../router/router-dom.mjs";
import { useRouteMatch } from "../router/use-route-match.mjs";
import { ZExplorerTreeNode } from "./explorer-tree-node.js";

/**
 * Properties for the {@link ZExplorerTreeNodeRoute} component.
 */
export interface IZExplorerTreeNodeRoute
  extends Required<IZComponentValueReadonly<IZRoute>>, IZComponentStyle {}

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
}: IZExplorerTreeNodeRoute) {
  const { avatar, name, path } = value;
  const isMatch = useRouteMatch();
  const navigate = useNavigate();

  return (
    <ZExplorerTreeNode
      className={cssJoinDefined("ZExplorerTreeNodeRoute-root", className)}
      avatar={<ZAvatar value={avatar} width={ZSizeFixed.ExtraSmall} />}
      prefix={name}
      highlight={isMatch(path)}
      onActivate={() => navigate(path)}
    />
  );
}
