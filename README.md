#tab-size.js

*tab-size.js* is a polyfill for the CSS3 `tab-size` property. It provides a jQuery plugin (`$.tabSize`) as well as a global function (`tabSize`).

At the time of writing, the `tab-size` property is natively suppored by Firefox via `-moz-tab-size` and by Opera via `-o-tab-size`.

For the most recent information, refer to [MDC](https://developer.mozilla.org/en/CSS/-moz-tab-size) and [caniuse](http://caniuse.com/).

# Usage

##CSS

Since vendor prefixes are a pain in the rear, you have to use all prefixed versions as well as the non-prefixed one:

	-webkit-tab-size: 4; /* future? */
	-moz-tab-size: 4;    /* Firefox 4+ */
	-ms-tab-size: 4;     /* future? */
	-o-tab-size: 4;      /* Opera 9.5+ */
	tab-size: 4;         /* future? */

**Note:** If the `tab-size` property (or one of the prefixed versions) is supported, the plugin/function won't do anything. It was written under the assumption that you'll do the right thing and use CSS whenever you can.

##Polyfilling via the jQuery Plugin

<code>$(<var>selector</var>).tabSize(<var>size</var>);</code>

* `size` &ndash; the tab size, default: `4`

##Polyfilling via the Global Function

**Note:** Since `querySelectorAll` is not supported by IE6 and IE7, the function won't do anything if those browsers are used.

<code>tabSize(<var>selector</var>, <var>size</var>);</code>

* `selector` &ndash; the selector passed to `querySelectorAll`, default: `"pre"`
* `size` &ndash; the tab size, default: `4`