import { ZUrlBuilder } from "@zthun/webigail-url";
import { cloneDeep } from "lodash-es";

import type { IZImageSource } from "../image/image.js";

export interface IZAvatarImage extends Required<Pick<IZImageSource, "src">> {}

export class ZAvatarImageBuilder {
  private _image: IZAvatarImage = { src: new ZUrlBuilder().gravatar().build() };

  public src(src: string) {
    this._image.src = src;
    return this;
  }

  public build() {
    return cloneDeep(this._image);
  }
}

export function isAvatarImage(candidate: unknown): candidate is IZAvatarImage {
  return (
    candidate != null &&
    typeof candidate === "object" &&
    Object.hasOwn(candidate, "src")
  );
}
