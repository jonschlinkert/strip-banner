const expect = require('chai').expect;
const file = require('fs-utils');
const strip = require('../');


describe('empty:', function () {
  it('should not throw an error at an empty string.', function () {
    var actual = strip();
    var expected = '';
    expect(actual).to.eql(expected);
  });
});

describe('banners only:', function () {
  it('should strip banners only.', function () {
    var fixture = file.readFileSync('test/fixtures/banner-strip.js');
    var actual = strip(fixture);
    var expected = file.readFileSync('test/expected/banner-strip.js');
    expect(actual).to.eql(expected);
  });
});
