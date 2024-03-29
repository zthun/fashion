import { IZCircusDriver, ZCircusBy, ZCircusComponentModel } from '@zthun/cirque';
import { ZSize, ZSizeFixed, ZSizeVaried } from '@zthun/fashion-tailor';

/**
 * Represents a component model for suspense.
 */
export class ZSuspenseComponentModel extends ZCircusComponentModel {
  public static readonly Selector = '.ZSuspense-root';

  /**
   * Gets the size of the suspense.
   *
   * @returns
   *        The size height of the suspense.
   */
  public width(): Promise<ZSize> {
    return this.driver.attribute('data-width', ZSizeFixed.ExtraSmall);
  }

  /**
   * Gets the height of the suspense.
   *
   * @returns
   *      The size height of the suspense.
   */
  public height(): Promise<ZSize> {
    return this.driver.attribute('data-height', ZSizeVaried.Fit);
  }

  /**
   * Gets the current fashion theme.
   *
   * @returns
   *      The name of the fashion theme.
   */
  public fashion(): Promise<string> {
    return this.driver.attribute('data-fashion', 'Inherit');
  }

  /**
   * Gets whether there is suspense in a specific driver container.
   *
   * @param driver -
   *        The driver that can contain the suspense.
   * @param name -
   *        The optional name of the suspense to look for.
   *
   * @returns
   *        True if there exists a suspense in the driver.  If the name
   *        is supplied, then a targeted suspense is checked.
   */
  public static async loading(driver: IZCircusDriver, name?: string): Promise<boolean> {
    const suspense = await ZCircusBy.optional(driver, ZSuspenseComponentModel, name);
    return suspense != null;
  }

  /**
   * Waits for the suspense component found in driver to finish loading.
   *
   * @param driver -
   *        The driver that can contain the suspense.
   * @param name -
   *        The targeted name of the suspense object.
   */
  public static async load(driver: IZCircusDriver, name?: string): Promise<void> {
    await driver.wait(() => ZSuspenseComponentModel.loading(driver, name).then((c) => !c));
  }
}
