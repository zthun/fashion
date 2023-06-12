import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { ZSizeFixed, createSizeChartFixedArithmetic } from '@zthun/fashion-tailor';
import { ZOrientation, cssJoinDefined } from '@zthun/helpful-fn';
import {
  IZDataRequest,
  IZMetadata,
  IZSorter,
  ZDataRequestBuilder,
  ZDataSourceStatic,
  ZSortDirection,
  ZSorterSingle
} from '@zthun/helpful-query';
import { isStateLoaded, isStateLoading, useAmbassadorState } from '@zthun/helpful-react';
import { get } from 'lodash';
import React, { ComponentPropsWithRef, ForwardedRef, forwardRef, useMemo } from 'react';
import { ItemProps, ScrollerProps, TableBodyProps, TableProps, TableVirtuoso } from 'react-virtuoso';
import { IZComponentDataSource } from '../component/component-data-source';
import { IZComponentHeight } from '../component/component-height';
import { IZComponentStyle } from '../component/component-style';
import { IZComponentValue } from '../component/component-value';
import { ZIconFontAwesome } from '../icon/icon-font-awesome';
import { usePageView } from '../pagination/use-page-view';
import { ZStack } from '../stack/stack';
import { ZSuspenseRotate } from '../suspense/suspense-rotate';
import { createStyleHook } from '../theme/styled';

const EmptyDataSource = new ZDataSourceStatic([]);
const DefaultDataRequest = new ZDataRequestBuilder().build();

export interface IZTable<T = any>
  extends IZComponentStyle,
    IZComponentDataSource<T>,
    IZComponentValue<IZDataRequest>,
    IZComponentHeight<ZSizeFixed> {
  columns: IZMetadata[];

  sorter?: IZSorter;

  identifier: (r: T) => string | number;
}

const TableSizeChart = createSizeChartFixedArithmetic(150, 150);

const useTableStyles = createStyleHook(({ theme, tailor }) => {
  return {
    root: {
      color: theme.opposite.main,
      width: '100%'
    },

    table: {
      borderCollapse: 'separate',
      tableLayout: 'fixed'
    },

    cell: {
      color: 'inherit'
    },

    header: {
      backgroundColor: theme.primary.main,
      color: theme.primary.contrast
    },

    headerSort: {
      'cursor': 'pointer',

      '&:hover': {
        backgroundColor: theme.primary.light
      }
    },

    text: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis'
    },

    sort: {
      marginLeft: tailor.gap(ZSizeFixed.ExtraSmall)
    },

    tableNotLoaded: {
      textAlign: 'center',
      verticalAlign: 'middle',
      padding: '4rem'
    }
  };
});

export function ZTable<T = any>(props: IZTable<T>) {
  const {
    className,
    dataSource = EmptyDataSource,
    columns,
    height = ZSizeFixed.Medium,
    value,
    onValueChange,
    identifier,
    sorter
  } = props;
  const { classes } = useTableStyles();

  const [request, setRequest] = useAmbassadorState(value, onValueChange, DefaultDataRequest);
  const _sorter = useMemo(() => sorter || new ZSorterSingle(request.sort), [request.sort]);

  const { view } = usePageView(dataSource, request);

  const TableComponents = useMemo(
    () => ({
      Scroller: forwardRef(function $Scroller(props: ScrollerProps, ref: ForwardedRef<HTMLDivElement>) {
        return <TableContainer {...props} ref={ref} />;
      }),
      TableHead: forwardRef(function $TableHead(
        p: ComponentPropsWithRef<'thead'>,
        r: ForwardedRef<HTMLTableSectionElement>
      ) {
        return <TableHead {...p} className={cssJoinDefined('ZTable-head')} ref={r} />;
      }),
      TableBody: forwardRef(function $TableBody(p: TableBodyProps, r: ForwardedRef<HTMLTableSectionElement>) {
        return <TableBody {...p} ref={r} />;
      }),
      Table: (p: TableProps) => <Table {...p} className={cssJoinDefined('ZTable-table', classes.table)} stickyHeader />,
      TableRow: function $TableRow(props: ItemProps<T>) {
        const { style, children } = props;
        const index = props['data-index'];
        const itemGroupIndex = props['data-item-group-index'];
        const itemIndex = props['data-item-index'];
        const knownSize = props['data-known-size'];

        return (
          <TableRow
            className={cssJoinDefined('ZTable-row')}
            style={style}
            data-index={index}
            data-item-group-index={itemGroupIndex}
            data-item-index={itemIndex}
            data-known-size={knownSize}
          >
            {children}
          </TableRow>
        );
      }
    }),
    []
  );

  const handleSort = (c: IZMetadata) => {
    if (!c.sortable) {
      return;
    }

    const next = _sorter.sort(c.path);
    setRequest(new ZDataRequestBuilder().copy(request).sort(next).build());
  };

  const renderSort = (c: IZMetadata) => {
    if (!c.path) {
      return null;
    }

    const dir = _sorter.sorted(c.path);

    if (!dir) {
      return null;
    }

    const direction = dir === ZSortDirection.Ascending ? 'arrow-up' : 'arrow-down';

    return (
      <ZIconFontAwesome
        className={cssJoinDefined('ZTable-cell-sort', classes.sort)}
        name={direction}
        width={ZSizeFixed.ExtraSmall}
        data-direction={dir}
      />
    );
  };

  const renderHead = () => (
    <TableRow data-row={'header'}>
      {columns.map((c) => (
        <TableCell
          key={c.id}
          className={cssJoinDefined('ZTable-cell-header', classes.header, [classes.headerSort, !!c.sortable])}
          onClick={handleSort.bind(null, c)}
          data-column={c.id}
          data-row='header'
        >
          <ZStack orientation={ZOrientation.Horizontal} alignItems='center'>
            <span className={cssJoinDefined('ZTable-cell-header-name', classes.text)}>{c.name}</span>
            {renderSort(c)}
          </ZStack>
        </TableCell>
      ))}
    </TableRow>
  );

  const renderValue = (r: T, c: IZMetadata) => {
    return get(r, c.path!);
  };

  const renderItem = (ri: number, r: T | Error | symbol) => {
    if (r instanceof Error) {
      return (
        <TableCell className={cssJoinDefined('ZTable-cell-error', classes.tableNotLoaded)} colSpan={columns.length}>
          {r.message}
        </TableCell>
      );
    }

    if (isStateLoading(r)) {
      return (
        <TableCell className={cssJoinDefined('ZTable-cell-loading', classes.tableNotLoaded)} colSpan={columns.length}>
          <ZSuspenseRotate width={ZSizeFixed.Large} />
        </TableCell>
      );
    }

    const _identifier = identifier(r);
    const key = (c: IZMetadata) => `${_identifier}-${c.id}`;

    return (
      <>
        {columns.map((c, ci) => (
          <TableCell
            key={key(c)}
            className={cssJoinDefined('ZTable-cell', classes.cell, classes.text)}
            data-row={_identifier}
            data-column={c.id}
            data-row-index={ri}
            data-column-index={ci}
          >
            {renderValue(r, c)}
          </TableCell>
        ))}
      </>
    );
  };

  const data: (T | Symbol | Error)[] = isStateLoaded(view) ? view : [view];
  const _height = TableSizeChart[height];

  return (
    <TableVirtuoso
      className={cssJoinDefined('ZTable-root', className, classes.root)}
      style={{ height: _height }}
      data={data}
      itemContent={renderItem}
      components={TableComponents}
      fixedHeaderContent={renderHead}
    />
  );
}
