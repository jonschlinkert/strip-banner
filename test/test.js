'use strict';

require('mocha');
var fs = require('fs');
var path = require('path');
var assert = require('assert');
var strip = require('..');

function read(fp) {
  return fs.readFileSync(path.resolve('test', fp), 'utf8');
}

describe('strip-banner:', function() {
  it('should no choke on empty strings', function() {
    assert.equal(strip(''), '');
  });

  it('should return the string when no banner is found', function() {
    var actual = strip(read('fixtures/no-banner.js'));
    var expected = read('expected/no-banner.js');
    assert.equal(actual, expected);
  });

  it('should not strip non-banner comments', function() {
    var actual = strip(read('fixtures/comment.js'));
    var expected = read('expected/comment.js');
    assert.equal(actual, expected);
  });

  it('should strip a normal banners', function() {
    var actual = strip(read('fixtures/banner.js'));
    var expected = read('expected/banner.js');
    assert.equal(actual, expected);
  });

  it('should strip a protected banners', function() {
    var actual = strip(read('fixtures/protected.js'));
    var expected = read('expected/protected.js');
    assert.equal(actual, expected);
  });

  it('should strip banners preceded by "use strict" statements', function() {
    var actual = strip(read('fixtures/use-strict.js'));
    var expected = read('expected/use-strict.js');
    assert.equal(actual, expected);
  });

  it('should not strip a protected banners when "options.keepProtected" is true', function() {
    var actual = strip(read('fixtures/protected.js'), {keepProtected: true});
    var expected = read('expected/protected-keep.js');
    assert.equal(actual, expected);
  });

  it('should not strip config comments', function() {
    var actual = strip(read('fixtures/config-comment.js'));
    var expected = read('expected/config-comment.js');
    assert.equal(actual, expected);
  });
});
