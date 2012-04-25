/*jslint plusplus:false, browser:true*/
/*global exports:false, module:false, jQuery:false*/

(function () {
	var indentLine, indentBlock, isTabSizeSupported;
	indentLine = function (line, tabSize) {
		var i, len, text, cursor, current, spaces, k, insideTag;
		len = line.length;
		text = '';
		cursor = 0;
		insideTag = false;
		for (i = 0; i < len; i++) {
			current = line.charAt(i);
			if (current === '>') {
				insideTag = false;
			}
			if (current === '\t') {
				spaces = tabSize - (cursor % tabSize);
				for (k = spaces; k--;) {
					text += ' ';
				}
				cursor += spaces;
			} else {
				text += current;
				if (!insideTag) {
					cursor++;
				}
			}
			if (current === '<') {
				insideTag = true;
			}
		}
		return text;
	};
	indentBlock = function (text, tabSize) {
		var lines, i, len;
		lines = text.split('\n');
		for (i = 0, len = lines.length; i < len; i++) {
			lines[i] = indentLine(lines[i], tabSize || 4);
		}
		return lines.join('\n');
	};
	isTabSizeSupported = function () {
		var s = document.documentElement.style;
		return s.tabSize !== undefined ||
			s.OTabSize !== undefined ||
			s.MsTabSize !== undefined ||
			s.MozTabSize !== undefined ||
			s.WebkitTabSize !== undefined;
	};
	if (typeof module === 'object' && module.exports) {
		exports.indentLine = indentLine;
		exports.indentBlock = indentBlock;
	} else {
		window.tabSize = function (selector, tabSize) {
			var elements, i;
			if (!isTabSizeSupported() && document.querySelectorAll) {
				elements = document.querySelectorAll(selector || 'pre');
				for (i = elements.length; i--;) {
					elements[i].innerText = indentBlock(elements[i].innerText, tabSize);
				}
			}
		};
	}
	if (typeof jQuery === 'function') {
		(function ($) {
			$.fn.tabSize = function (tabSize) {
				if (isTabSizeSupported()) {
					return this;
				} else {
					return this.each(function () {
						this.innerText = indentBlock(this.innerText, tabSize);
					});
				}
			};
		}(jQuery));
	}
}());