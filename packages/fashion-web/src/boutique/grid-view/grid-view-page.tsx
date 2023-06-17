import {
  ZBox,
  ZCard,
  ZGridView,
  ZH3,
  ZIconFontAwesome,
  ZImageSource,
  ZParagraph,
  ZStack
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { IZBrand, ZBrands } from '@zthun/helpful-brands';
import { ZOrientation } from '@zthun/helpful-fn';
import { ZDataSearchFields, ZDataSourceStatic, ZDataSourceStaticOptionsBuilder } from '@zthun/helpful-query';
import React from 'react';
import { ZFashionRouteGridView } from 'src/routes';

const ZBrandDataSourceOptions = new ZDataSourceStaticOptionsBuilder()
  .search(new ZDataSearchFields(['id', 'name']))
  .delay(1000)
  .build();
const ZBrandDataSource = new ZDataSourceStatic(ZBrands.slice(), ZBrandDataSourceOptions);

/**
 * Represents a demo for grid views.
 *
 * @returns The JSX to render the page.
 */
export function ZGridViewPage() {
  const renderItem = (item: IZBrand) => (
    <ZCard key={item.id} heading={item.name} avatar={<ZIconFontAwesome width={ZSizeFixed.Small} name='hashtag' />}>
      <ZStack justifyContent='center' orientation={ZOrientation.Horizontal}>
        <ZIconFontAwesome family='brands' name={item.id} width={ZSizeFixed.Large} />
      </ZStack>
    </ZCard>
  );

  return (
    <ZCard
      className='ZGridViewPage-root'
      heading={ZFashionRouteGridView.name}
      subHeading={ZFashionRouteGridView.description}
      avatar={<ZImageSource src={ZFashionRouteGridView.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          You will eventually need to deal with large amounts of list data. The recommended way to display this data is
          with a grid view in the fashion system. Other options can include tables, but it is better to use something
          that is more mobile friendly in general and grid views tend to be very responsive to this effort.
        </ZParagraph>
      </ZBox>
      <ZGridView
        GridProps={{
          gap: ZSizeFixed.Small,
          columns: '1fr 1fr 1fr 1fr',
          columnsLg: '1fr 1fr 1fr',
          columnsMd: '1fr 1fr',
          columnsSm: '1fr'
        }}
        renderItem={renderItem}
        dataSource={ZBrandDataSource}
      />
    </ZCard>
  );
}
