import { cloneDeep, isUndefined, omitBy } from "lodash-es";

import type { IZIconFontAwesome } from "../icon/icon-font-awesome.js";

export interface IZAvatarFontAwesome
  extends
    Required<Pick<IZIconFontAwesome, "name">>,
    Pick<IZIconFontAwesome, "animation" | "family" | "style"> {}

export class ZAvatarFontAwesomeBuilder {
  private _avatar: IZAvatarFontAwesome = { name: "user" };

  public name(name: string): this {
    this._avatar.name = name;
    return this;
  }

  public family(family: IZAvatarFontAwesome["family"] | undefined): this {
    this._avatar.family = family;
    return this;
  }

  public animation(
    animation: IZAvatarFontAwesome["animation"] | undefined,
  ): this {
    this._avatar.animation = animation;
    return this;
  }

  public style(style: IZAvatarFontAwesome["style"] | undefined): this {
    this._avatar.style = style;
    return this;
  }

  public build(): IZAvatarFontAwesome {
    const avatar = cloneDeep(this._avatar);
    return omitBy(avatar, isUndefined) as IZAvatarFontAwesome;
  }
}

export function isAvatarFontAwesome(candidate: unknown) {
  return (
    candidate != null &&
    typeof candidate === "object" &&
    Object.hasOwn(candidate, "name")
  );
}
