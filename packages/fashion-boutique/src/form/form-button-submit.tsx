import { useMemo } from "react";
import { ZButton, type IZButton } from "../button/button.js";
import { useFashionTheme } from "../theme/fashion.mjs";
import type { IZFormButton } from "./form-button.mjs";
import { useFormState } from "./form-state.mjs";

export interface IZFormButtonSubmit extends IZFormButton {
  ButtonProps?: Omit<IZButton, "type" | "onClick" | "disabled">;
}

export function ZFormButtonSubmit(props: IZFormButtonSubmit) {
  const { primary } = useFashionTheme();
  const { current, original } = useFormState();
  const { ButtonProps } = props;
  const dirty = useMemo(
    () => JSON.stringify(current) !== JSON.stringify(original),
    [current, original],
  );

  return (
    <div className="ZFormButton-root ZFormButton-submit" data-name="submit">
      <ZButton
        label="Submit"
        fashion={primary}
        {...ButtonProps}
        type="submit"
        disabled={!dirty}
      />
    </div>
  );
}
