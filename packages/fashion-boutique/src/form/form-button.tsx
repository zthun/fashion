import { startCase } from "lodash-es";
import { useMemo } from "react";

import { type IZButton, ZButton } from "../button/button.js";
import { useFashionTheme } from "../theme/fashion.mjs";
import { useFormState } from "./form-state.mjs";

export interface IZFormButtonSubmit {
  type?: "reset" | "submit";
  ButtonProps?: Omit<IZButton, "type" | "onClick" | "disabled">;
}

export function ZFormButton(props: IZFormButtonSubmit) {
  const { ButtonProps, type = "submit" } = props;

  const { primary, secondary } = useFashionTheme();
  const { current, original } = useFormState();
  const fashion = type === "reset" ? secondary : primary;
  const label = startCase(type);
  const dirty = useMemo(
    () => JSON.stringify(current) !== JSON.stringify(original),
    [current, original],
  );

  return (
    <div className="ZFormButton-root" data-name={type}>
      <ZButton
        label={label}
        fashion={fashion}
        {...ButtonProps}
        type={type}
        disabled={!dirty}
      />
    </div>
  );
}
