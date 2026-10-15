import { ZSizeVaried } from "@zthun/fashion-tailor";

import type { IZComponentValueReadonly } from "../component/component-value.mjs";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZImage } from "../image/image.js";
import type { IZAvatarDescriptor } from "./avatar-descriptor.mjs";
import { isAvatarFontAwesome } from "./avatar-font-awesome.mjs";
import { isAvatarImage } from "./avatar-image.mjs";

export interface IZAvatar extends IZComponentValueReadonly<IZAvatarDescriptor> {}

export function ZAvatar({ value }: IZAvatar) {
  // TODO: This breaks the open close principle.  Will fix later.
  if (isAvatarImage(value)) {
    return (
      <ZImage
        className="ZAvatar-root"
        src={value.src}
        height={ZSizeVaried.Full}
        width={ZSizeVaried.Full}
        fit="scale-down"
      />
    );
  }

  if (isAvatarFontAwesome(value)) {
    return (
      <ZIconFontAwesome
        className="ZAvatar-root"
        name={value?.name}
        family={value?.family}
        animation={value?.animation}
      />
    );
  }

  return <div className="ZAvatar-root" />;
}
