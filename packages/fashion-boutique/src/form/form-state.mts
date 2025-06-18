import { noop } from "lodash-es";
import { createContext, useContext } from "react";

export interface IZFormState {
  original: object;
  current: object;

  setCurrent: (current: object) => void;
  reset(): void;
}

function createState(): IZFormState {
  return {
    original: {},
    current: {},
    setCurrent: noop,
    reset: noop,
  };
}

export const ZFormStateContext = createContext<IZFormState>(createState());
export const useFormState = () => useContext(ZFormStateContext);
