import { ZFashionThemeBuilder } from "@zthun/fashion-theme";

import { createFashionBody } from "../fashion/create-fashion-body.mjs";
import { createFashionComponent } from "../fashion/create-fashion-component.mjs";
import { createFashionDark } from "../fashion/create-fashion-dark.mjs";
import { createFashionError } from "../fashion/create-fashion-error.mjs";
import { createFashionInfo } from "../fashion/create-fashion-info.mjs";
import { createFashionLight } from "../fashion/create-fashion-light.mjs";
import { createFashionOpposite } from "../fashion/create-fashion-opposite.mjs";
import { createFashionPrimary } from "../fashion/create-fashion-primary.mjs";
import { createFashionSecondary } from "../fashion/create-fashion-secondary.mjs";
import { createFashionSuccess } from "../fashion/create-fashion-success.mjs";
import { createFashionSurface } from "../fashion/create-fashion-surface.mjs";
import { createFashionTertiary } from "../fashion/create-fashion-tertiary.mjs";
import { createFashionWarning } from "../fashion/create-fashion-warning.mjs";

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
