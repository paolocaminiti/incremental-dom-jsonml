# Because your DOM ain't nothing but a nested list!

##### No, seriously, why JSONML...
- there's nothing fancy about it, not even the name
- there's no syntax to learn, no arbitrary semantic overhead either
- there's no directives, factories, superheros, added magic or atomic science
- the fine art of lists composition has been around for ever (jsonml quite a bit as well)

There's litterally about nothing to learn here, meaning there's almost no risk of forthcoming obsolescence adopting it.

Your DOM is expressed by nested arrays as a pure data structure. You can compose it exploiting the full expressiveness of the language, from pure functions to array extras, to external libraries, to ES6 goodness

Using it togheter with Incremental DOM allows for in place DOM mutations, which leads to declarative views.

All this library does is making the relevant Incremental DOM calls while traversing your JSONML DOM description.

At around 50 loc not only it's lightweight (Incremental DOM itself is < 10kb), it's easily hackable to tailor around any specific need you may encounter in your projects, instead of resorting on weird workarounds.

##### All there is to know about JSONML:
- A nested array maps 1:1 with your DOM, which indeed really is an XML nested list.
- Each array describes an element.
- The head of each array is by convention the tag name.
- An optional subsequesnt object will contain all the key value map of the attributes, if any.
- All following items in the array are children of the element, primitive values for text nodes, arrays again for elements.

##### Usage
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

function list(state) {
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

##### The head of the array
Must be a string. Can contain css syntax for id and classes 'div#id.class1.class2' and defaults to DIV. Where present id and classes will be assigned as Incremental DOM static properties.

##### The attributes's object
All key value pairs will be assigned as Incremental DOM dynamic properties. Here you can set dinamically the id and classes as { id: 'id', class: 'class1 class2', ... }.

##### Assigning an Incremental DOM key to an element
Provide a { '__key': value, ...} in the attributes's object.

##### Where is "shouldComponentUpdate"?
In incremental DOM branches will be skipped when an element is explicitly set as a placeholder, to do so (along with a key) put { __placeholder: true, ... } in the attribute's object.


.
