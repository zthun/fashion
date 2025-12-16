import { ZSizeFixed } from "@zthun/fashion-tailor";
import { css, cssJoinDefined } from "@zthun/helpful-fn";
import type { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import type { IZComponentRequired } from "../component/component-required.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";
import { useTypographyCss } from "../typography/typography.js";

export interface IZLabel
  extends
    IZComponentHierarchy,
    IZComponentDomEvents<HTMLLabelElement>,
    IZComponentStyle,
    IZComponentRequired {
  htmlFor?: string;
}

export function ZLabel(props: IZLabel) {
  const { error } = useFashionTheme();
  const tailor = useFashionTailor();
  const { children, className, required, htmlFor, ...dom } = props;

  const _typography = useTypographyCss({
    compact: true,
    weight: "bold",
    size: ZSizeFixed.Small,
  });

  const _className = useCss(css`
    & {
      display: block;
    }

    &[data-required="true"]::after {
      content: "*";
      color: ${error.idle.main};
      margin-left: ${tailor.thickness(ZSizeFixed.Medium)};
    }
  `);

  return (
    <label
      {...dom}
      className={cssJoinDefined(
        "ZLabel-root",
        _className,
        _typography,
        className,
      )}
      htmlFor={htmlFor}
      data-required={required}
    >
      {children}
    </label>
  );
}
