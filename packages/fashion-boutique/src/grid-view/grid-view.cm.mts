import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";

import { ZAlertComponentModel } from "../alert/alert.cm.mjs";
import { ZSuspenseComponentModel } from "../suspense/suspense.cm.mjs";

/**
 * The component model for the GridView component.
 */
export class ZGridViewComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZGridView-root";

  public async error(): Promise<ZAlertComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZAlertComponentModel, "grid-error");
  }

  public async suspense(): Promise<ZSuspenseComponentModel> {
    return ZCircusBy.first(
      this.driver,
      ZSuspenseComponentModel,
      "grid-loading",
    );
  }
}
