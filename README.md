## Because your DOM ain't nothing but a nested list!

#### No, seriously, why JSONML...
- there's nothing fancy about it, not even the name.
- there's no syntax to learn, no arbitrary semantics overhead either.
- there's no directives, factories, superheros, added magic or atomic science.

There's litterally about nothing to learn here, meaning very little risk of forthcoming obsolescence. The fine art of lists composition has been around forever, jsonml quite a while as well.

Your DOM is expressed by nested arrays as a simple data structure. You can compose it exploiting the full expressiveness of the language, from pure functions to array extras, external libraries, ES6 goodness.

Togheter with Incremental DOM it allows in place DOM mutations, which leads to declarative views.

##### Live demos
[circles](http://paolocaminiti.github.io/incremental-dom-jsonml/demo/circles), benchmark.

[dbmonster](http://paolocaminiti.github.io/incremental-dom-jsonml/demo/dbmonster), benchmark.

[primer6](http://paolocaminiti.github.io/incremental-dom-jsonml/demo/primer6), *shouldComponentUpdate* equivalent.

##### Basic usage
```javascript
function item(i, index) {
  function action (e) {
    var text = e.target.stateRef.text
    console.log(text)
  }

  return ['li',
    ['div.class-1.class-2', { style: 'color: blue;' }
      `item: ${index} `,
      i.text
    ],
    ['button', { onclick: action, stateRef: i }]
  ]
}

function list(state) {
  return ['ul', ...state.list.map(item)]
}

function app(state) {
  return ['#approt.app', { style: { color: 'black' } },
    ['p', 'A list in an app'],
    list(state)
  ]
}

function update() {
  IncrementalDOM.patch(node, jsonml, app(state))
}
```

##### All there is to know about JSONML
- A nested array maps 1:1 to your DOM.
- Each array describes an element.
- The head of each array is by convention the tag name.
- An optional subsequesnt object will contain key/value pairs for the attributes.
- All following items in the array are children of the element: arrays again for elements, everything else as text nodes.

##### Specific to this library
The *head of the array* accepts css syntax for id and classes 'div#id.class1.class2' and defaults to DIV. Note that dynamic attributes are better declared in the attributes object *{ id: dynamicId, class: dynamicClasses, ... }*.

Children positions containing falsy values are just ignored, this simplifies composition by allowing fragment functions to return undefined.

Attributes values of type Object or Function will be [assigned as properties](http://google.github.io/incremental-dom/#rendering-dom/attributes-and-properties) of the element.

*{ _key: uniqueKey, ... }* attribute assigns an Incremental DOM key to the element.

##### Where is *shouldComponentUpdate*?
*{ _skip: true, ... }* on an element will tell Incremental DOM to skip diffing it's descendants and resume traversal. This effectively let's you treat an element as a "component" root that doesn't need any update. Element _key is mandatory in this case. (See [primer6 demo](http://paolocaminiti.github.io/incremental-dom-jsonml/demo/primer6/) for possible usage).

##### Advanced tricks
A *style* attribute can be assigned both as a string or an object, [an object being mapped directly to style properties](http://google.github.io/incremental-dom/#rendering-dom/applying-styles).

By assigning objects to element's properties arbitrary data, other than standard properties, can be added to any element, this is expecially usefull in event handling.

When you want to coherce a string or number to be assigned as a property instead of an attribute create a new instance of it *{ inputValueName: new String(value), ... }*.

TODO Mixing static content

##### Server side rendering
[Look here for experiments](https://github.com/paolocaminiti/incremental-dom-to-string) in this direction, turns out Incremental DOM API is really simple to map to string output.

##### Browser compatibility

Just the same as Incremental DOM itself, which by now seems to target IE9.

### Learn more
Really that's all there is to learn.

ES6 modules + [Redux](https://github.com/rackt/redux) seem a very good option to go, allowing scalability while keeping things simple and real.

I suggest reading the, short, [Incremental DOM documentation](http://google.github.io/incremental-dom/#about) and running one of their small examples in the debugger to get a full picture of what is going on.

[http://www.jsonml.org/](http://www.jsonml.org/) may also be a source of related usefull infos.

### Tests
Once I settle on how to do it properly along with Incremental DOM.

### Opinions

[Link to irrelevant rumblings](https://github.com/paolocaminiti/incremental-dom-jsonml/blob/master/OPINIONS.md) about performance and apps' architecture.
