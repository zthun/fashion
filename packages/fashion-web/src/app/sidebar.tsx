import {
  ZAvatar,
  ZDivider,
  ZExplorerTreeNode,
  ZExplorerTreeNodeRoute,
  ZFlex,
  ZStack,
} from "@zthun/fashion-boutique";
import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";

import {
  ZFashionRouteAllComponents,
  ZFashionRouteBoutique,
  ZFashionRouteHome,
  ZFashionRouteTheme,
} from "../routes.mjs";

export function ZFashionSidebar() {
  return (
    <ZStack height={ZSizeVaried.Full}>
      <ZExplorerTreeNode
        nonInteractive
        avatar={
          <ZAvatar
            value={ZFashionRouteHome.avatar}
            height={ZSizeFixed.Small}
            width={ZSizeFixed.Small}
          />
        }
        heading={ZFashionRouteHome.name}
      />
      <ZDivider />
      <ZFlex grow={1}>
        <ZExplorerTreeNodeRoute value={ZFashionRouteTheme} />
        <ZExplorerTreeNode
          avatar={
            <ZAvatar
              value={ZFashionRouteBoutique.avatar}
              width={ZSizeFixed.ExtraSmall}
            />
          }
          heading={ZFashionRouteBoutique.name}
        >
          {ZFashionRouteAllComponents.map((c) => (
            <ZExplorerTreeNodeRoute value={c} key={c.path} />
          ))}
        </ZExplorerTreeNode>
      </ZFlex>
    </ZStack>
  );
}
