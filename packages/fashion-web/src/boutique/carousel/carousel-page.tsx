import { ZBox, ZCard, ZCarousel, ZChoiceDropDown, ZH3, ZIconFontAwesome, ZParagraph } from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import { ZBrands } from '@zthun/helpful-brands';
import { ZOrientation } from '@zthun/helpful-fn';
import { useStateAsArray } from '@zthun/helpful-react';
import { identity, startCase } from 'lodash';
import React, { useMemo, useState } from 'react';
import { ZFashionRouteCarousel } from '../../routes';

/**
 * Represents a demo for carousels.
 *
 * @returns The JSX to render the alerts demo page.
 */
export function ZCarouselPage() {
  const [index, setIndex] = useState(0);
  const [orientation, setOrientation] = useStateAsArray(ZOrientation.Horizontal);
  const [_orientation] = orientation;
  const orientations = useMemo(() => Object.values(ZOrientation), []);

  const renderBrand = (index: number) => (
    <ZIconFontAwesome name={ZBrands[index].id} family='brands' width={ZSizeFixed.Large} />
  );

  return (
    <ZCard
      className='ZCarouselPage-root'
      heading={ZFashionRouteCarousel.name}
      subHeading={ZFashionRouteCarousel.description}
      avatar={<ZIconFontAwesome name={ZFashionRouteCarousel.avatar} width={ZSizeFixed.Medium} />}
    >
      <ZBox padding={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>A carousel component is great for compacting items in a rotating display of content.</ZParagraph>

        <ZBox width={ZSizeFixed.ExtraSmall}>
          <ZCarousel
            count={ZBrands.length}
            value={index}
            onValueChange={setIndex}
            renderAtIndex={renderBrand}
            orientation={_orientation}
          />
        </ZBox>

        <ZBox margin={{ top: ZSizeFixed.Small }}>
          <span>Current Index: </span>
          <span className='ZCarouselPage-index'>{index}</span>
        </ZBox>
      </ZBox>

      <ZBox margin={{ top: ZSizeFixed.Medium }}>
        <ZH3>Options</ZH3>
        <ZChoiceDropDown
          options={orientations}
          value={orientation}
          onValueChange={setOrientation}
          indelible
          renderOption={startCase}
          identifier={identity}
          name='orientation'
        />
      </ZBox>
    </ZCard>
  );
}
