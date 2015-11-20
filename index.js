import {
	elementOpenStart,
	elementOpenEnd,
	elementClose,
	skip,
	attr,
	text
} from 'incremental-dom'

function _openTag(head, _key) {
	let dotSplit = head.split('.')
	let hashSplit = dotSplit[0].split('#')

	let tagName = hashSplit[0] || 'div'
	let id = hashSplit[1]
	let className = dotSplit.slice(1).join(' ')

	elementOpenStart(tagName, _key)
	if (id) attr('id', id)
	if (className) attr('class', className)

	return tagName
}

function _applyAttrsObj(attrsObj) {
	for (let k in attrsObj) {
		if (k === '_key' || k === '_skip') continue
		attr(k, attrsObj[k])
	}
}

export default function jsonml(markup) {
	let head = markup[0]
	let attrsObj = markup[1]
	let hasAttrs = attrsObj && attrsObj.constructor === Object
	let firstChildPos = hasAttrs ? 2 : 1
	let _key = hasAttrs && attrsObj._key
	let _skip = hasAttrs && attrsObj._skip

	let tagName = _openTag(head, _key)

	if (hasAttrs) _applyAttrsObj(attrsObj)

	elementOpenEnd()

	if (_skip) {
		skip()
	} else {
		for (let i = firstChildPos, len = markup.length; i < len; i++) {
			let node = markup[i]

			if (!node) continue

			if (Array.isArray(node)) {
				_jsonml(node)
			} else {
				text(node)
			}
		}
	}

	elementClose(tagName)
}