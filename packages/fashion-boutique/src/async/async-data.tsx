import type { ZAsyncDataState } from "@zthun/helpful-react";
import type { ReactNode } from "react";
import type { IZComponentValueReadonly } from "../component/component-value.mjs";

export interface IZAsyncData<T, C = T>
  extends Required<IZComponentValueReadonly<ZAsyncDataState<T>>> {
  children: (e: C) => ReactNode;
}
