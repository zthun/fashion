import { ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZAnchor } from '@zthun/fashion-designer';
import {
  ZButtonComponentModel,
  ZChoiceComponentModel,
  ZDrawerButtonComponentModel,
  ZDrawerComponentModel
} from '@zthun/fashion-venue';

/**
 * Represents the component model for the drawer page.
 */
export class ZDrawerPageComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZDrawerPage-root';

  /**
   * Gets the drawer open button.
   *
   * @returns
   *      The opened drawer.
   */
  public drawerButton(): Promise<ZDrawerButtonComponentModel> {
    return ZCircusBy.first(this.driver, ZDrawerButtonComponentModel);
  }

  /**
   * Clicks the button inside the drawer.
   *
   * @param drawer -
   *        The drawer that was opened from the drawerButton.
   */
  public async close(drawer: ZDrawerComponentModel): Promise<void> {
    const btn = await ZCircusBy.first(drawer.driver, ZButtonComponentModel, 'close');
    await btn.click();
    const drawerBtn = await this.drawerButton();
    await this.driver.wait(() => drawerBtn.opened().then((o) => !o));
  }

  /**
   * Sets the drawer position.
   *
   * @param position -
   *        The position to set.
   */
  public async anchor(position: ZAnchor): Promise<void> {
    const anchor = await ZCircusBy.first(this.driver, ZChoiceComponentModel, 'anchor');
    await anchor.select(position);
  }
}