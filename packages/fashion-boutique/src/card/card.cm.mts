import type { IZCircusDriver } from "@zthun/cirque";
import { ZCircusBy, ZCircusComponentModel } from "@zthun/cirque";

import { ZContentTitleComponentModel } from "../content-title/content-title.cm.mjs";

/**
 * Represents a component model for a ZCard component.
 */
export class ZCardComponentModel extends ZCircusComponentModel {
  public static readonly Selector = ".ZCard-root";

  /**
   * Gets the card title.
   *
   * @returns
   *        The card title.
   */
  public title(): Promise<ZContentTitleComponentModel> {
    return ZCircusBy.first(this.driver, ZContentTitleComponentModel);
  }

  /**
   * Gets the content area.
   *
   * @returns
   *        The driver to query the content area of the card.
   */
  public content(): Promise<IZCircusDriver> {
    return this.driver.select(".ZCard-content");
  }

  /**
   * Gets the footer area.
   *
   * @returns
   *        The driver to query the footer area of the card.
   *        Returns null if there is no footer.
   */
  public async footer(): Promise<IZCircusDriver | null> {
    const [footer] = await this.driver.query(".ZCard-footer");
    return footer || null;
  }
}
