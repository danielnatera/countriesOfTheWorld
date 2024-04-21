module.exports = {
    root: true,
    env: {
      node: true
    },
    extends: [
      'plugin:vue/vue3-essential',
      '@vue/standard'
    ],
    parserOptions: {
      parser: '@babel/eslint-parser',  // Asegúrate de que este paquete está instalado
      requireConfigFile: false         // Esto debería evitar la necesidad de un archivo de configuración
    },
    rules: {
      'vue/multi-word-component-names': 'off'
    },
    overrides: [
      {
        files: [
          '**/*.vue'
        ],
        rules: {
          'indent': 'off'
        }
      }
    ]
  };
  