import {
  ZBooleanSwitch,
  ZBox,
  ZCaption,
  ZCard,
  ZGrid,
  ZH3,
  ZImageSource,
  ZParagraph,
  ZTextArea,
  ZTextInput,
  ZTextInputReveal,
  ZTextType
} from '@zthun/fashion-boutique';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import React, { useState } from 'react';
import { ZFashionRouteText } from 'src/routes';

/**
 * Represents a demo for text.
 *
 * @returns
 *        The JSX to render the text demo page.
 */
export function ZTextPage() {
  const [disabled, setDisabled] = useState(false);
  const [readOnly, setReadOnly] = useState(false);
  const [required, setRequired] = useState(false);
  const [adornments, setAdornments] = useState(false);
  const [value, setValue] = useState('');

  const flag = <ZImageSource src={'images/svg/flag.svg'} height={ZSizeFixed.Small} />;
  const search = <ZImageSource src={'images/svg/search.svg'} height={ZSizeFixed.Small} />;

  return (
    <ZCard
      className='ZTextPage-root'
      heading={ZFashionRouteText.name}
      subHeading={ZFashionRouteText.description}
      avatar={<ZImageSource src={ZFashionRouteText.avatar} height={ZSizeFixed.Medium} />}
    >
      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Description</ZH3>

        <ZParagraph>
          This is the most basic of inputs. You just enter in some text and the value is held. Most user input is done
          by reading and parsing strings under the hood.
        </ZParagraph>

        <ZBox margin={{ bottom: ZSizeFixed.Medium }}>
          <ZGrid alignItems='center' columns='16rem ' gap={ZSizeFixed.Medium}>
            <ZTextInput
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='text'
              placeholder='Text'
              onValueChange={setValue}
              label='Text'
              prefix={adornments ? flag : null}
              suffix={adornments ? search : null}
            />
            <ZTextInput
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='password'
              placeholder='Password'
              onValueChange={setValue}
              label='Password'
              type={ZTextType.Password}
              prefix={adornments ? flag : null}
              suffix={adornments ? search : null}
            />
            <ZTextInputReveal
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='reveal'
              placeholder='Reveal Password'
              onValueChange={setValue}
              label='Reveal'
              prefix={adornments ? flag : null}
              suffix={adornments ? search : null}
            />
            <ZTextArea
              disabled={disabled}
              readOnly={readOnly}
              value={value}
              required={required}
              name='area'
              placeholder='Text Area'
              onValueChange={setValue}
              label='Area'
              prefix={adornments ? flag : null}
              suffix={adornments ? search : null}
            />
          </ZGrid>
        </ZBox>

        <ZCaption className='ZTextPage-value' compact>
          Value: {JSON.stringify(value)}
        </ZCaption>
      </ZBox>

      <ZBox margin={{ bottom: ZSizeFixed.Large }}>
        <ZH3>Options</ZH3>

        <ZGrid gap={ZSizeFixed.Medium}>
          <ZBooleanSwitch value={disabled} onValueChange={setDisabled} label='Disabled' name='disabled' />
          <ZBooleanSwitch value={readOnly} onValueChange={setReadOnly} label='ReadOnly' name='read-only' />
          <ZBooleanSwitch value={required} onValueChange={setRequired} label='Required' name='required' />
          <ZBooleanSwitch value={adornments} onValueChange={setAdornments} label='Adornments' name='adornments' />
        </ZGrid>
      </ZBox>
    </ZCard>
  );
}
