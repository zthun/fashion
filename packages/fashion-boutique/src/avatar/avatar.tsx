import { ZSizeFixed } from "@zthun/fashion-tailor";

import type { IZComponentFashion } from "../component/component-fashion.mjs";
import type { IZComponentHeight } from "../component/component-height.mjs";
import type { IZComponentValueReadonly } from "../component/component-value.mjs";
import type { IZComponentWidth } from "../component/component-width.mjs";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZImage } from "../image/image.js";
import type { IZAvatarDescriptor } from "./avatar-descriptor.mjs";
import { isAvatarFontAwesome } from "./avatar-font-awesome.mjs";
import { isAvatarImage } from "./avatar-image.mjs";

export interface IZAvatar
  extends
    IZComponentValueReadonly<IZAvatarDescriptor>,
    IZComponentWidth<ZSizeFixed>,
    IZComponentHeight<ZSizeFixed>,
    IZComponentFashion {}

export function ZAvatar({
  fashion,
  value,
  width = ZSizeFixed.Medium,
  height = ZSizeFixed.Medium,
}: IZAvatar) {
  // TODO: This breaks the open close principle.  Will fix later.
  if (isAvatarImage(value)) {
    return (
      <ZImage
        className="ZAvatar-root"
        src={value.src}
        height={height}
        width={width}
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
        width={width}
        fashion={fashion}
      />
    );
  }

  return <div className="ZAvatar-root" />;
}
