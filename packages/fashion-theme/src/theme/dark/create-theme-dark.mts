import { createFashionBody } from "./create-fashion-body.mjs";
import { createFashionComponent } from "./create-fashion-component.mjs";
import { createFashionDark } from "./create-fashion-dark.mjs";
import { createFashionError } from "./create-fashion-error.mjs";
import { createFashionInfo } from "./create-fashion-info.mjs";
import { createFashionLight } from "./create-fashion-light.mjs";
import { createFashionPrimary } from "./create-fashion-primary.mjs";
import { createFashionSecondary } from "./create-fashion-secondary.mjs";
import { createFashionSuccess } from "./create-fashion-success.mjs";
import { createFashionSurface } from "./create-fashion-surface.mjs";
import { createFashionWarning } from "./create-fashion-warning.mjs";

import { ZFashionThemeBuilder } from "../fashion-theme.mjs";

/**
 * Creates the default fashion dark theme.
 *
 * @returns
 *        The default fashion dark theme.
 */
export function createThemeDark() {
  return new ZFashionThemeBuilder()
    .name("Dark")
    .primary(createFashionPrimary())
    .secondary(createFashionSecondary())
    .success(createFashionSuccess())
    .warning(createFashionWarning())
    .error(createFashionError())
    .info(createFashionInfo())
    .dark(createFashionDark())
    .light(createFashionLight())
    .opposite(createFashionLight())
    .body(createFashionBody())
    .surface(createFashionSurface())
    .component(createFashionComponent())
    .build();
}
