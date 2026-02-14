import { ZFashionThemeBuilder } from "../fashion-theme.mjs";

/**
 * Constructs the default (light) theme.
 *
 * @returns The default (light) theme.
 */
export function createThemeLight() {
  return new ZFashionThemeBuilder().build();
}

/**
 * @deprecated Use {@link createThemeLight} instead.
 */
export const createLightTheme = createThemeLight;
