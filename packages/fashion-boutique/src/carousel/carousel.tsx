import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZOrientation, css, cssJoinDefined } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import type { ReactNode } from "react";
import type { IZButton } from "../button/button.js";
import { ZButton } from "../button/button.js";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentOrientation } from "../component/component-orientation.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import type { IZComponentValue } from "../component/component-value.mjs";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZStack } from "../stack/stack.js";
import { useFashionTheme } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";

export interface IZCarousel
  extends IZComponentStyle,
    IZComponentName,
    IZComponentValue<number>,
    IZComponentOrientation {
  count: number;

  renderAtIndex: (index: number) => ReactNode;
  renderEmpty?: () => ReactNode;

  ForwardProps?: Omit<IZButton, "name" | "disabled" | "onClick">;
  ReverseProps?: Omit<IZButton, "name" | "disabled" | "onClick">;
}

export function ZCarousel(props: IZCarousel) {
  const _renderEmpty = () => null;

  const {
    className,
    count,
    name,
    orientation = ZOrientation.Horizontal,
    value,
    ForwardProps,
    ReverseProps,
    onValueChange,
    renderAtIndex,
    renderEmpty = _renderEmpty,
  } = props;
  const [index, setIndex] = useAmbassadorState(value, onValueChange, 0);
  const { opposite } = useFashionTheme();
  const forward =
    orientation === ZOrientation.Horizontal ? "chevron-right" : "chevron-down";
  const reverse =
    orientation === ZOrientation.Horizontal ? "chevron-left" : "chevron-up";

  const _className = useCss(css`
    & {
      width: fit-content;
    }

    .ZCarousel-navigation-forward,
    .ZCarousel-navigation-reverse {
      visibility: ${count <= 1 ? "hidden" : undefined};
      opacity: 0.75;
      transition: "opacity .5s";
    }

    &:hover {
      .ZCarousel-navigation-forward,
      .ZCarousel-navigation-reverse {
        opacity: 1;
      }
    }
  `);

  const handleReverse = () => {
    setIndex((i) => {
      const next = i - 1;
      return next < 0 ? count - 1 : next;
    });
  };

  const handleForward = () => {
    setIndex((i) => {
      const next = i + 1;
      return next >= count ? 0 : next;
    });
  };

  return (
    <div
      className={cssJoinDefined("ZCarousel-root", className, _className)}
      data-name={name}
      data-index={index}
      data-count={count}
      data-orientation={orientation}
    >
      <ZStack
        orientation={orientation}
        gap={ZSizeFixed.ExtraSmall}
        align={{ items: "center" }}
        inline
      >
        <ZButton
          borderless
          outline
          compact
          fashion={opposite}
          label={<ZIconFontAwesome name={reverse} width={ZSizeFixed.Small} />}
          {...ReverseProps}
          className={cssJoinDefined(
            "ZCarousel-navigation ZCarousel-navigation-reverse",
            ReverseProps?.className,
          )}
          name="carousel-reverse"
          disabled={count <= 1}
          onClick={handleReverse}
        />
        <div className={cssJoinDefined("ZCarousel-content")}>
          {count <= 0 ? renderEmpty() : renderAtIndex(index)}
        </div>
        <ZButton
          borderless
          outline
          compact
          fashion={opposite}
          label={<ZIconFontAwesome name={forward} width={ZSizeFixed.Small} />}
          {...ForwardProps}
          className={cssJoinDefined(
            "ZCarousel-navigation ZCarousel-navigation-forward",
            ForwardProps?.className,
          )}
          name="carousel-forward"
          disabled={count <= 1}
          onClick={handleForward}
        />
      </ZStack>
    </div>
  );
}
