import { TextField } from '@mui/material';
import { cssJoinDefined } from '@zthun/helpful-fn';
import React from 'react';
import { IZText, useText, withEnterCommit } from './text';

/**
 * Represents the type of text.
 */
export enum ZTextType {
  /**
   * Regular text that is not hidden
   *
   * This is the default.
   */
  Text = 'text',

  /**
   * Password text where the value is never displayed.
   */
  Password = 'password'
}

/**
 * Represents props for the text input.
 */
export interface IZTextInput extends IZText<string> {
  /**
   * The optional type of text.
   */
  type?: ZTextType;
}

/**
 * Represents a free form text component that just displays an html input.
 *
 * @param props -
 *        The properties to the component.
 *
 * @returns
 *        The JSX to render the component.
 */
export function ZTextInput(props: IZTextInput) {
  const { className, type = ZTextType.Text, name, required } = props;
  const _textField = useText(props, '');
  const handleKeyDown = withEnterCommit(props);

  return (
    <TextField
      {..._textField}
      type={type}
      className={cssJoinDefined('ZText-root ZText-input', className)}
      onKeyDown={handleKeyDown}
      data-name={name}
      data-required={required}
    />
  );
}
