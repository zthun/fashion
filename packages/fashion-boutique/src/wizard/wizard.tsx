import React from 'react';
import { IZButton } from '../button/button';
import { IZComponentName } from '../component/component-name';
import { IZComponentStyle } from '../component/component-style';

export interface IZWizard extends IZComponentStyle, IZComponentName {
  NextButtonProps?: IZButton;
  PrevButtonProps?: IZButton;
  FinishButtonProps?: IZButton;
}

export function ZWizard(props: IZWizard) {
  const { name } = props;

  return (
    <div className='ZWizard-root' data-name={name}>
      Wizard!
    </div>
  );
}