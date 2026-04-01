import type { IZMetadata } from "@zthun/helpful-query";
import type { ReactNode } from "react";

import type { IZFormState } from "./form-state.mjs";

export interface IZFormFieldRender {
  render(state: IZFormState, meta: IZMetadata): ReactNode;
}
