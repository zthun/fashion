import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";

import { ZBoxComponentModel } from "../box/box.cm.mjs";
import { ZChoiceComponentModel } from "../choice/choice.cm.mjs";
import { ZNumberComponentModel } from "../number/number.cm.mjs";
import { ZSuspenseComponentModel } from "../suspense/suspense.cm.mjs";

export class ZPaginationComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZPagination-root";

  public loader(): Promise<ZSuspenseComponentModel> {
    return ZCircusBy.first(this.driver, ZSuspenseComponentModel);
  }

  public error(): Promise<ZBoxComponentModel> {
    return ZCircusBy.first(this.driver, ZBoxComponentModel, "error");
  }

  public page(): Promise<ZNumberComponentModel> {
    return ZCircusBy.first(this.driver, ZNumberComponentModel, "page");
  }

  public size(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "size");
  }
}
