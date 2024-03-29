import { OutlinedInput } from '@mui/material';
import { ZCircusKeyboardQwerty } from '@zthun/cirque';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { cssJoinDefined, firstDefined } from '@zthun/helpful-fn';
import { useAmbassadorState } from '@zthun/helpful-react';
import React, { KeyboardEvent } from 'react';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { ZLabeled } from '../label/labeled';
import { IZText, useText, withEnterCommit } from '../text/text';
import { createStyleHook } from '../theme/styled';
import { IZNumber } from './number';

export const useNumberInputStyles = createStyleHook(({ theme }) => {
  return {
    input: {
      color: theme.surface.contrast,
      backgroundColor: firstDefined(theme.surface.main, theme.surface.light)
    },
    spinner: {
      display: 'flex',
      flexDirection: 'column',
      flexWrap: 'nowrap',
      alignItems: 'center',
      justifyContent: 'center'
    },

    spin: {
      width: '1.5rem',
      height: '1.5rem',
      padding: 0,
      margin: 0,
      fontSize: 'inherit',
      border: 0,

      svg: {
        width: '100%',
        height: '100%'
      }
    },

    up: {
      borderTopLeftRadius: '50%',
      borderTopRightRadius: '50%'
    },

    down: {
      borderBottomLeftRadius: '50%',
      borderBottomRightRadius: '50%'
    }
  };
});

/**
 * Represents an input that takes a number value.
 *
 * @param props -
 *        The properties for this component.
 *
 * @returns
 *        The JSX responsible for rendering this input.
 */
export function ZNumberInput(props: IZNumber<number | null>) {
  const { className, step = 1, min = -Infinity, max = Infinity, name, value, label, required, onValueChange } = props;
  const [_value, _setValue] = useAmbassadorState(value, onValueChange, null);
  const { classes } = useNumberInputStyles();
  const __value = _value != null ? String(_value) : '';

  const handleCommit = (update: string) => {
    _setValue(update?.trim() === '' ? null : +update);
  };

  const handleSpin = (direction: 1 | -1) => {
    let current = Number.isNaN(_value) ? 0 : _value;
    current = current || 0;
    let next = current + direction * step;
    next = Math.max(next, min);
    next = Math.min(next, max);
    _setValue(next);
  };

  const handleSpinOnEnter = (direction: 1 | -1, e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.code === ZCircusKeyboardQwerty.enter.code) {
      e.stopPropagation();
    }
  };

  const adornment = (
    <div className={cssJoinDefined('ZNumber-spinner', classes.spinner)}>
      <button
        className={cssJoinDefined('ZNumber-spinner-increment', classes.spin, classes.up)}
        onClick={handleSpin.bind(null, 1)}
        onKeyDown={handleSpinOnEnter.bind(null, 1)}
      >
        <ZIconFontAwesome name='chevron-up' width={ZSizeFixed.ExtraSmall} />
      </button>
      <button
        className={cssJoinDefined('ZNumber-spinner-decrement', classes.spin, classes.down)}
        onClick={handleSpin.bind(null, -1)}
        onKeyDown={handleSpinOnEnter.bind(null, -1)}
      >
        <ZIconFontAwesome name='chevron-down' width={ZSizeFixed.ExtraSmall} />
      </button>
    </div>
  );

  const _propsForText: IZText = { ...props, value: __value, onValueChange: handleCommit, suffix: adornment };
  const _text = useText<string>(_propsForText, '');

  const handleKeyDown = withEnterCommit(_propsForText, (e: KeyboardEvent) => {
    if (e.code === ZCircusKeyboardQwerty.upArrow.code) {
      e.preventDefault();
      handleSpin(1);
    }

    if (e.code === ZCircusKeyboardQwerty.downArrow.code) {
      e.preventDefault();
      handleSpin(-1);
    }
  });

  return (
    <ZLabeled
      className={cssJoinDefined('ZNumber-root', className)}
      label={label}
      LabelProps={{ required, className: 'ZNumber-label' }}
      name={name}
    >
      <OutlinedInput
        {..._text}
        className={cssJoinDefined('ZNumber-input', classes.input)}
        onKeyDown={handleKeyDown}
        inputProps={{ min, max, step }}
      />
    </ZLabeled>
  );
}
