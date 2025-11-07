import { ZCircusComponentModel } from "@zthun/cirque";
import { ZTextComponentModel } from "../text/text.cm.mjs";

export class ZSearchComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZRequestSearch-root";

  public input(): Promise<ZTextComponentModel> {
    return Promise.resolve(new ZTextComponentModel(this.driver));
  }

  public async search(text: string) {
    const input = await this.input();
    await input.keyboard(text);
  }
}
