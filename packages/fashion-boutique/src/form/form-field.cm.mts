import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import { ZBooleanComponentModel } from "../index.mjs";
import { ZTextComponentModel } from "../text/text.cm.mjs";

export class ZFormFieldComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZFormField-root";

  public text(): Promise<ZTextComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZTextComponentModel);
  }

  public boolean(): Promise<ZBooleanComponentModel | null> {
    return ZCircusBy.optional(this.driver, ZBooleanComponentModel);
  }
}
