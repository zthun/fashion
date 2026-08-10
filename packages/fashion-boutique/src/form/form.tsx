import { useAmbassadorState, useSyncState } from "@zthun/helpful-react";
import { noop } from "lodash-es";
import { type FormEvent, useCallback, useMemo } from "react";

import { type IZComponentHierarchy, type IZComponentValue } from "../index.mjs";
import type { IZFormState } from "./form-state.mjs";
import { ZFormStateContext } from "./form-state.mjs";

export interface IZForm
  extends IZComponentValue<object>, IZComponentHierarchy {}

export function ZForm(props: IZForm) {
  const { children, value, onValueChange } = props;
  const [original, setOriginal] = useAmbassadorState<object>(
    value,
    onValueChange,
    {},
  );
  const [current, setCurrent] = useSyncState(original);

  const reset = useCallback(noop, []);

  const state = useMemo<IZFormState>(
    () => ({ original, current, setCurrent, reset }),
    [original, current, setCurrent, reset],
  );

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOriginal(current);
  };

  const handleReset = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrent(original);
  };

  return (
    <ZFormStateContext value={state}>
      <form
        className="ZForm-root"
        onSubmit={handleSubmit}
        onReset={handleReset}
      >
        {children}
      </form>
    </ZFormStateContext>
  );
}
