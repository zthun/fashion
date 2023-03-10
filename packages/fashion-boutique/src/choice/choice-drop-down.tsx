import ClearIcon from '@mui/icons-material/Clear';
import { FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { createGuid, cssJoinDefined } from '@zthun/helpful-fn';
import { castArray, isArray } from 'lodash';
import React, { ReactNode, useMemo } from 'react';
import { makeStyles } from '../theme/theme';
import { IZChoice, IZChoiceOption, useChoice } from './choice';

const useChoiceDropDownStyles = makeStyles()((theme) => {
  return {
    root: {
      '.MuiSelect-select': {
        padding: theme.gap(ZSizeFixed.Small)
      }
    },
    clear: {
      fontSize: '1.2rem',
      padding: theme.gap(ZSizeFixed.Small),
      marginRight: `${theme.gap()} !important`
    },
    chip: {
      'display': 'inline-flex',
      'flexWrap': 'wrap',

      '.ZChoice-value': {
        fontSize: '0.8125rem',
        backgroundColor: theme.palette.grey[200],
        color: theme.palette.common.black,
        borderRadius: '1rem',
        paddingLeft: theme.gap(),
        paddingRight: theme.gap(),
        paddingTop: theme.gap(ZSizeFixed.Small),
        paddingBottom: theme.gap(ZSizeFixed.Small),
        margin: 3
      }
    }
  };
});

/**
 * Represents a choice object that implements a drop down.
 *
 * @param props -
 *        The properties for the choice component.
 *
 * @returns
 *        The JSX to render the choice component.
 */
export function ZChoiceDropDown<O, V>(props: IZChoice<O, V>) {
  const { className, label, disabled, multiple, name, indelible } = props;
  const { choices, value, lookup, cast, render, setValue } = useChoice(props);
  const labelId = useMemo(() => createGuid(), []);
  const styles = useChoiceDropDownStyles();

  const handleSelect = (event: SelectChangeEvent<any>) => {
    const selected = castArray(event.target.value);
    setValue(selected);
  };

  function renderDropDownItems() {
    const renderMenuItem = (choice: IZChoiceOption<O, V>) => {
      const { key, value, option } = choice;

      return (
        <MenuItem className='ZChoice-option' key={key} value={value as any}>
          {render(option)}
        </MenuItem>
      );
    };

    return choices.map(renderMenuItem);
  }

  function renderClear() {
    const empty = !value?.length;

    if (empty || disabled || indelible) {
      return null;
    }

    return (
      <IconButton className={cssJoinDefined('ZChoice-clear', styles.classes.clear)} onClick={setValue.bind(null, [])}>
        <ClearIcon fontSize='inherit' />
      </IconButton>
    );
  }

  function renderSelectedItem(value: O | V | string) {
    const _renderSelected = (option: IZChoiceOption<O, V> | undefined) => {
      const key = option == null ? String(value) : option.key;
      const _value = option == null ? value : option.value;
      const element: ReactNode = option == null ? String(value) : render(option.option);

      return (
        <div className='ZChoice-value' key={key} data-value={_value}>
          {element}
        </div>
      );
    };

    if (isArray(value)) {
      return (
        <div className={cssJoinDefined('ZChoice-chip-list', styles.classes.chip)}>
          {value.map((v) => lookup.get(v)).map((option) => _renderSelected(option))}
        </div>
      );
    }

    const option = lookup.get(value);
    return _renderSelected(option);
  }

  return (
    <FormControl
      className={cssJoinDefined('ZChoice-root', 'ZChoice-drop-down', styles.classes.root, className)}
      fullWidth
      data-name={name}
    >
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select
        classes={{ select: 'ZChoice-toggler' }}
        labelId={labelId}
        disabled={disabled}
        value={cast(value, '')}
        label={label}
        multiple={multiple}
        MenuProps={{ className: 'ZChoice-options' }}
        onChange={handleSelect}
        renderValue={renderSelectedItem}
        endAdornment={renderClear()}
      >
        {renderDropDownItems()}
      </Select>
    </FormControl>
  );
}
