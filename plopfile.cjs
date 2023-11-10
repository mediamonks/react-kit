// eslint-disable-next-line no-undef
module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Component generator',
    prompts: [
      {
        type: 'input',
        name: 'hookName',
        message: 'What is the name of your hook?',
        validate: (value) => {
          if (value.length === 0) {
            return 'Please enter a hook name';
          }

          if (value.indexOf('use') !== 0) {
            return `The hook needs to start with 'use', for example: 'use${
              value.charAt(0).toUpperCase() + value.slice(1)
            }'`;
          }

          return true;
        },
      },
    ],
    actions: () => [
      {
        type: 'addMany',
        base: 'plop-templates/hook',
        templateFiles: 'plop-templates/hook/*.*',
        destination: `src/hooks/{{camelCase hookName}}/`,
      },
      {
        type: 'append',
        path: 'src/index.ts',
        // eslint-disable-next-line prefer-named-capture-group
        pattern: /(\/\* plop_add_export \*\/)/giu,
        template: `export * from './hooks/{{camelCase hookName}}/{{camelCase hookName}}.js';`,
      },
    ],
  });
};
