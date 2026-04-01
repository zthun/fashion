import type { ReactNode } from "react";

import type { IZFormFieldRender } from "./form-field-render.mjs";

export class ZFormFieldRenderNothing implements IZFormFieldRender {
  public render(): ReactNode {
    return null;
  }
}
