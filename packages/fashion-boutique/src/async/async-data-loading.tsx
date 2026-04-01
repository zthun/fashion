import { isStateLoading } from "@zthun/helpful-react";

import type { IZAsyncData } from "./async-data.js";

export function ZAsyncDataLoading<T = unknown>(props: IZAsyncData<T, symbol>) {
  const { children, value } = props;

  return isStateLoading(value) ? children(value) : null;
}
