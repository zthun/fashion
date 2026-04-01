import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";

import { ZFormButtonComponentModel } from "./form-button.cm.mjs";
import { ZFormFieldComponentModel } from "./form-field.cm.mjs";

export class ZFormComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZForm-root";

  public field(id: string): Promise<ZFormFieldComponentModel> {
    return ZCircusBy.first(this.driver, ZFormFieldComponentModel, id);
  }

  public button(name: string): Promise<ZFormButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZFormButtonComponentModel, name);
  }
}
