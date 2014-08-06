var should = require('should');
var window = {};
var JVW = require('..');

describe('Module functions', function() {
  it('Should expose a function', function() {
    JVW.should.be.instanceOf(Function);
  });
  it('Should do as expected', function(done) {
    var old = 'test' + Math.random() * 1000;
    window.testvariable = old;
    var newvar = 'test2' + Math.random() * 1000;
    var j = new JVW(null, window);
    j.add('testvariable', function(v, o, n) {
      o.should.equal(old);
      n.should.equal(newvar);
      v.should.equal('testvariable');
      done();
    });

    window.testvariable = newvar; 
  });


});
