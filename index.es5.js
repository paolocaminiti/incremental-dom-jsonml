var jsonml = function () {
	var elementOpen = IncrementalDOM.elementOpen
	var elementClose = IncrementalDOM.elementClose
	var text = IncrementalDOM.text

	function getArgs(head, key) {
		var dotSplit = head.split('.')
		var hashSplit = dotSplit[0].split('#')

		var tagName = hashSplit[0] || 'div'
		var id = hashSplit[1]
		var className = dotSplit.slice(1).join(' ')

		var args = [tagName, key, null]

		if (id || className) {
			var statics = args[2] = []
			if (id) {
				statics.push('id')
				statics.push(id)
			}
			if (className) {
				statics.push('class')
				statics.push(className)
			}
		}

		return args
	}

	function _jsonml(markup) {
		var attrsObj = markup[1]
		var hasAttrs = attrsObj && attrsObj.constructor === Object
		var key = attrsObj ? attrsObj.key : null
		var args = getArgs(markup[0], key)

		if (hasAttrs) {
			for (var k in attrsObj) {
				if (k === 'key') continue
				args.push(k)
				args.push(attrsObj[k])
			}

			if (attrsObj.__placeholder) {
				elementPlaceholder.apply(null, args)
				return
			}
		}

		elementOpen.apply(null, args)

		for (var i = hasAttrs ? 2 : 1, len = markup.length, item; i < len; i++) {
			item = markup[i]

			if (!item) continue;

			if (Array.isArray(item)) {
				_jsonml(item)
			} else {
				text(item)
			}
		}

		elementClose(args[0])
	}

	return _jsonml
}();
