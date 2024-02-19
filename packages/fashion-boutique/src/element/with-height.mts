import { IZDeviceValueMap, ZSizeFixed, isDeviceValueMap } from '@zthun/fashion-tailor';
import { mutateAttribute } from '@zthun/helpful-dom';
import { ZElementConstructor } from './element-constructor.mjs';

export interface IZWithHeight<THeight> {
  componentHeight: THeight | IZDeviceValueMap<THeight> | null | undefined;

  heightXl(fallback: THeight): THeight;
  heightLg(fallback: THeight): THeight;
  heightMd(fallback: THeight): THeight;
  heightSm(fallback: THeight): THeight;
  heightXs(fallback: THeight): THeight;
}

export const WithHeightAttributes = ['data-height'];

export function WithHeight<THeight, TBase extends ZElementConstructor = ZElementConstructor>(Base: TBase) {
  return class extends Base implements IZWithHeight<THeight> {
    _componentHeight: THeight | IZDeviceValueMap<THeight> | null | undefined;

    get componentHeight() {
      return this._componentHeight;
    }

    set componentHeight(val: THeight | IZDeviceValueMap<THeight> | null | undefined) {
      this._componentHeight = val;
      mutateAttribute(this, 'data-height', JSON.stringify(val));
    }

    calculateHeight(device: ZSizeFixed): THeight | null | undefined {
      return isDeviceValueMap(this.componentHeight) ? this.componentHeight[device] : this.componentHeight;
    }

    heightXl(fallback: THeight) {
      return this.calculateHeight(ZSizeFixed.ExtraLarge) || fallback;
    }

    heightLg(fallback: THeight) {
      return this.calculateHeight(ZSizeFixed.Large) || this.heightXl(fallback);
    }

    heightMd(fallback: THeight) {
      return this.calculateHeight(ZSizeFixed.Medium) || this.heightLg(fallback);
    }

    heightSm(fallback: THeight) {
      return this.calculateHeight(ZSizeFixed.Small) || this.heightMd(fallback);
    }

    heightXs(fallback: THeight) {
      return this.calculateHeight(ZSizeFixed.ExtraSmall) || this.heightSm(fallback);
    }
  };
}
