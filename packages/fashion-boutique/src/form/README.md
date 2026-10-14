# Form

[Back to Fashion Boutique](../../README.md)

Edit an object through metadata-driven fields and commit or reset its draft.

## Exports

| Export                                                                                         | Description                                                              |
| ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| `ZForm / IZForm`                                                                               | Form container with original and draft object values.                    |
| `ZFormField / IZFormField`                                                                     | Renders a field from metadata.                                           |
| `ZFormButton`                                                                                  | Submit or reset button enabled when the draft differs from the original. |
| `useFormState / ZFormStateContext / IZFormState`                                               | Access to the draft and original values.                                 |
| `ZFormFieldRenderText / ZFormFieldRenderBoolean / ZFormFieldRenderNothing / IZFormFieldRender` | Field renderers and their contract.                                      |

Submitting calls `onValueChange` with the draft. A native form reset restores
the original object. Text and file metadata render text controls; boolean
metadata renders a checkbox; unsupported types render nothing. The context's
`reset()` method is currently a no-op.

## Usage

```tsx
import { ZForm, ZFormButton, ZFormField } from "@zthun/fashion-boutique";
import type { IZMetadata } from "@zthun/helpful-query";
import { useState } from "react";

export function Editor({ fields }: { fields: IZMetadata[] }) {
  const [record, setRecord] = useState<object>({});
  return (
    <ZForm value={record} onValueChange={setRecord}>
      {fields.map((metadata) => (
        <ZFormField key={metadata.id} metadata={metadata} />
      ))}
      <ZFormButton type="reset" />
      <ZFormButton type="submit" ButtonProps={{ label: "Save" }} />
    </ZForm>
  );
}
```
