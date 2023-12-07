const types = {
  hook: 'hook',
  util: 'util',
};

module.exports = function (plop) {
  plop.setGenerator('component', {
    description: 'Component generator',
    prompts: [
      {
        name: 'type',
        type: 'list',
        message: 'What would like to generate?',
        choices: [
          { name: 'Hook', value: types.hook },
          { name: 'Util', value: types.util },
        ],
      },
      {
        type: 'input',
        name: 'fileName',
        message: (answers) => `What is the name of your ${answers.type}?`,
        validate: (value, answers) => {
          if (value.length === 0) {
            return 'Please enter a {{type}} name';
          }

          if (answers?.type === types.hook && value.indexOf('use') !== 0) {
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
        base: 'plop-templates/{{type}}',
        templateFiles: 'plop-templates/{{type}}/*.*',
        destination: `src/{{type}}s/{{camelCase fileName}}/`,
      },
      {
        type: 'append',
        path: 'src/index.ts',
        // eslint-disable-next-line prefer-named-capture-group
        pattern: /(\/\* plop_add_export \*\/)/giu,
        template: `export * from './{{type}}s/{{camelCase fileName}}/{{camelCase fileName}}.js';`,
      },
    ],
  });
};
