// @vitest-environment jsdom
import { ZFashionBuilder, ZFashionPriority, ZFashionSeverity } from '@zthun/fashion-theme';
import { registerCustomElement } from '@zthun/helpful-dom';
import { beforeAll, describe, expect, it } from 'vitest';
import { ZFashionThemeElement } from '../theme/fashion-theme-element.mjs';
import { ZFashionElement } from './fashion-element.mjs';
import { WithFashion } from './with-fashion.mjs';

const WithFashionElement = class extends WithFashion(ZFashionElement) {};

describe('WithFashion', () => {
  const name = ZFashionSeverity.Error;
  const gray = new ZFashionBuilder().namedSuccess().spectrum(0xaaaaaa).build();

  beforeAll(() => {
    registerCustomElement('z-with-fashion-element', WithFashionElement);
  });

  const createTestTarget = () => new WithFashionElement();

  describe('Local Fashion', () => {
    it('should return the color defined in the local fashion state', () => {
      // Arrange.
      const target = createTestTarget();
      target.fashion = gray;
      const { main: expected } = gray;
      // Act.
      const actual = target.color((f) => f.main, { name, scope: 'main' });
      // Assert.
      expect(actual).toEqual(expected);
    });
  });

  describe('Global Fashion', () => {
    it('should return the variable color defined as an attribute if the fashion is null', () => {
      // Arrange.
      const target = createTestTarget();
      target.fashion = null;
      target.mutateAttribute('fashion', ZFashionPriority.Secondary);
      const property = ZFashionThemeElement.property(ZFashionPriority.Secondary, 'contrast');
      const expected = `var(${property})`;
      // Act.
      const actual = target.color((f) => f.contrast, { name: gray.name, scope: 'contrast' });
      // Assert
      expect(actual).toEqual(expected);
    });

    it('should return the variable color fallback if no fashion or attribute is set', () => {
      // Arrange.
      const target = createTestTarget();
      target.fashion = null;
      target.mutateAttribute('fashion', null);
      const property = ZFashionThemeElement.property(name, 'contrast');
      const expected = `var(${property})`;
      // Act.
      const actual = target.color((f) => f.contrast, { name, scope: 'contrast' });
      // Assert
      expect(actual).toEqual(expected);
    });
  });
});