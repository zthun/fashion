import type { IZFashion } from "@zthun/fashion-theme";
import { ZColorPicker } from "@zthun/fashion-theme";
import { css, cssJoinDefined, firstDefined } from "@zthun/helpful-fn";
import type { IZComponentDomEvents } from "../component/component-dom-events.mjs";
import type { IZComponentLabel } from "../component/component-label.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import { useFashionTheme } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";
import { ZParagraph } from "../typography/typography.js";

export interface IZLink
  extends IZComponentStyle,
    IZComponentDomEvents<HTMLAnchorElement>,
    IZComponentName,
    IZComponentLabel {
  fashion?: IZFashion;
  href?: string;
}

export function ZLink(props: IZLink) {
  const { primary } = useFashionTheme();
  const { className, name, href, fashion, label, ...rest } = props;
  const picker = new ZColorPicker(firstDefined(primary, fashion));

  const _className = useCss(css`
    & {
      color: ${picker.idle.main};
      text-decoration: none;
    }

    &:active {
      color: ${picker.active.main};
    }

    &:hover {
      color: ${picker.hover.main};
    }

    &:focus {
      color: ${picker.focus.main};
    }
  `);

  return (
    <a
      {...rest}
      className={cssJoinDefined("ZLink-root", _className, className)}
      href={href}
      data-name={name}
      role="link"
    >
      <ZParagraph Element="div" compact>
        {label}
      </ZParagraph>
    </a>
  );
}
