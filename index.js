import {
	elementClose,
	elementOpen,
	elementPlaceholder,
	text
} from 'incremental-dom'

function parseHead(head) {
	let dotSplit = head.split('.')
	let hashSplit = dotSplit[0].split('#')

	return {
		tagName: hashSplit[0] || 'div',
		id: hashSplit[1],
		className: dotSplit.slice(1).join(' ')
	}
}

function getArgs(head, key) {
	let { tagName, id, className } = parseHead(head)
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
	let hasAttrs = typeof attrsObj === 'object'
	let attrs = hasAttrs ? attrsObj : {}
	let args = getArgs(markup[0], attrs['key'])

	for (let k in attrs) {
		args.push(k)
		args.push(attrs[k])
	}

	if (attrs.__placeholder) {
		elementPlaceholder.apply(null, args)
		return
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