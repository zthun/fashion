import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZOrientation } from "@zthun/helpful-fn";

import { ZAvatar } from "../avatar/avatar.js";
import type { IZComponentValueReadonly } from "../component/component-value.mjs";
import { ZLink } from "../link/link.js";
import { type IZRoute } from "../route/route.mjs";
import { ZStack } from "../stack/stack.js";
import { useFashionTheme } from "../theme/fashion.mjs";
import { useExplorer } from "./use-explorer.mjs";

export interface IZExplorerExternals extends IZComponentValueReadonly<
  IZRoute[]
> {}

export function ZExplorerExternals({ value }: IZExplorerExternals) {
  const { inherit } = useFashionTheme();
  const { expanded } = useExplorer();

  const renderValue = ({ avatar, path }: IZRoute) => {
    const label = (
      <ZAvatar
        value={avatar}
        height={ZSizeFixed.Small}
        width={ZSizeFixed.Small}
      />
    );
    return (
      <ZLink
        key={path}
        href={path}
        target="_blank"
        label={label}
        fashion={inherit}
      />
    );
  };

  const renderValues = () => {
    return value?.map((v) => renderValue(v));
  };

  return (
    <ZStack
      className="ZExplorerExternals-root"
      gap={ZSizeFixed.ExtraSmall}
      align={{ items: "center" }}
      justify={{ content: expanded ? "flex-end" : "center" }}
      orientation={expanded ? ZOrientation.Horizontal : ZOrientation.Vertical}
    >
      {renderValues()}
    </ZStack>
  );
}
