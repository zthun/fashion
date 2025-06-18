import { firstDefined } from "@zthun/helpful-fn";
import type { IZMetadata } from "@zthun/helpful-query";
import { get, set } from "lodash-es";
import type { ReactNode } from "react";
import { ZTextInput } from "../index.mjs";
import type { IZFormFieldRender } from "./form-field-render.mjs";
import type { IZFormState } from "./form-state.mjs";

export class ZFormFieldRenderText implements IZFormFieldRender {
  public render(state: IZFormState, meta: IZMetadata): ReactNode {
    const { current, setCurrent } = state;
    const path = firstDefined("", meta.path);
    const fieldValue = get(current, path, "");

    const handleValueChange = (value: string) => {
      const next = structuredClone(current);
      set(next, path, value);
      setCurrent(next);
    };

    return (
      <ZTextInput
        value={fieldValue}
        label={meta.name}
        onValueChange={handleValueChange}
      />
    );
  }
}
