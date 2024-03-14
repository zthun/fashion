import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZFashionIntrinsic } from '@zthun/fashion-theme';
import { IZComponentAttributeChanged, ZAttribute, nodePaint } from '@zthun/helpful-dom';
import { css, html } from '@zthun/helpful-fn';
import { IZComponentCompact } from '../component/component-compact.mjs';
import { IZComponentFashion, ZFashionDetail } from '../component/component-fashion.mjs';
import { ZFashionTailorElement } from '../theme/fashion-tailor-element.mjs';

export abstract class ZParagraphElement
  extends HTMLParagraphElement
  implements IZComponentAttributeChanged, IZComponentFashion, IZComponentCompact
{
  public static readonly observedAttributes = ['data-compact', 'data-fashion'];

  @ZAttribute({ name: 'data-compact', type: 'boolean' })
  public compact?: boolean;

  @ZAttribute({ name: 'data-fashion', fallback: ZFashionIntrinsic.Inherit })
  public fashion: string;

  public constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.attributeChangedCallback();
  }

  public scale(): number {
    return 1;
  }

  public attributeChangedCallback(): void {
    const { compact, fashion } = this;
    const detail = new ZFashionDetail(fashion);
    const fs = `var(--typography-font-size, 1em)`;
    const ff = `var(--typography-font-family, 'Roboto', 'Arial', 'sans-serif')`;

    nodePaint(this.shadowRoot!);

    const styles = css`
      :host {
        color: ${detail.color('main')};
        margin: 0;
        margin-bottom: ${compact ? 0 : ZFashionTailorElement.gapVar(ZSizeFixed.Small)};
        font-family: ${ff};
        font-size: calc(${fs} * ${this.scale()});
      }
    `;

    const template = html`<slot></slot>`;
    nodePaint(this.shadowRoot!, { css: styles, html: template });
  }
}