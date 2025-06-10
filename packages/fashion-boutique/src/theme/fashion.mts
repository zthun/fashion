import type { IZFashionDevice, IZFashionTailor } from "@zthun/fashion-tailor";
import { ZFashionDevice, ZFashionTailor } from "@zthun/fashion-tailor";
import type { IZFashionTheme, ZFashionName } from "@zthun/fashion-theme";
import { ZFashionThemeBuilder } from "@zthun/fashion-theme";
import { createContext, useContext } from "react";

export const ZFashionThemeContext = createContext(
  new ZFashionThemeBuilder().build(),
);

export function useFashionTheme() {
  return useContext(ZFashionThemeContext) as IZFashionTheme;
}

export function useFashion(name: ZFashionName | undefined) {
  const context = useFashionTheme();
  return name ? context[name] : undefined;
}

export const ZFashionTailorContext = createContext<IZFashionTailor>(
  new ZFashionTailor(),
);

export function useFashionTailor() {
  return useContext(ZFashionTailorContext);
}

export const ZFashionDeviceContext = createContext<IZFashionDevice>(
  new ZFashionDevice(),
);

export function useFashionDevice() {
  return useContext(ZFashionDeviceContext);
}
