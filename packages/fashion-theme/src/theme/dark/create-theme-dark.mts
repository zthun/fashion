import { ZFashionThemeBuilder } from "../fashion-theme.mjs";
import { createFashionBody } from "./create-fashion-body.mjs";
import { createFashionComponent } from "./create-fashion-component.mjs";
import { createFashionDark } from "./create-fashion-dark.mjs";
import { createFashionError } from "./create-fashion-error.mjs";
import { createFashionInfo } from "./create-fashion-info.mjs";
import { createFashionLight } from "./create-fashion-light.mjs";
import { createFashionOpposite } from "./create-fashion-opposite.mjs";
import { createFashionPrimary } from "./create-fashion-primary.mjs";
import { createFashionSecondary } from "./create-fashion-secondary.mjs";
import { createFashionSuccess } from "./create-fashion-success.mjs";
import { createFashionSurface } from "./create-fashion-surface.mjs";
import { createFashionTertiary } from "./create-fashion-tertiary.mjs";
import { createFashionWarning } from "./create-fashion-warning.mjs";

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
    .tertiary(createFashionTertiary())
    .success(createFashionSuccess())
    .warning(createFashionWarning())
    .error(createFashionError())
    .info(createFashionInfo())
    .dark(createFashionDark())
    .light(createFashionLight())
    .opposite(createFashionOpposite())
    .body(createFashionBody())
    .surface(createFashionSurface())
    .component(createFashionComponent())
    .build();
}
