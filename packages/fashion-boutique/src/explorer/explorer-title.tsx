import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZOrientation } from "@zthun/helpful-fn";

import { ZAvatar } from "../avatar/avatar.js";
import type { IZAvatarDescriptor } from "../avatar/avatar-descriptor.mjs";
import { ZBox } from "../box/box.js";
import type { IZComponentHeading } from "../component/component-heading.mjs";
import { ZFlex } from "../stack/flex.js";
import { ZStack } from "../stack/stack.js";
import { ZH3 } from "../typography/typography.js";
import { useExplorer } from "./use-explorer.mjs";

export interface IZExplorerTitle extends Pick<IZComponentHeading, "heading"> {
  avatar?: IZAvatarDescriptor;
}

export function ZExplorerTitle({ avatar, heading }: IZExplorerTitle) {
  const { expanded } = useExplorer();

  const renderAvatar = () =>
    avatar ? (
      <ZAvatar
        value={avatar}
        height={ZSizeFixed.Small}
        width={ZSizeFixed.Small}
      />
    ) : null;

  const renderHeading = () =>
    heading && expanded ? (
      <ZFlex grow={1}>
        <ZH3 compact Element="div">
          {heading}
        </ZH3>
      </ZFlex>
    ) : null;

  return (
    <ZBox className="ZExplorerTitle-root" padding={ZSizeFixed.ExtraSmall}>
      <ZStack
        orientation={ZOrientation.Horizontal}
        gap={ZSizeFixed.ExtraSmall}
        align={{ items: "center" }}
      >
        {renderAvatar()}
        {renderHeading()}
      </ZStack>
    </ZBox>
  );
}
