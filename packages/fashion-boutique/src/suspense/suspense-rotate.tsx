import type { ZDeviceValue, ZSizeFixed } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { css, cssJoinDefined, firstDefined } from "@zthun/helpful-fn";

import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { useFashionTheme } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";
import type { IZSuspense } from "./suspense.mjs";

export interface IZSuspenseRotate extends IZSuspense {
  width?: ZDeviceValue<ZSizeFixed>;
}

/**
 * Renders a rotating circle suspense.
 *
 * @param props -
 *        The properties for the component.
 *
 * @returns The jsx for the suspense.
 */
export function ZSuspenseRotate(props: IZSuspenseRotate) {
  const { className, disabled, name, width, fashion } = props;
  const { inherit } = useFashionTheme();
  const _fashion = firstDefined(inherit, fashion);
  const picker = new ZColorPicker(_fashion);

  const _className = useCss(css`
    & {
      color: ${picker.idle.background};
      display: ${disabled ? "none" : "block"};
    }
  `);

  return (
    <div
      className={cssJoinDefined(
        "ZSuspense-root",
        "ZSuspense-rotate",
        className,
        _className,
      )}
      data-disabled={disabled}
      data-name={name}
      data-fashion={_fashion.name}
    >
      <ZIconFontAwesome
        animation="spin"
        family="classic"
        name="spinner"
        width={width}
      />
    </div>
  );
}
