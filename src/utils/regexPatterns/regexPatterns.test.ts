import { describe, expect, it } from 'vitest';
import { camelCaseRegex, kebabCaseRegex, pascalCaseRegex } from './regexPatterns.js';

describe('pascalCaseRegex', () => {
  it('should match string in the pascal case naming convention', () => {
    expect(pascalCaseRegex.test('MyComponent')).toBeTruthy();
    expect(pascalCaseRegex.test('MyComponent5')).toBeTruthy();
    expect(pascalCaseRegex.test('MyC0mp0nent')).toBeTruthy();
    expect(pascalCaseRegex.test('My00mponent')).toBeTruthy();
  });
});

describe('camelCaseRegex', () => {
  it('should match string in the camel case naming convention', () => {
    expect(camelCaseRegex.test('camelCaseString')).toBeTruthy();
    expect(camelCaseRegex.test('helloW0rld')).toBeTruthy();
    expect(camelCaseRegex.test('g00M0rning')).toBeTruthy();
    expect(camelCaseRegex.test('happyC0ding')).toBeTruthy();
  });
});

describe('kebabCaseRegex', () => {
  it('should match string in the kebab case naming convention', () => {
    expect(kebabCaseRegex.test('my-component')).toBeTruthy();
    expect(kebabCaseRegex.test('my-component-5')).toBeTruthy();
    expect(kebabCaseRegex.test('my-c0mp0nent')).toBeTruthy();
    expect(kebabCaseRegex.test('c0ding1sfun')).toBeTruthy();
  });
});
