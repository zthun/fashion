import { ZSizeFixed } from "@zthun/fashion-tailor";
import { ZColorPicker } from "@zthun/fashion-theme";
import { css, cssJoinDefined, ZOrientation } from "@zthun/helpful-fn";
import { useAmbassadorState, useKeyboardActivate } from "@zthun/helpful-react";
import type { KeyboardEvent, MouseEvent } from "react";
import { useCallback } from "react";

import type { IZComponentAvatar } from "../component/component-avatar.mjs";
import type { IZComponentHeading } from "../component/component-heading.mjs";
import type { IZComponentHierarchy } from "../component/component-hierarchy.mjs";
import type { IZComponentName } from "../component/component-name.mjs";
import type { IZComponentStyle } from "../component/component-style.mjs";
import { useExplorer } from "../explorer/use-explorer.mjs";
import { ZIconFontAwesome } from "../icon/icon-font-awesome.js";
import { ZStack } from "../stack/stack.js";
import { useFashionTailor, useFashionTheme } from "../theme/fashion.mjs";
import { useCss } from "../theme/styled.js";
import { ZSubtitle } from "../typography/typography.js";

/**
 * Properties for the {@link ZExplorerTreeNode} component.
 */
export interface IZExplorerTreeNode
  extends
    IZComponentAvatar,
    Pick<IZComponentHeading, "heading">,
    IZComponentHierarchy,
    IZComponentStyle,
    IZComponentName {
  highlight?: boolean;
  nonInteractive?: boolean;

  expanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;

  onActivate?: (
    e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>,
  ) => void;
}

/**
 * A tree node in an explorer.
 *
 * This is just a standard tree node that is "Explorer" aware.
 */
export function ZExplorerTreeNode({
  highlight,
  nonInteractive,
  avatar,
  heading,
  children,
  className,
  expanded,
  name,
  onExpandedChange,
  onActivate,
}: IZExplorerTreeNode) {
  const { primary } = useFashionTheme();
  const tailor = useFashionTailor();
  const picker = new ZColorPicker(primary);

  const { expanded: isExplorerExpanded, expand } = useExplorer();
  const [_expanded, setExpanded] = useAmbassadorState(
    expanded,
    onExpandedChange,
    true,
  );
  const isLeaf = !children;

  const _className = useCss(css`
    .ZExplorerTreeNode-content {
      pointer-events: ${nonInteractive ? "none" : "auto"};
      background: ${highlight ? picker.idle.background : "transparent"};
      cursor: pointer;
      padding: ${tailor.gap(ZSizeFixed.ExtraSmall)};
      margin-bottom: ${tailor.gap(ZSizeFixed.ExtraSmall)};
    }

    .ZExplorerTreeNode-content:focus {
      outline: ${tailor.thickness(ZSizeFixed.Small)} solid
        ${picker.focus.border};
    }

    .ZExplorerTreeNode-content:hover {
      background: ${picker.hover.background};
      color: ${picker.hover.contrast};
    }

    .ZExplorerTreeNode-content:active {
      background: ${picker.active.background};
    }

    .ZExplorerTreeNode-prefix {
      flex-grow: 1;
      min-width: 0;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .ZExplorerTreeNode-children {
      padding-left: ${tailor.gap(ZSizeFixed.Medium)};
    }
  `);

  const handleActivate = useCallback(
    (e: MouseEvent<HTMLElement> | KeyboardEvent<HTMLElement>) => {
      e.preventDefault();

      if (!isExplorerExpanded) {
        expand?.();
        setExpanded(true);
        return;
      }

      if (isLeaf) {
        onActivate?.(e);
      } else {
        setExpanded((e) => !e);
      }
    },
    [onActivate, isLeaf, setExpanded, expand, isExplorerExpanded],
  );

  const { onKey, tabIndex } = useKeyboardActivate(
    nonInteractive ? undefined : handleActivate,
  );

  const renderAvatar = () => {
    return avatar == null ? null : (
      <div className="ZExplorerTreeNode-avatar">{avatar}</div>
    );
  };

  const renderHeading = () => {
    return heading == null || !isExplorerExpanded ? null : (
      <ZSubtitle className="ZExplorerTreeNode-heading" compact Element="div">
        {heading}
      </ZSubtitle>
    );
  };

  const renderSuffix = () => {
    if (!isExplorerExpanded || isLeaf) {
      return null;
    }

    const name = _expanded ? "caret-down" : "caret-up";

    return (
      <ZIconFontAwesome
        className="ZExplorerTreeNode-expander"
        name={name}
        width={ZSizeFixed.ExtraSmall}
      />
    );
  };

  const renderChildren = () => {
    return !_expanded || isLeaf || !isExplorerExpanded ? null : (
      <div className="ZExplorerTreeNode-children">{children}</div>
    );
  };

  return (
    <ZStack
      className={cssJoinDefined(
        "ZExplorerTreeNode-root",
        className,
        _className,
      )}
      name={name}
      data-expanded={isExplorerExpanded && _expanded}
    >
      <ZStack
        className="ZExplorerTreeNode-content"
        orientation={ZOrientation.Horizontal}
        align={{ items: "center" }}
        justify={{ content: isExplorerExpanded ? "flex-start" : "center" }}
        gap={ZSizeFixed.ExtraSmall}
        onClick={handleActivate}
        onKeyDown={onKey}
        tabIndex={tabIndex}
      >
        {renderAvatar()}
        {renderHeading()}
        {renderSuffix()}
      </ZStack>

      {renderChildren()}
    </ZStack>
  );
}
