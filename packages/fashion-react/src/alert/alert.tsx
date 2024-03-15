import { IZComponentFashion, IZComponentName, ZAlertElement } from '@zthun/fashion-boutique';
import { includeCustomElement } from '@zthun/helpful-dom';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React, { ReactNode, useMemo } from 'react';
import { IZComponentAvatar } from '../component/component-avatar.mjs';
import { IZComponentHeading } from '../component/component-heading.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

declare global {
  namespace React.JSX {
    interface IntrinsicElements {
      ['z-alert']: ZAlertElement & any;
    }
  }
}

export interface IZAlert
  extends Omit<IZComponentHeading, 'subheader'>,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentName,
    IZComponentAvatar {
  message: ReactNode;
}

export function ZAlert(props: IZAlert) {
  const { heading, name, className, message, avatar, fashion } = props;
  useMemo(() => includeCustomElement(ZAlertElement), []);

  return (
    <z-alert class={cssJoinDefined(className)} fashion={fashion} name={name}>
      {avatar ? <div slot='avatar'>{avatar}</div> : null}
      {heading ? <div slot='heading'>{heading}</div> : null}
      <div slot='message'>{message}</div>
    </z-alert>
  );
}
