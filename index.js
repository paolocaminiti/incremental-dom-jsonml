import {
	elementClose,
	elementOpen,
	elementPlaceholder,
	text
} from 'incremental-dom';

function getArgs(head, key) {
	let dotSplit = head.split('.')
	let hashSplit = dotSplit[0].split('#')

	let tagName = hashSplit[0] || 'div'
	let id = hashSplit[1]
	let className = dotSplit.slice(1).join(' ')

	let args = [tagName, key, null]

	if (id || className) {
		let statics = args[2] = []
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

export default function jsonml(markup) {
	let attrsObj = markup[1]
	let hasAttrs = attrsObj && attrsObj.constructor === Object
	let key = attrsObj ? attrsObj.key : null
	let args = getArgs(markup[0], key)

	if (hasAttrs) {
		for (let k in attrsObj) {
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

	for (let i = hasAttrs ? 2 : 1, len = markup.length, item; i < len; i++) {
		item = markup[i]

		if (!item) continue

		if (Array.isArray(item)) {
			jsonml(item)
		} else {
			text(item)
		}
	}

	elementClose(args[0])
}