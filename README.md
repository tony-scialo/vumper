# vumper

NPM packagage version manager

### Installing

Run `npm i vumper` to install all of the dependencies necessary to run the project

Add the following to your package.json in the 'scripts' section

```js
 "run-vumper": "node node_modules/vumper/run/index.js"
```

### How to Use

The purpose of this package is to provide the ability to add certain 'prerelease' tags to an existing package.json. These prerelease tags are 'dv' (for develop) and 'rc' (for release candidate).

Uses are as follows:

To add '-dv.0' to an existing version

```shell
$ npm run run-vumper dv
```

Current: v1.0.0
Result: v1.0.0-dv.0

To increment the prerelease:

```shell
$ npm run run-vumper increment-pre
```

Current: v1.0.0-dv.0
Result: v1.0.0-dv.1

To remove the prerelease:

```shell
$ npm run run-vumper remove-pre
```

Current: v1.0.0-dv.1
Result: v1.0.0

To create a release candidate:

```shell
$ npm run run-vumper rc
```

Current: v1.0.0
Result: v1.0.0-rc.0

There is also the capabilities to increament the patch, minor, and major versions by running the following:

```shell
$ npm run run-vumper patch
$ npm run run-vumper minor
$ npm run run-vumper major
```

## Authors

Tony Scialo
