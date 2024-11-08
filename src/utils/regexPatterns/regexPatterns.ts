/**
 * PascalCaseString
 * MyComponent
 * MyComponent5
 * MyC0mp0nent
 * My00mponent
 */
// eslint-disable-next-line unicorn/no-unsafe-regex
export const pascalCaseRegex = /^(?:[A-Z][\da-z]+)+$/u;

/**
 * @example
 * camelCaseString
 * helloW0rld
 * g00M0rning
 * happyC0ding
 */
// eslint-disable-next-line unicorn/no-unsafe-regex
export const camelCaseRegex = /^[\da-z]+(?:[A-Z][\da-z]+)*$/u;

/**
 * @example
 * my-component
 * my-component-5
 * my-c0mp0nent
 * c0ding1sfun
 */
// eslint-disable-next-line unicorn/no-unsafe-regex
export const kebabCaseRegex = /^[\da-z]+(?:-[\da-z]+)*$/u;
