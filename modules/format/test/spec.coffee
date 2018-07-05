describe 'format tests', ->
  check = (a, b) -> a.should.equal(b)

  { round, si, exp, fixed, zeroPad } = hx

  it 'format.round works',  ->
    check hx.format.round(1)(-10), '-10'
    check hx.format.round(1)(-101), '-100'
    check hx.format.round(1)(-10101), '-10000'
    check hx.format.round(1)(-1010101), '-1000000'
    check hx.format.round(1)(10), '10'
    check hx.format.round(1)(101), '100'
    check hx.format.round(1)(10101), '10000'
    check hx.format.round(1)(1010101), '1000000'

    check hx.format.round(2)(-0.00000234), '-0.0000023'
    check hx.format.round(2)(-0.00000237), '-0.0000024'
    check hx.format.round(2)(-0.00234), '-0.0023'
    check hx.format.round(2)(-1), '-1'
    check hx.format.round(2)(-123), '-120'
    check hx.format.round(2)(-9), '-9'
    check hx.format.round(2)(0.00000234), '0.0000023'
    check hx.format.round(2)(0.00000237), '0.0000024'
    check hx.format.round(2)(0.00234), '0.0023'
    check hx.format.round(2)(1), '1'
    check hx.format.round(2)(123), '120'
    check hx.format.round(2)(9), '9'

    check hx.format.round(3)(-0.00234), '-0.00234'
    check hx.format.round(3)(-10101), '-10100'
    check hx.format.round(3)(-1234), '-1230'
    check hx.format.round(3)(0.00234), '0.00234'
    check hx.format.round(3)(10101), '10100'
    check hx.format.round(3)(1234), '1230'

    check hx.format.round(5)(-1010101), '-1010100'
    check hx.format.round(5)(1010101), '1010100'

    check hx.format.round(2)('string test'), 'string test'
    check hx.format.round(2, false)('string test'), 'string test'
    check hx.format.round(2, true)('string test'), 'NaN'

  it 'format.si works',  ->
    check hx.format.si(1)(-10), '-10'
    check hx.format.si(1)(-101), '-100'
    check hx.format.si(1)(-10101), '-10K'
    check hx.format.si(1)(-1010101), '-1M'
    check hx.format.si(1)(10), '10'
    check hx.format.si(1)(101), '100'
    check hx.format.si(1)(10101), '10K'
    check hx.format.si(1)(1010101), '1M'

    check hx.format.si(2)(-0.00000234), '-2.3µ'
    check hx.format.si(2)(-0.00000237), '-2.4µ'
    check hx.format.si(2)(-0.00234), '-2300µ'
    check hx.format.si(2)(-0.0062), '-6200µ'
    check hx.format.si(2)(-1), '-1'
    check hx.format.si(2)(-123), '-120'
    check hx.format.si(2)(-9), '-9'
    check hx.format.si(2)(0.00000234), '2.3µ'
    check hx.format.si(2)(0.00000237), '2.4µ'
    check hx.format.si(2)(0.00234), '2300µ'
    check hx.format.si(2)(1), '1'
    check hx.format.si(2)(123), '120'
    check hx.format.si(2)(9), '9'

    check hx.format.si(3)(-0.00234), '-2340µ'
    check hx.format.si(3)(-10101), '-10.1K'
    check hx.format.si(3)(-1234), '-1.23K'
    check hx.format.si(3)(0.00234), '2340µ'
    check hx.format.si(3)(1.1e27), '1100Y'
    check hx.format.si(3)(1.1e28), '11000Y'
    check hx.format.si(3)(1.1e29), '110000Y'
    check hx.format.si(3)(1.1e30), '1100000Y'
    check hx.format.si(3)(10101), '10.1K'
    check hx.format.si(3)(1234), '1.23K'
    check hx.format.si(5)(-1010101), '-1.0101M'
    check hx.format.si(5)(1010101), '1.0101M'

    check hx.format.si(2, true)('string test'), 'NaN'
    check hx.format.si(2, false)('string test'), 'string test'
    check hx.format.si(2)('string test'), 'string test'

  it 'format.exp works',  ->
    check hx.format.exp(1)(-0.000019234), '-2e-5'
    check hx.format.exp(1)(-0.0001923), '-2e-4'
    check hx.format.exp(1)(-0.00192), '-2e-3'
    check hx.format.exp(1)(-123), '-1e2'
    check hx.format.exp(1)(-1234), '-1e3'
    check hx.format.exp(1)(-12345), '-1e4'
    check hx.format.exp(1)(-192), '-2e2'
    check hx.format.exp(1)(-1923), '-2e3'
    check hx.format.exp(1)(-19234), '-2e4'
    check hx.format.exp(1)(0.001923), '2e-3'
    check hx.format.exp(1)(0.0019234), '2e-3'
    check hx.format.exp(1)(0.0192), '2e-2'
    check hx.format.exp(1)(123), '1e2'
    check hx.format.exp(1)(1234), '1e3'
    check hx.format.exp(1)(12345), '1e4'
    check hx.format.exp(1)(192), '2e2'
    check hx.format.exp(1)(1923), '2e3'
    check hx.format.exp(1)(19234), '2e4'

    check hx.format.exp(2)(-123), '-1.2e2'
    check hx.format.exp(2)(-1234), '-1.2e3'
    check hx.format.exp(2)(-12345), '-1.2e4'
    check hx.format.exp(2)(123), '1.2e2'
    check hx.format.exp(2)(1234), '1.2e3'
    check hx.format.exp(2)(12345), '1.2e4'

    check hx.format.exp(2)('string test'), 'string test'
    check hx.format.exp(2, false)('string test'), 'string test'
    check hx.format.exp(2, true)('string test'), 'NaN'

  it 'format.fixed works',  ->
    check hx.format.fixed(1)(-0.000019234), '-0.0'
    check hx.format.fixed(1)(-0.0001923), '-0.0'
    check hx.format.fixed(1)(-0.00192), '-0.0'
    check hx.format.fixed(1)(-123), '-123.0'
    check hx.format.fixed(1)(-1234), '-1234.0'
    check hx.format.fixed(1)(-12345), '-12345.0'
    check hx.format.fixed(1)(-192), '-192.0'
    check hx.format.fixed(1)(-1923), '-1923.0'
    check hx.format.fixed(1)(-19234), '-19234.0'
    check hx.format.fixed(1)(0.001923), '0.0'
    check hx.format.fixed(1)(0.0019234), '0.0'
    check hx.format.fixed(1)(0.192), '0.2'
    check hx.format.fixed(1)(123), '123.0'
    check hx.format.fixed(1)(1234), '1234.0'
    check hx.format.fixed(1)(12345), '12345.0'
    check hx.format.fixed(1)(192), '192.0'
    check hx.format.fixed(1)(1923), '1923.0'
    check hx.format.fixed(1)(19234), '19234.0'

    check hx.format.fixed(2)(-1.234), '-1.23'
    check hx.format.fixed(2)(-10.234), '-10.23'
    check hx.format.fixed(2)(-123), '-123.00'
    check hx.format.fixed(2)(-1234), '-1234.00'
    check hx.format.fixed(2)(-12345), '-12345.00'
    check hx.format.fixed(2)(1.234), '1.23'
    check hx.format.fixed(2)(10.234), '10.23'
    check hx.format.fixed(2)(123), '123.00'
    check hx.format.fixed(2)(1234), '1234.00'
    check hx.format.fixed(2)(12345), '12345.00'

    check hx.format.fixed(2)('string test'), 'string test'
    check hx.format.fixed(2, false)('string test'), 'string test'
    check hx.format.fixed(2, true)('string test'), 'NaN'

  it 'format.zeroPad works', ->
    check hx.format.zeroPad(5)(123), '00123'
    check hx.format.zeroPad(5)(1234), '01234'
    check hx.format.zeroPad(5)(12345), '12345'
    check hx.format.zeroPad(5)(123456), '123456'

    check hx.format.zeroPad(5)('string test'), 'string test'
    check hx.format.zeroPad(5, false)('string test'), 'string test'
    check hx.format.zeroPad(5, true)('string test'), 'NaN'

  it 'round works',  ->
    check round(-0.00000234), '-0.0000023'
    check round(-0.00000237), '-0.0000024'
    check round(-0.00234), '-0.0023'
    check round(-1), '-1'
    check round(-123), '-120'
    check round(-9), '-9'
    check round(0), '0'
    check round(0.00000234), '0.0000023'
    check round(0.00000237), '0.0000024'
    check round(0.00234), '0.0023'
    check round(1), '1'
    check round(123), '120'
    check round(9), '9'

    check round(-10, { sf: 1 }), '-10'
    check round(-101, { sf: 1 }), '-100'
    check round(-10101, { sf: 1 }), '-10000'
    check round(-1010101, { sf: 1 }), '-1000000'
    check round(10, { sf: 1 }), '10'
    check round(101, { sf: 1 }), '100'
    check round(10101, { sf: 1 }), '10000'
    check round(1010101, { sf: 1 }), '1000000'

    check round(-0.00234, { sf: 3 }), '-0.00234'
    check round(-10101, { sf: 3 }), '-10100'
    check round(-1234, { sf: 3 }), '-1230'
    check round(0.00234, { sf: 3 }), '0.00234'
    check round(10101, { sf: 3 }), '10100'
    check round(1234, { sf: 3 }), '1230'

    check round(-1010101, { sf: 5 }), '-1010100'
    check round(1010101, { sf: 5 }), '1010100'

    check round(123, { strict: false }), '120'
    check round(123, { strict: true }), '120'

    check round('string test'), 'string test'
    check round('string test', { strict: false }), 'string test'
    check round('string test', { strict: true }), 'NaN'

  it 'si works',   ->
    check si(-0.00000234), '-2.3µ'
    check si(-0.00000237), '-2.4µ'
    check si(-0.00234), '-2300µ'
    check si(-0.0062), '-6200µ'
    check si(-1), '-1'
    check si(-123), '-120'
    check si(-9), '-9'
    check si(0), '0'
    check si(0.00000234), '2.3µ'
    check si(0.00000237), '2.4µ'
    check si(0.00234), '2300µ'
    check si(1), '1'
    check si(123), '120'
    check si(9), '9'

    check si(-10, { sf: 1 }), '-10'
    check si(-101, { sf: 1 }), '-100'
    check si(-10101, { sf: 1 }), '-10K'
    check si(-1010101, { sf: 1 }), '-1M'
    check si(10, { sf: 1 }), '10'
    check si(101, { sf: 1 }), '100'
    check si(10101, { sf: 1 }), '10K'
    check si(1010101, { sf: 1 }), '1M'

    check si(-0.00234, { sf: 3 }), '-2340µ'
    check si(-10101, { sf: 3 }), '-10.1K'
    check si(-1234, { sf: 3 }), '-1.23K'
    check si(0.00234, { sf: 3 }), '2340µ'
    check si(1.1e27, { sf: 3 }), '1100Y'
    check si(1.1e28, { sf: 3 }), '11000Y'
    check si(1.1e29, { sf: 3 }), '110000Y'
    check si(1.1e30, { sf: 3 }), '1100000Y'
    check si(10101, { sf: 3 }), '10.1K'
    check si(1234, { sf: 3 }), '1.23K'

    check si(-1010101, { sf: 5 }), '-1.0101M'
    check si(1010101, { sf: 5 }), '1.0101M'

    check si(123), '120'
    check si(123, { strict: false }), '120'
    check si(123, { strict: true }), '120'

    check si('string test'), 'string test'
    check si('string test', { strict: false }), 'string test'
    check si('string test', { strict: true }), 'NaN'

  it 'exp works',   ->
    check exp(-123), '-1.2e+2'
    check exp(-1234), '-1.2e+3'
    check exp(-12345), '-1.2e+4'
    check exp(0), '0e+0'
    check exp(1), '1e+0'
    check exp(123), '1.2e+2'
    check exp(1234), '1.2e+3'
    check exp(12345), '1.2e+4'

    check exp(-0.000019234, { sf: 1 }), '-2e-5'
    check exp(-0.0001923, { sf: 1 }), '-2e-4'
    check exp(-0.00192, { sf: 1 }), '-2e-3'
    check exp(-123, { sf: 1 }), '-1e+2'
    check exp(-1234, { sf: 1 }), '-1e+3'
    check exp(-12345, { sf: 1 }), '-1e+4'
    check exp(-192, { sf: 1 }), '-2e+2'
    check exp(-1923, { sf: 1 }), '-2e+3'
    check exp(-19234, { sf: 1 }), '-2e+4'
    check exp(0.001923, { sf: 1 }), '2e-3'
    check exp(0.0019234, { sf: 1 }), '2e-3'
    check exp(0.0192, { sf: 1 }), '2e-2'
    check exp(123, { sf: 1 }), '1e+2'
    check exp(1234, { sf: 1 }), '1e+3'
    check exp(12345, { sf: 1 }), '1e+4'
    check exp(192, { sf: 1 }), '2e+2'
    check exp(1923, { sf: 1 }), '2e+3'
    check exp(19234, { sf: 1 }), '2e+4'

    check exp(123, { strict: false }), '1.2e+2'
    check exp(123, { strict: true }), '1.2e+2'

    check exp('string test'), 'string test'
    check exp('string test', { strict: false }), 'string test'
    check exp('string test', { strict: true }), 'NaN'

  it 'fixed works', ->
    check fixed(-1.234), '-1.23'
    check fixed(-10.234), '-10.23'
    check fixed(-123), '-123.00'
    check fixed(-1234), '-1234.00'
    check fixed(-12345), '-12345.00'
    check fixed(0), '0.00'
    check fixed(1.234), '1.23'
    check fixed(10.234), '10.23'
    check fixed(123), '123.00'
    check fixed(1234), '1234.00'
    check fixed(12345), '12345.00'

    check fixed(-0.000019234, { digits: 1 }), '-0.0'
    check fixed(-0.0001923, { digits: 1 }), '-0.0'
    check fixed(-0.00192, { digits: 1 }), '-0.0'
    check fixed(-123, { digits: 1 }), '-123.0'
    check fixed(-1234, { digits: 1 }), '-1234.0'
    check fixed(-12345, { digits: 1 }), '-12345.0'
    check fixed(-192, { digits: 1 }), '-192.0'
    check fixed(-1923, { digits: 1 }), '-1923.0'
    check fixed(-19234, { digits: 1 }), '-19234.0'
    check fixed(0.001923, { digits: 1 }), '0.0'
    check fixed(0.0019234, { digits: 1 }), '0.0'
    check fixed(0.192, { digits: 1 }), '0.2'
    check fixed(123, { digits: 1 }), '123.0'
    check fixed(1234, { digits: 1 }), '1234.0'
    check fixed(12345, { digits: 1 }), '12345.0'
    check fixed(192, { digits: 1 }), '192.0'
    check fixed(1923, { digits: 1 }), '1923.0'
    check fixed(19234, { digits: 1 }), '19234.0'

    check fixed(123), '123.00'
    check fixed(123, { strict: false }), '123.00'
    check fixed(123, { strict: true }), '123.00'

    check fixed('string test'), 'string test'
    check fixed('string test', { strict: false }), 'string test'
    check fixed('string test', { strict: true }), 'NaN'

  it 'zeroPad works', ->
    check zeroPad(0), '00'
    check zeroPad(1), '01'
    check zeroPad(12), '12'
    check zeroPad(123), '123'

    check zeroPad(123, { length: 5 }), '00123'
    check zeroPad(123, { length: 5, strict: false }), '00123'
    check zeroPad(123, { length: 5, strict: true }), '00123'

    check zeroPad('string test'), 'string test'
    check zeroPad('string test', { strict: false }), 'string test'
    check zeroPad('string test', { strict: true }), 'NaN'
