/*global describe:false, it:false, expect:false*/

var tabSize = require('../tab-size');

describe('tab-size', function () {
	
	describe('indentLine', function () {
		var il = tabSize.indentLine;
		it('should replace leading tabs with the right amount of spaces', function () {
			expect(il('\t1', 0)).toEqual('1');
			expect(il('\t2', 3)).toEqual('   2');
			expect(il('\t\t3', 2)).toEqual('    3');
		});
		it('should return the given text as is, if it doesn\'t contain any tabs', function () {
			expect(il('abc', 4)).toEqual('abc');
		});
		it('should replace tabs inside strings with the right amount of spaces', function () {
			expect(il('a\tb', 2)).toEqual('a b');
			expect(il('a\t\tb', 2)).toEqual('a   b');
			expect(il('a\t\tb\tc', 2)).toEqual('a   b c');
		});
		it('should only count the characters of text content', function () {
			expect(il('a<a>\tb', 2)).toEqual('a<a> b');
			expect(il('a<abc>\tb', 2)).toEqual('a<abc> b');
			expect(il('a<a foo="bar">\tb', 2)).toEqual('a<a foo="bar"> b');
		});
		it('should count ">" if there wasn\'t a "<" before', function () {
			expect(il('>\tb', 2)).toEqual('> b');
		});
	});
	
	describe('indentBlock', function () {
		var ib = tabSize.indentBlock;
		it('should indent a whole block', function () {
			expect(ib('a\tb\n\nc\t\td', 2)).toEqual('a b\n\nc   d');
		});
	});
});