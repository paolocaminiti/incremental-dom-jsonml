import {
	elementOpenStart,
	elementOpenEnd,
	elementClose,
	attr,
	text
} from 'incremental-dom'

function _openTag(head, key) {
	let dotSplit = head.split('.')
	let hashSplit = dotSplit[0].split('#')

	let tagName = hashSplit[0] || 'div'
	let id = hashSplit[1]
	let className = dotSplit.length > 1 ? dotSplit.slice(1).join(' ') : undefined

	elementOpenStart(tagName, key, ['id', id, 'class', className])

	return tagName
}

export default function jsonml(markup) {
	let head = markup[0]
	let attrsObj = markup[1]
	let hasAttrs = attrsObj && attrsObj.constructor === Object
	let key = hasAttrs ? attrsObj.key : null

	let tagName = _openTag(head, key)

	if (hasAttrs) {
		for (let k in attrsObj) {
			if (k === 'key') continue
			attr(k, attrsObj[k])
		}
	}

	elementOpenEnd()

	for (let i = hasAttrs ? 2 : 1, l = markup.length; i < l; i++) {
		let node = markup[i]

		if (node === undefined) continue

		if (Array.isArray(node)) {
			_jsonml(node)
		} else {
			text(node)
		}
	}

	elementClose(tagName)
}