import { registerCustomElement } from '@zthun/helpful-dom';
import { ZFashionCustomElement } from '../element/fashion-element.mjs';

export class ZAlertMessageElement extends ZFashionCustomElement {
  public static readonly register = registerCustomElement.bind(null, 'z-alert-message', ZAlertMessageElement);
  public readonly name = 'ZAlert-message';

  protected refreshCssVariables = undefined;

  protected generateStaticCss() {
    return {
      gridArea: 'message'
    };
  }
}
