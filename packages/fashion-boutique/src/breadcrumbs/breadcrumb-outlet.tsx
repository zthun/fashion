import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { ZBox } from '../box/box';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';
import { ZOutlet } from '../router/router-dom';
import { IZBreadcrumbsLocation, ZBreadcrumbsLocation } from './breadcrumbs-location';

/**
 * The properties for the breadcrumb outlet.
 */
export interface IZBreadcrumbsOutlet extends IZComponentStyle, IZComponentName {
  /**
   * The properties for the underlying breadcrumb location component.
   */
  breadcrumbsProps?: Omit<IZBreadcrumbsLocation, 'name'>;
}

/**
 * Represents a layout where breadcrumbs are displayed on top of the current router outlet.
 */
export function ZBreadcrumbsOutlet(props: IZBreadcrumbsOutlet) {
  const { className, name, breadcrumbsProps } = props;

  return (
    <div className={cssJoinDefined('ZBreadcrumbOutlet-root', className)} data-name={name}>
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZBreadcrumbsLocation {...breadcrumbsProps} name='outlet-breadcrumbs' />
      </ZBox>
      <ZOutlet />
    </div>
  );
}