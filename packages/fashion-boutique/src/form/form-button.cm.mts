import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";
import { ZButtonComponentModel } from "../button/button.cm.mjs";

export class ZFormButtonComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZFormButton-root";

  public underlying(): Promise<ZButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZButtonComponentModel);
  }
}
