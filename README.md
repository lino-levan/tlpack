# TLPack

Welcome to my new personal project dubbed "thoughtlesspack".  

The mission of this project is to finally build a packing software that isn't so hard to configure. The philosophy mainly centers around the idea of useful error messages and good defaults. At the moment, speed or compression isn't a top priority, though the final file does get run though GCC.  

If you'd like to contribute, make a pull request and I'll go through changes when I have time.  

## Installation

Local Installation: `npm i tlpack`

Global Installation: `npm i -g tlpack`

## Use

To compile once: `tlpack`

To compile when changes are detected: `tlpack watch`

To check the version: `tlpack version`

### tlpack.config.json

Default config if none specified:

```js
{
  "entry": "./src/index.js", // where the bundler will start packing (filePath)
  "out": "./dist/index.js", // where the bundler will output the file (filePath)
  "verbose": false, // whether to bundler should print debug logs or not (boolean)
  "compilationLevel": "SIMPLE" // determines how much to compile the output javascript with gcc ("WHITESPACE_ONLY", "SIMPLE", "ADVANCED")
}
```

### Modules

This bundler assumes that you are using the es6 module syntax (You can use both).

This bundler also does not require specifying file extension.

```js
// import all functions (there should be no "export" statements in this file)
// functionally the same as copy-pasting the file in the place of the import statement
import * from './example.js'
example()

// default exports are supported!
import example from './example'
example.example()

// imports individual exports
import { example } from './example'
example()

// multiple imports are supported!
import defaultImport, { exampleExport } from './example.js'
defautlImport()
exampleExport()
```

The following are not valid yet

```js
// aliases are not currently implemented (I think)
import * as example from './example.js'
example.example()

// import/require statements aren't currently implemented (I think)
import example = require('./example')
```
