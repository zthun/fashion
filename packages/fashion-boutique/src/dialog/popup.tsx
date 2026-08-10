import {
  createSizeChartFixedArithmetic,
  createSizeChartFixedCss,
  createSizeChartVariedCss,
  ZDeviceValues,
  ZSizeFixed,
  ZSizeVaried,
} from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import {
  css,
  cssJoinDefined,
  firstDefined,
  ZHorizontalAnchor,
  ZQuadrilateralBuilder,
  ZRectangle,
  ZVerticalAnchor,
} from "@zthun/helpful-fn";
import { useWindowService } from "@zthun/helpful-react";
import { useCallback, useEffect, useRef } from "react";

import type { IZComponentHeight } from "../component/component-height.mjs";
import {
  useFashionDevice,
  useFashionTailor,
  useFashionTheme,
} from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";
import type { IZDialog } from "./use-dialog.js";
import { useDialog } from "./use-dialog.js";

export interface IZPopup
  extends IZDialog, IZComponentHeight<ZSizeFixed | ZSizeVaried> {
  attach?: Element | null;
  attachOrigin?: [ZVerticalAnchor, ZHorizontalAnchor];
  popupOrigin?: [ZVerticalAnchor, ZHorizontalAnchor];
  scrollContainer?: Element;
}

const HeightChart = {
  ...createSizeChartFixedCss(createSizeChartFixedArithmetic(5, 10), "rem"),
  ...createSizeChartVariedCss(),
};

export function ZPopup(props: IZPopup) {
  const {
    className,
    children,
    compact,
    fashion,
    attach,
    attachOrigin = [ZVerticalAnchor.Bottom, ZHorizontalAnchor.Left],
    popupOrigin = [ZVerticalAnchor.Top, ZHorizontalAnchor.Left],
    name,
    height,
    scrollContainer = document.documentElement,
    renderHeader,
    renderFooter,
  } = props;
  const { surface } = useFashionTheme();
  const device = useFashionDevice();
  const tailor = useFashionTailor();
  const popupRef = useRef<HTMLDialogElement>(null);
  const picker = new ZColorPicker(firstDefined(surface, fashion));
  const _window = useWindowService();
  const _height = new ZDeviceValues(height, ZSizeVaried.Default);
  const _surface = new ZColorPicker(surface);

  const _getAttach = useCallback(
    () => firstDefined(document.body, attach, popupRef.current?.parentElement),
    [attach],
  );

  const _resize = useCallback(() => {
    const _popup = firstDefined(
      document.createElement("dialog"),
      popupRef.current,
    );
    const _attach = _getAttach();

    const attachRectangle = new ZQuadrilateralBuilder(0)
      .copy(_attach.getBoundingClientRect())
      .build();

    _popup.style.minWidth = `${new ZRectangle(attachRectangle).width()}px`;

    return Promise.resolve();
  }, [_getAttach]);

  const _reposition = useCallback(() => {
    const _popup = firstDefined(
      document.createElement("dialog"),
      popupRef.current,
    );
    const _attach = _getAttach();

    const attachRectangle = new ZQuadrilateralBuilder(0)
      .copy(_attach.getBoundingClientRect())
      .build();
    const popupRectangle = new ZQuadrilateralBuilder(0)
      .copy(_popup.getBoundingClientRect())
      .build();

    const { left, top } = new ZRectangle(attachRectangle).attach(
      attachOrigin,
      popupRectangle,
      popupOrigin,
    );

    _popup.style.left = `${left}px`;
    _popup.style.top = `${top}px`;

    return Promise.resolve();
  }, [_getAttach, attachOrigin, popupOrigin]);

  const _adjust = useCallback(async () => {
    const _popup = firstDefined(
      document.createElement("dialog"),
      popupRef.current,
    );
    const container = new ZQuadrilateralBuilder(0)
      .bottom(scrollContainer.clientHeight)
      .right(scrollContainer.clientWidth)
      .build();

    const popupRectangle = new ZQuadrilateralBuilder(0)
      .copy(_popup.getBoundingClientRect())
      .build();

    const adjusted = new ZRectangle(container).offsetToFit(popupRectangle);

    _popup.style.left = `${adjusted.left}px`;
    _popup.style.top = `${adjusted.top}px`;

    return Promise.resolve();
  }, [scrollContainer]);

  const onAfterOpen = useCallback(async () => {
    await _resize();
    await _reposition();
    await _adjust();
  }, [_resize, _reposition, _adjust]);

  const { closeOnBackdropClick, closeOnEscapeKey } = useDialog(
    popupRef.current,
    props,
    { onAfterOpen },
  );

  const _className = useCss(css`
    & {
      background: ${_surface.idle.background};
      border-color: ${_surface.idle.border};
      border-radius: ${tailor.rounding(ZSizeFixed.ExtraSmall)};
      border-style: solid;
      border-width: ${tailor.thickness(ZSizeFixed.ExtraSmall)};
      color: ${_surface.idle.contrast};
      padding: 0;
      margin: 0;
      z-index: 1000;
    }

    &::backdrop,
    &.closing {
      opacity: 0;
    }

    &[open] {
      display: flex;
      flex-direction: column;
    }

    .ZDialog-header,
    .ZDialog-footer,
    .ZDialog-content {
      padding: ${tailor.gap(
        compact ? ZSizeFixed.ExtraSmall : ZSizeFixed.Small,
      )};
    }

    .ZDialog-header {
      background: ${picker.idle.background};
      color: ${picker.idle.contrast};
    }

    .ZDialog-content {
      flex-grow: 1;
      overflow: auto;
      max-height: ${HeightChart[_height.xl]};
    }

    ${device.break(ZSizeFixed.Large)} {
      max-height: ${HeightChart[_height.lg]};
    }

    ${device.break(ZSizeFixed.Medium)} {
      max-height: ${HeightChart[_height.md]};
    }

    ${device.break(ZSizeFixed.Small)} {
      max-height: ${HeightChart[_height.sm]};
    }

    ${device.break(ZSizeFixed.ExtraSmall)} {
      max-height: ${HeightChart[_height.xs]};
    }
  `);

  useEffect(() => {
    return ((onRedraw) => {
      const handleRedraw = () => void onRedraw();
      const controller = new AbortController();
      const { signal } = controller;

      _window.addEventListener("resize", handleRedraw, { signal });
      _window.addEventListener("scroll", handleRedraw, { signal });

      return () => controller.abort();
    })(onAfterOpen);
  }, [onAfterOpen, _window]);

  return (
    <dialog
      className={cssJoinDefined(
        "ZDialog-root",
        "ZDialog-popup",
        className,
        _className,
      )}
      onClick={closeOnBackdropClick}
      onKeyDown={closeOnEscapeKey}
      data-name={name}
      data-fashion={fashion?.name}
      ref={popupRef}
    >
      {renderHeader && (
        <div className="ZDialog-header" aria-description="Drawer Header">
          {renderHeader.call(null)}
        </div>
      )}
      <div className="ZDialog-content" aria-description="Drawer Body">
        {children}
      </div>
      {renderFooter && (
        <div className="ZDialog-footer" aria-description="Drawer Footer">
          {renderFooter.call(null)}
        </div>
      )}
    </dialog>
  );
}
