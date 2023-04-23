import { Autocomplete, AutocompleteRenderInputParams, TextField } from '@mui/material';
import { cssJoinDefined } from '@zthun/helpful-fn';
import { castArray, first } from 'lodash';
import React, { HTMLAttributes, SyntheticEvent } from 'react';
import { ZLabeled } from '../label/labeled';
import { createStyleHook } from '../theme/styled';
import { IZChoice, IZChoiceOption, useChoice } from './choice';

const useChoiceAutocompleteStyles = createStyleHook(({ theme, tailor }) => {
  return {
    root: {
      '.MuiInputBase-root': {
        backgroundColor: theme.light.main
      },

      '.MuiSelect-select': {
        padding: tailor.gap()
      }
    },

    invisible: {
      display: 'none'
    }
  };
});

/**
 * Represents a choice object that implements an autocomplete.
 *
 * @param props -
 *        The properties for the autocomplete component.
 *
 * @returns
 *        The JSX to render the choice component.
 */
export function ZChoiceAutocomplete<O, V>(props: IZChoice<O, V>) {
  const { className, disabled, multiple, name, label, indelible, identifier } = props;
  const { choices, value, lookup, render, display, setValue } = useChoice(props);
  const { classes } = useChoiceAutocompleteStyles();

  const handleSelect = (_: SyntheticEvent<any>, value: IZChoiceOption<O, V> | IZChoiceOption<O, V>[] | undefined) => {
    value = value == null ? [] : value;
    const selected = castArray(value);
    const values = selected.map((ch) => identifier(ch.option));
    setValue(values);
  };

  const chosen = (value ?? []).map((v) => lookup.get(v));
  const choice = multiple ? chosen : first(chosen) || null;

  function getOptionLabel(ch: IZChoiceOption<O, V>) {
    return display(ch.option);
  }

  function isOptionEqualToValue(o: IZChoiceOption<O, V>, v: IZChoiceOption<O, V> | undefined) {
    return o.value === v?.value;
  }

  function renderOption(props: HTMLAttributes<HTMLLIElement>, v: IZChoiceOption<O, V>) {
    return (
      <li
        key={v.key}
        {...props}
        className={cssJoinDefined(props.className, 'ZChoice-option')}
        data-key={v.key}
        data-value={v.value}
      >
        {render(v.option)}
      </li>
    );
  }

  function renderInput(props: AutocompleteRenderInputParams) {
    const _renderBackingValue = (ch: IZChoiceOption<O, V> | undefined) => {
      if (ch == null) {
        return null;
      }

      return (
        <div key={ch.key} className='ZChoice-value' data-value={ch.value}>
          {display(ch.option)}
        </div>
      );
    };

    // Note here that the underlying element(s) beside the text field are mostly for test automation.
    // It allows those trying to test to read the values that are currently selected which is somewhat
    // limited with MUI as MUI just renders the the value as the display for the autocomplete.
    return (
      <>
        <TextField {...props} />
        <div className={cssJoinDefined('ZChoice-values', classes.invisible)}>
          {castArray(choice).map(_renderBackingValue)}
        </div>
      </>
    );
  }

  return (
    <ZLabeled
      className={cssJoinDefined('ZChoice-root', 'ZChoice-autocomplete', classes.root, className)}
      label={label}
      name={name}
    >
      {() => (
        <Autocomplete
          data-name={name}
          componentsProps={{
            clearIndicator: { className: cssJoinDefined('ZChoice-clear', [classes.invisible, !chosen.length]) },
            popper: { className: 'ZChoice-options ZChoice-options-popup' },
            popupIndicator: { className: 'ZChoice-toggler' }
          }}
          autoHighlight
          disabled={disabled}
          disableClearable={indelible}
          options={choices}
          value={choice}
          onChange={handleSelect}
          multiple={multiple}
          getOptionLabel={getOptionLabel}
          isOptionEqualToValue={isOptionEqualToValue}
          renderOption={renderOption}
          renderInput={renderInput}
        />
      )}
    </ZLabeled>
  );
}
