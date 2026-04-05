import { isStateLoaded } from "@zthun/helpful-react";

import type { IZAsyncData } from "./async-data.js";

export function ZAsyncDataLoaded<T = unknown>(props: IZAsyncData<T>) {
  const { children, value } = props;

  return isStateLoaded(value) ? children(value) : null;
}
