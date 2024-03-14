import { Then, When } from '@cucumber/cucumber';
import assert from 'assert';
import { ZTypographyPageComponentModel } from '../../src/boutique/typography/typography-page.cm.mjs';
import { ZFashionRouteBoutique, ZFashionRouteTypography } from '../../src/routes.mjs';
import { ZFashionWorld } from '../fashion-world.mjs';

When('I navigate to the typography demo page', async function (this: ZFashionWorld<ZTypographyPageComponentModel>) {
  await this.open(ZFashionRouteBoutique, ZFashionRouteTypography);
  this.parameters.page = await this.create(ZTypographyPageComponentModel);
});

When(
  'I select the {string} fashion option on the typography page',
  async function (this: ZFashionWorld<ZTypographyPageComponentModel>, name: string) {
    const fashion = await this.parameters.page.fashion();
    await fashion.select(name);
  }
);

Then(
  'the typography fashion should be {string} on the typography page for {string}',
  async function (
    this: ZFashionWorld<ZTypographyPageComponentModel>,
    name: string,
    part: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'subtitle' | 'caption' | 'overline'
  ) {
    const _part = await this.parameters.page[part]();
    const actual = await _part.fashion();
    assert.equal(name, actual);
  }
);
