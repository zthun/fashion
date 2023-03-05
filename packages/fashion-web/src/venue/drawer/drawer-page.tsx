import { ZAnchor, ZSizeFixed } from '@zthun/fashion-designer';
import {
  useFashionTheme,
  ZBox,
  ZButton,
  ZCard,
  ZChoiceDropDown,
  ZDrawerButton,
  ZGrid,
  ZH3,
  ZImageSource,
  ZParagraph
} from '@zthun/fashion-venue';
import { setFirst } from '@zthun/helpful-fn';
import { identity, startCase, values } from 'lodash';
import React, { useState } from 'react';
import { ZFashionRouteVenueDrawer } from '../../routes';

/**
 * Represents a demo for drawers.
 *
 * @returns The JSX to render the page.
 */
export function ZDrawerPage() {
  const [anchor, setAnchor] = useState<ZAnchor>(ZAnchor.Left);
  const theme = useFashionTheme();
  const { primary, success } = theme.design();
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const anchors = values(ZAnchor);

  const now = () => setTimestamp(new Date().getTime());

  return (
    <ZCard
      className='ZDrawerPage-root'
      heading={ZFashionRouteVenueDrawer.name}
      subHeading={ZFashionRouteVenueDrawer.description}
      avatar={<ZImageSource src={ZFashionRouteVenueDrawer.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          Drawers are a neat way to save real estate on a page. Most users will not need to see everything all at once
          and only need to navigate or view specific pieces of data when they need it. Thus, a drawer can easily be used
          to handle this information.
        </ZParagraph>

        <ZParagraph>
          However, be careful. You do not want to hide too much of your interface behind a drawer because it begins to
          turn into mystery meat features, where the user will not be able to figure out how to navigate your site, or
          know where specific pieces of information is.
        </ZParagraph>

        <ZDrawerButton
          ButtonProps={{ fashion: primary, outline: true }}
          DrawerProps={{ anchor }}
          closeOnChange={[timestamp]}
        >
          <ZBox padding={ZSizeFixed.Medium}>
            <ZH3>Drawer</ZH3>
            <ZParagraph>You can put whatever you want in a drawer.</ZParagraph>
            <ZButton label='Close Drawer' fashion={success} onClick={now} name='close' />
          </ZBox>
        </ZDrawerButton>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGrid gap={ZSizeFixed.Medium}>
          <ZChoiceDropDown
            value={[anchor]}
            onValueChange={setFirst.bind(null, setAnchor, ZAnchor.Left)}
            options={anchors}
            label='Anchor'
            identifier={identity}
            renderOption={startCase}
            indelible
            name='anchor'
          />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
