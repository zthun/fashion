import {
  ZSizeVaried,
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss
} from '@zthun/fashion-tailor';
import { ZFashionPriority } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { firstDefined } from '@zthun/helpful-fn';
import { ZFashionThemeElement } from 'src/theme/fashion-theme-element.mjs';
import { css } from '../theme/css.mjs';

export class ZBannerElement extends HTMLElement {
  private static HeightChart = {
    ...createSizeChartFixedCss(createSizeChartFixedArithmetic(1, 1), 'rem'),
    ...createSizeChartVariedCss()
  };

  public static readonly register = registerCustomElement.bind(null, 'z-banner', ZBannerElement);
  public static readonly observeAttributes = Object.freeze(['height', 'fashion']);
  public attributeChangedCallback = this._applyVariables;

  public fashion() {
    return firstDefined(ZFashionPriority.Primary, this.getAttribute('fashion'));
  }

  public height() {
    return firstDefined(ZSizeVaried.Fit, this.getAttribute('height'));
  }

  private _applyVariables(): void {
    const fashion = this.fashion();

    const main = ZFashionThemeElement.property(fashion, 'main');
    const contrast = ZFashionThemeElement.property(fashion, 'contrast');
    const height = ZBannerElement.HeightChart[this.height()];

    this.style.setProperty('--banner-background', `var(${main})`);
    this.style.setProperty('--banner-color', `var(${contrast})`);
    this.style.setProperty('--banner-height', `${height}`);
  }

  public connectedCallback() {
    this._applyVariables();
    this.classList.add('ZBanner-root');
    this.classList.add(
      css({
        background: 'var(--banner-background)',
        color: 'var(--banner-color)',
        height: 'var(--banner-height)',
        position: 'sticky',
        zIndex: 1100,
        top: 0,
        left: 'auto',
        right: 0,
        display: 'block',
        boxSizing: 'border-box',
        width: '100%'
      })
    );
  }
}