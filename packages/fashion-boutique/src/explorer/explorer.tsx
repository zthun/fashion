import { ZSizeFixed, ZSizeVaried } from "@zthun/fashion-tailor";
import { css, cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import { useAmbassadorState } from "@zthun/helpful-react";
import { useCallback } from "react";

import { ZBox } from "../box/box.js";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZStack } from "../stack/stack.js";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";

/**
 * Represents a sidebar navigation.
 */
export interface IZSidebar {
  open?: boolean;
  onOpenChange?: (value: boolean) => void;
}

export interface IZExplorer extends IZComponentHierarchy {
  sidebar?: IZSidebar;
}

export function ZExplorer({ children, sidebar = {} }: IZExplorer) {
  const { open, onOpenChange } = sidebar;
  const [_open, setOpen] = useAmbassadorState(open, onOpenChange, true);

  const handleToggle = useCallback(() => {
    setOpen(!_open);
  }, [_open, setOpen]);

  const { surface } = useFashionTheme();

  const expanded = "15rem";
  const collapsed = "2rem";
  const width = _open ? expanded : collapsed;
  const tailor = useFashionTailor();
  const gap = tailor.gap(ZSizeFixed.Medium);

  const _className = useCss(css`
    .ZExplorer-nav {
      position: fixed;
      top: 0;
      bottom: 0;
      padding: ${gap};
      width: ${width};
    }

    .ZExplorer-sidebar {
      box-sizing: border-box;
      height: 100%;
      width: 100%;
      overflow: auto;
    }

    /* Two gaps are for the nav left gap and the right gap offset by the width */
    .ZExplorer-main {
      padding: ${gap};
      padding-left: calc(${width} + ${gap} + ${gap});
    }
  `);

  return (
    <div className={cssJoinDefined("ZExplorer-root", _className)}>
      <nav className="ZExplorer-nav">
        <ZBox
          className="ZExplorer-sidebar"
          fashion={surface}
          padding={ZSizeFixed.ExtraSmall}
          border={{ radius: ZSizeFixed.Medium }}
        >
          <ZStack
            gap={ZSizeFixed.Small}
            width={ZSizeVaried.Full}
            height={ZSizeVaried.Full}
          >
            <header className="ZExplorer-sidebar-header">
              <ZStack
                orientation={ZOrientation.Horizontal}
                justify={{ content: "flex-end" }}
                width={ZSizeVaried.Full}
              >
                <ZIconFontAwesome
                  name={_open ? "minus" : "expand"}
                  width={ZSizeFixed.ExtraSmall}
                  onClick={handleToggle}
                />
              </ZStack>
            </header>
            <article
              style={{ flexGrow: 1 }}
              className="ZExplorer-sidebar-content"
            />
          </ZStack>
        </ZBox>
      </nav>

      <main className="ZExplorer-main">{children}</main>
    </div>
  );
}
