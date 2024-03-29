import { Given, Then, When } from '@cucumber/cucumber';
import { ZSizeFixed } from '@zthun/fashion-tailor';
import assert from 'assert';
import { ZSuspensePageComponentModel } from '../../src/boutique/suspense/suspense-page.cm.mjs';
import { ZFashionRouteBoutique, ZFashionRouteSuspense } from '../../src/routes.mjs';
import { ZFashionWorld } from '../fashion-world.mjs';

Given('I navigate to the suspense demo page', async function (this: ZFashionWorld<ZSuspensePageComponentModel>) {
  await this.open(ZFashionRouteBoutique, ZFashionRouteSuspense);
  this.parameters.page = await this.create(ZSuspensePageComponentModel);
});

When(
  'I set the loading option to {string} on the suspense demo page',
  async function (this: ZFashionWorld<ZSuspensePageComponentModel>, value: 'checked' | 'unchecked') {
    const checked = value === 'checked';
    const { page } = this.parameters;
    const loading = await page.loading();
    await loading.toggle(checked);
  }
);

When(
  'I select the width, {string}, from the width drop down on the suspense demo page',
  async function (this: ZFashionWorld<ZSuspensePageComponentModel>, value: ZSizeFixed) {
    const { page } = this.parameters;
    const width = await page.size();
    await width.select(value);
  }
);

Then(
  'the width of the {string} suspense should be {string} on the suspense demo page',
  async function (this: ZFashionWorld<ZSuspensePageComponentModel>, name: 'rotate', width: ZSizeFixed) {
    const { page } = this.parameters;
    const suspense = await page[name]();
    const value = await suspense?.width();
    assert.equal(value, width);
  }
);

Then(
  'the {string} suspense should be {string} on the suspense demo page',
  async function (this: ZFashionWorld<ZSuspensePageComponentModel>, name: 'rotate', visibility: 'visible' | 'hidden') {
    const visible = visibility === 'visible';
    const { page } = this.parameters;
    const actual = await page[name]();
    assert.equal(!!actual, visible);
  }
);
