import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import { ZNumberComponentModel } from "../number/number.cm.mjs";
import { ZSuspenseComponentModel } from "../suspense/suspense.cm.mjs";

export class ZPaginationComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZPagination-root";

  public loader(): Promise<ZSuspenseComponentModel> {
    return ZCircusBy.first(this.driver, ZSuspenseComponentModel);
  }

  public page(): Promise<ZNumberComponentModel> {
    return ZCircusBy.first(this.driver, ZNumberComponentModel, "page");
  }
}
