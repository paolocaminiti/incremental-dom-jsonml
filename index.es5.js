var jsonml = (function () {
	"use strict";

	var elementOpenStart = IncrementalDOM.elementOpenStart
	var elementOpenEnd = IncrementalDOM.elementOpenEnd
	var elementClose = IncrementalDOM.elementClose
	var attr = IncrementalDOM.attr
	var text = IncrementalDOM.text

	function _openTag(head, key) {
		var dotSplit = head.split('.')
		var hashSplit = dotSplit[0].split('#')

		var tagName = hashSplit[0] || 'div'
		var id = hashSplit[1]
		var className = dotSplit.length > 1 ? dotSplit.slice(1).join(' ') : undefined

		elementOpenStart(tagName, key, ['id', id, 'class', className])

		return tagName
	}

	function _jsonml(markup) {
		var head = markup[0]
		var attrsObj = markup[1]
		var hasAttrs = attrsObj && attrsObj.constructor === Object
		var key = hasAttrs ? attrsObj.key : null

		var tagName = _openTag(head, key)

		if (hasAttrs) {
			for (var k in attrsObj) {
				if (k === 'key') continue
				attr(k, attrsObj[k])
			}
		}

		elementOpenEnd()

		for (var i = hasAttrs ? 2 : 1, l = markup.length; i < l; i++) {
			var node = markup[i]

			if (node === undefined) continue

			if (Array.isArray(node)) {
				_jsonml(node)
			} else {
				text(node)
			}
		}

		elementClose(tagName)
	}

	return _jsonml
})();