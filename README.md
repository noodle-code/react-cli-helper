# react-cli-helper

A simple React JS CLI helper. For now the only feature of this package is create to tests and components.

## Creating tests

To create a test simply enter this command:

`react-cli-help create test <test-filename>`

The resulting file will be saved in to the root directory of your app. If you want to specify a specific directory for your file just add a `--savePath=<path relative from root>`:

`react-cli-help create test <test-filename> --savePath=<path relative from root>`

## Creating components

Use this command to create a component:

`react-cli-help create component <component-filename>`

Just like the test file, the default save path for the component file will be in the root directory of your application. To specify your save path simply add a `savePath` option.

`react-cli-help create component <component-filename> --savePath=<path relative from root>`

By default the components generated by this package are stateful, so in the event that you'll need a stateless component you can add a `stateless` option to your create component command:

`react-cli-help create component <component-filename> --stateless`


Feel free to give your suggestions or if you want to contribute.

## License

ISC
