import { ZCircusKeyboardQwerty } from "@zthun/cirque";
import { sleep } from "@zthun/helpful-fn";
import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import { useEffect } from "react";

import type { IZComponentCompact } from "../component/component-compact.mjs";
import type { IZComponentFashion } from "../component/component-fashion.mjs";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";

export interface IZDialog
  extends
    IZComponentFashion,
    IZComponentHierarchy,
    IZComponentName,
    IZComponentCompact,
    IZComponentStyle {
  open: boolean;
  persistent?: boolean;

  onClose?: () => void;

  renderHeader?: () => ReactNode;
  renderFooter?: () => ReactNode;
}

export interface IUseDialogOptions {
  onAfterOpen?: () => Promise<void>;
}

export function useDialog(
  current: HTMLDialogElement,
  props: IZDialog,
  options: IUseDialogOptions = {},
) {
  const { open, onClose, persistent } = props;

  const show = () => {
    void (async (dialog) => {
      dialog.showModal();
      await options.onAfterOpen?.call(null);
      dialog.focus();
    })(current);
  };

  const hide = () => {
    void (async (dialog) => {
      if (!dialog.open) {
        // Already closed
        return;
      }

      dialog.classList.add("closing");
      await sleep(150);
      dialog.close();
      dialog.classList.remove("closing");
      onClose?.call(null);
    })(current);
  };

  // This next bit is nearly impossible to test without modification
  // to circus to click on an offset of the body.  Can be done, but not available
  // at the moment.
  /* v8 ignore start --@preserve */
  /* istanbul ignore next --@preserve */
  const closeOnBackdropClick = (e: MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();

    const inside =
      r.top <= e.clientY &&
      e.clientY <= r.bottom &&
      r.left <= e.clientX &&
      e.clientX <= r.right;

    if (!inside && !persistent) {
      hide();
    }
  };
  /* v8 ignore end */

  const closeOnEscapeKey = (e: KeyboardEvent) => {
    if (e.code !== ZCircusKeyboardQwerty.escape.code) {
      return;
    }

    e.preventDefault();

    if (persistent) {
      return;
    }

    hide();
  };

  useEffect(() => {
    if (open) {
      show();
    } else {
      hide();
    }
  }, [current, open]);

  return { closeOnBackdropClick, closeOnEscapeKey };
}
