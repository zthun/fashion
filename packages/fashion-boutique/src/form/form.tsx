import { useAmbassadorState } from "@zthun/helpful-react";
import { noop } from "lodash-es";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { type IZComponentHierarchy, type IZComponentValue } from "../index.mjs";
import { ZFormStateContext } from "./form-state.mjs";

export interface IZForm
  extends IZComponentValue<object>,
    IZComponentHierarchy {}

export function ZForm(props: IZForm) {
  const { children, value, onValueChange } = props;
  const [original, setOriginal] = useAmbassadorState(value, onValueChange, {});
  const [current, setCurrent] = useState(original);

  const reset = useCallback(noop, []);

  useEffect(() => {
    setCurrent(original);
  }, [original]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOriginal(current);
  };

  return (
    <ZFormStateContext value={{ original, current, setCurrent, reset }}>
      <form className="ZForm-root" onSubmit={handleSubmit}>
        {children}
      </form>
    </ZFormStateContext>
  );
}
