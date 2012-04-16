# Decimal.js

Decimal.js is a decimal number library for JS.

## Example

    var d1 = Decimal.parse("0.1");
    var d2 = Decimal.parse("0.3");
    var d3 = d1.decimalByAdding(d2);

## Features

* Parse string as a decimal number
* Print a decimal number
* Add / subtract / mutliply decimal numbers 
  (Dividing not supported since we have no plan to use it now.)

## Known Issue

* No dividing operation provided.

## Dependencies

Nothing.

Unit tests included in `test` directory uses YUI Test.

## Author

Written by Soutaro Matsumoto at Ubiregi Inc. (matsumoto at ubiregi dot com)

Released under the MIT License: www.opensource.org/licenses/mit-license.php

github.com/ubiregiinc/decimal.js


