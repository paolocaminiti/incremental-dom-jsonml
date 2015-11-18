## Because your DOM ain't nothing but a nested list!

##### No, seriously, why JSONML...
- there's nothing fancy about it, not even the name.
- there's no syntax to learn, no arbitrary semantics overhead either.
- there's no directives, factories, superheros, added magic or atomic science.

There's litterally about nothing to learn here, meaning very little risk of forthcoming obsolescence. The fine art of lists composition has been around forever, jsonml quite a while as well.

Your DOM is expressed by nested arrays as a pure data structure. You can compose it exploiting the full expressiveness of the language, from pure functions to array extras, external libraries, ES6 goodness.

Togheter with Incremental DOM it allows in place DOM mutations, which leads to declarative views.

##### Live demos

##### Basic usage
```
function item(i, index) {
  function action (e) {
    var text = e.target.stateRef.text
    console.log(text)
  }

  return ['li,
    ['.item-class1.item-class2', { style: 'color: blue;' }
      `item: ${ index } `,
      i.text
    ],
    ['button', { onclick: action, stateRef: i }]
  ]
}

funciton list(state) {
  return ['ul', state.list.map(item)]
}

function app(state) {
  return ['div#approt.app', { style: "color: black;" },
    ['p', 'A list in an app'],
    list(state)
  ]
}

function render(state) {
  jsonml(app(state))
}

function update() {
  IncrementalDOM.patch(node, render, state)
}
```

##### All there is to know about JSONML:
- A nested array maps 1:1 to your DOM, which indeed really is an XML nested list.
- Each array describes an element.
- The head of each array is by convention the tag name.
- An optional subsequesnt object will contain key value pairs for the attributes.
- All following items in the array are children of the element: arrays again for elements, everything else as text nodes.

##### Specific to this library:
- *the head of the array* can contain css syntax for id and classes 'div#id.class1.class2' and defaults to DIV. Where present id and classes will be assigned as [Incremental DOM static properties](http://google.github.io/incremental-dom/#rendering-dom/statics-array). (note that a key should be passed in the attributes to gain benefits from static properties, as of now this library doesn't autogenerate one)

- *key/value pairs in the attributes's object* will be assigned as [Incremental DOM dynamic properties](http://google.github.io/incremental-dom/#rendering-dom/attributes-and-properties). Here you can dynamically set the id and classes as { id: 'id', class: 'class1 class2', ... }. Incremental DOM will use String and Number as attributes, Object as an element property.

- *{ key: value, ... }* attribute assigns an Incremental DOM key to the element

##### Where is "shouldComponentUpdate"?
In incremental DOM, branches are skipped when an element is explicitly set as a placeholder usinga *{ __placeholder: true, ... }* attribute. The placeholder will act as a root and descendants are skipped. Note that a key is mandatory for the placeholder. Once a placeholder turns true the inner jsonml generation should be skipped (see the primer6 demo).

##### Advanced tricks
Style attribute can be assigned both as a string or object, [an object will be map directly to style properties](http://google.github.io/incremental-dom/#rendering-dom/applying-styles).

When you want to coherce a string or number to be assigned as a property instead of an attribute create a new instance of it *{ inputValueName: new String(value), ... }*.

By assigning objects to element's properties arbitrary data can be added to the elements, this is expecially usefull in event handling.

TODO Static content

##### Learn more
Really that's all there is to learn. I suggest reading the, short, [Incremental DOM documentation](http://google.github.io/incremental-dom/#about) and running one of their small examples in the debbuger to get a full picture of what is going on. http://www.jsonml.org/ may also be a source of related usefull infos.

##### Application's architecture
TODO howto redux

TODO howto routing

##### Performance considerations
TODO

##### What's it good for?
TODO

##### Server side rendering
[Look here for experiments](https://github.com/paolocaminiti/incremental-dom-to-string) in this direction, turns out Incremental DOM API is really simple to map to string output.

##### Further
TODO

##### About this library
All this library does is making the relevant Incremental DOM calls while traversing the JSONML DOM description.

At around 50 loc not only it's lightweight (Incremental DOM itself is < 10kb), it's easily hackable to tailor around any specific needs you may encounter in your projects, instead of resorting on weird workarounds.

There are lots of ways to use Incremental DOM methods and I tried out many, the code published here is and will be changed accordingly to be the simplest and most performant I can come with.

The stability of the JSONML format somewhat protects from Incremental DOM experimental status, still things like *key* *__placeholder* *statics/dynamic properties* assignment are subject to vary.

##### Tests
Once I settle on how to do it properly along with Incremental DOM.