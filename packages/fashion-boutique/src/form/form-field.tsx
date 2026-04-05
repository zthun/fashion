import { firstDefined } from "@zthun/helpful-fn";
import { type IZMetadata, ZMetadataType } from "@zthun/helpful-query";
import { useMemo } from "react";

import { ZFormFieldRenderBoolean } from "./form-field-render-boolean.js";
import { ZFormFieldRenderNothing } from "./form-field-render-nothing.js";
import { ZFormFieldRenderText } from "./form-field-render-text.js";
import { useFormState } from "./form-state.mjs";

export interface IZFormField {
  metadata: IZMetadata;
}

export function ZFormField(props: IZFormField) {
  const { metadata } = props;
  const { id } = metadata;
  const state = useFormState();
  const nothing = useMemo(() => new ZFormFieldRenderNothing(), []);
  const factory = useMemo(
    () => ({
      [ZMetadataType.Text]: new ZFormFieldRenderText(),
      [ZMetadataType.File]: new ZFormFieldRenderText(),
      [ZMetadataType.Boolean]: new ZFormFieldRenderBoolean(),
    }),
    [],
  );
  const renderer = useMemo(
    () => firstDefined(nothing, factory[metadata.type]),
    [metadata.type, nothing, factory],
  );

  return (
    <div className="ZFormField-root" data-name={id}>
      {renderer.render(state, metadata)}
    </div>
  );
}
