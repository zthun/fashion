import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import {
  ZBooleanComponentModel,
  ZChoiceComponentModel,
  ZPaginationComponentModel,
} from "@zthun/fashion-boutique";

export class ZPaginationPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZPaginationPage-root";

  public pagination(): Promise<ZPaginationComponentModel> {
    return ZCircusBy.first(this.driver, ZPaginationComponentModel);
  }

  public error(): Promise<ZBooleanComponentModel> {
    return ZCircusBy.first(this.driver, ZBooleanComponentModel, "error");
  }

  public sizes(): Promise<ZChoiceComponentModel> {
    return ZCircusBy.first(this.driver, ZChoiceComponentModel, "sizes");
  }
}
