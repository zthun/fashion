import { isStateErrored } from "@zthun/helpful-react";
import type { IZAsyncData } from "./async-data.js";

export function ZAsyncDataError<T = unknown>(props: IZAsyncData<T, Error>) {
  const { children, value } = props;

  return isStateErrored(value) ? children(value) : null;
}
