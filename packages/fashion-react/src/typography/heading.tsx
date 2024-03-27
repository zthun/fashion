import {
  IZComponentCompact,
  IZComponentFashion,
  IZComponentName,
  ZHeadingFiveElement,
  ZHeadingFourElement,
  ZHeadingOneElement,
  ZHeadingSixElement,
  ZHeadingThreeElement,
  ZHeadingTwoElement
} from '@zthun/fashion-boutique';
import { includeCustomElement } from '@zthun/helpful-dom';
import React, { useMemo } from 'react';
import { IZComponentHierarchy } from '../component/component-hierarchy.mjs';
import { IZComponentStyle } from '../component/component-style.mjs';

export interface IZHeadingProps
  extends IZComponentHierarchy,
    IZComponentStyle,
    IZComponentFashion,
    IZComponentCompact,
    IZComponentName {}

export const ZH1 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useMemo(() => includeCustomElement(ZHeadingOneElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h1 class={className} is='z-h1' data-fashion={fashion} data-compact={compact} data-name={name}>
      {children}
    </h1>
  );
};

export const ZH2 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useMemo(() => includeCustomElement(ZHeadingTwoElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h2 class={className} is='z-h2' data-fashion={fashion} data-compact={compact} data-name={name}>
      {children}
    </h2>
  );
};

export const ZH3 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useMemo(() => includeCustomElement(ZHeadingThreeElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h3 class={className} is='z-h3' data-fashion={fashion} data-compact={compact} data-name={name}>
      {children}
    </h3>
  );
};

export const ZH4 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useMemo(() => includeCustomElement(ZHeadingFourElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h4 class={className} is='z-h4' data-fashion={fashion} data-compact={compact} data-name={name}>
      {children}
    </h4>
  );
};

export const ZH5 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useMemo(() => includeCustomElement(ZHeadingFiveElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h5 class={className} is='z-h5' data-fashion={fashion} data-compact={compact} data-name={name}>
      {children}
    </h5>
  );
};

export const ZH6 = (props: IZHeadingProps) => {
  const { children, className, compact, fashion, name } = props;
  useMemo(() => includeCustomElement(ZHeadingSixElement), []);

  return (
    // @ts-expect-error - Web Component in react 18 using is directly translates className to lower case classname instead of class.
    <h6 class={className} is='z-h6' data-fashion={fashion} data-compact={compact} data-name={name}>
      {children}
    </h6>
  );
};