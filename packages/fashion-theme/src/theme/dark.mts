import { createFashionBody } from "./dark/create-fashion-body.mjs";
import { createFashionComponent } from "./dark/create-fashion-component.mjs";
import { createFashionDark } from "./dark/create-fashion-dark.mjs";
import { createFashionError } from "./dark/create-fashion-error.mjs";
import { createFashionInfo } from "./dark/create-fashion-info.mjs";
import { createFashionLight } from "./dark/create-fashion-light.mjs";
import { createFashionPrimary } from "./dark/create-fashion-primary.mjs";
import { createFashionSecondary } from "./dark/create-fashion-secondary.mjs";
import { createFashionSuccess } from "./dark/create-fashion-success.mjs";
import { createFashionSurface } from "./dark/create-fashion-surface.mjs";
import { createFashionWarning } from "./dark/create-fashion-warning.mjs";

import { ZFashionThemeBuilder } from "./fashion-theme.mjs";

export function createDarkTheme() {
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
