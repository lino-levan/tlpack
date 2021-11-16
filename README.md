# TLPack

Welcome to my new personal project dubbed "thoughtlesspack".  

The mission of this project is to finally build a packing software that isn't so hard to configure. The philosophy mainly centers around the idea of useful error messages and good defaults. At the moment, speed or compression isn't a top priority, though the final file does get run though GCC.  

If you'd like to contribute, make a pull request and I'll go through changes when I have time.  

## Installation

Local Installation: `npm i tlpack`

Global Installation: `npm i -g tlpack`

## Usage

To compile once: `tlpack`

To compile when changes are detected: `tlpack watch`

### tlpack.config.json

Default config if none specified:

```js
{
  "entry": "./src/index.js", // where the packer will start packing (filePath)
  "out": "./dist/index.js", // where the packer will output the file (filePath)
  "verbose": false, // whether to packer should print debug logs or not (boolean)
  "compilationLevel": "SIMPLE" // determines how much to compile the output javascript with gcc ("WHITESPACE_ONLY", "SIMPLE", "ADVANCED")
}
```

### Modules

This packer assumes that you are using the es6 module syntax.

It also adds a * expression which removes the namespace

```js
// valid syntax
import * from './example.js'
example()

import * from './example'
example()

import example from './example.js'
example.example()

import example from './example'
example.example()

import { example } from './example.js'
example()

import { example } from './example'
example()
```

The following are not valid

```js
// invalid syntax
import * as example from './example.js'
example.example()

let example = require('./example')
example.example()
```
