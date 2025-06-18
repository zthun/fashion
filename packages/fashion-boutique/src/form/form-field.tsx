import { firstDefined } from "@zthun/helpful-fn";
import { ZMetadataType, type IZMetadata } from "@zthun/helpful-query";
import { useMemo } from "react";
import { ZFormFieldRenderBoolean } from "./form-field-render-boolean.js";
import { ZFormFieldRenderNothing } from "./form-field-render-nothing.js";
import { ZFormFieldRenderText } from "./form-field-render-text.js";
import { useFormState } from "./form-state.mjs";

export interface IZFormField {
  meta: IZMetadata;
}

export function ZFormField({ meta }: IZFormField) {
  const { id } = meta;
  const state = useFormState();
  const nothing = useMemo(() => new ZFormFieldRenderNothing(), []);
  const factory = useMemo(
    () => ({
      [ZMetadataType.Text]: new ZFormFieldRenderText(),
      [ZMetadataType.Boolean]: new ZFormFieldRenderBoolean(),
    }),
    [],
  );
  const renderer = useMemo(
    () => firstDefined(nothing, factory[meta.type]),
    [meta.type, nothing, factory],
  );

  return (
    <div className="ZFormField-root" data-name={id}>
      {renderer.render(state, meta)}
    </div>
  );
}
