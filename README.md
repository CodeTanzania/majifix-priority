# majifix-priority

[![Build Status](https://travis-ci.org/CodeTanzania/majifix-priority.svg?branch=develop)](https://travis-ci.org/CodeTanzania/majifix-priority)
[![Dependencies Status](https://david-dm.org/CodeTanzania/majifix-priority.svg)](https://david-dm.org/CodeTanzania/majifix-priority)
[![Coverage Status](https://coveralls.io/repos/github/CodeTanzania/majifix-priority/badge.svg?branch=develop)](https://coveralls.io/github/CodeTanzania/majifix-priority?branch=develop)
[![GitHub License](https://img.shields.io/github/license/CodeTanzania/majifix-priority)](https://github.com/CodeTanzania/majifix-priority/blob/develop/LICENSE)
[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy?template=https://github.com/CodeTanzania/majifix-priority/tree/develop)

[![Commitizen Friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Code Style](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)
[![npm version](https://img.shields.io/npm/v/@codetanzania/majifix-priority)](https://www.npmjs.com/package/@codetanzania/majifix-priority)

A representation an entity which provides a way to prioritize service and service request(issues) in order of their importance.

## Requirements

- [NodeJS v8.11.1+](https://nodejs.org)
- [Npm v5.6.0+](https://www.npmjs.com/)
- [MongoDB v3.4.10+](https://www.mongodb.com/)
- [Mongoose v5.1.2+](https://github.com/Automattic/mongoose)

## Installation

```sh
npm install @codetanzania/majifix-priority --save
```

## Usage

```js
const mongoose = require('mongoose');
const { app } = require('@codetanzania/majifix-priority');

//connect to mongodb
mongoose.connect(process.env.MONGODB_URI);

//fire the app
app.start(function(error, env) {
  ...
});
```

## Testing

- Clone this repository

- Install all development dependencies

```sh
npm install
```

- Run example

```sh
npm run dev
```

- Then run test

```sh
npm test
```

## Contribute

It will be nice, if you open an issue first so that we can know what is going on, then, fork this repo and push in your ideas. Do not forget to add a bit of test(s) of what value you adding.

## References

- [Open311 GeoReport v2](http://wiki.open311.org/GeoReport_v2/)
- [popolo project](https://www.popoloproject.com/)
- [https://opengovdata.io/](https://opengovdata.io/)

## Licence

The MIT License (MIT)

Copyright (c) CodeTanzania & Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
