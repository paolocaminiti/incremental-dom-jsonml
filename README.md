## Because your DOM ain't nothing but a nested list!

#### No, seriously, why JSONML...
- there's nothing fancy about it, not even the name.
- there's no syntax to learn, no arbitrary semantics overhead either.
- there's no directives, factories, superheros, added magic or atomic science.

There's litterally about nothing to learn here, meaning very little risk of forthcoming obsolescence. The fine art of lists composition has been around forever, jsonml quite a while as well.

Your DOM is expressed by nested arrays as a pure data structure. You can compose it exploiting the full expressiveness of the language, from pure functions to array extras, external libraries, ES6 goodness.

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
The *head of the array* accepts css syntax for id and classes 'div#id.class1.class2' and defaults to DIV.

Children positions containing falsy values are just ignored, this simplifies composition by allowing fragment functions to return undefined.

Attributes values of type Object or Function will be [assigned as properties](http://google.github.io/incremental-dom/#rendering-dom/attributes-and-properties) of the element.

*{ _key: uniqueKey, ... }* attribute assigns an Incremental DOM key to the element.

##### Where is *shouldComponentUpdate*?
*{ _skip: true, ... }* on an element will tell Incremental DOM to skip diffing it's descendants and resume traversal. This effectively let's you treat an element as a "component" root that doesn't need any update. Element _key is mandatory in this case. (See [primer6 demo](http://paolocaminiti.github.io/incremental-dom-jsonml/demo/primer6/) for possible usage).

##### Advanced tricks
Style attribute can be assigned both as a string or an object, [an object being mapped directly to style properties](http://google.github.io/incremental-dom/#rendering-dom/applying-styles).

By assigning objects to element's properties arbitrary data, other than standard properties, can be added to any element, this is expecially usefull in event handling.

When you want to coherce a string or number to be assigned as a property instead of an attribute create a new instance of it *{ inputValueName: new String(value), ... }*.

TODO Mixing static content

### Learn more
Really that's all there is to learn.

I suggest reading the, short, [Incremental DOM documentation](http://google.github.io/incremental-dom/#about) and running one of their small examples in the debugger to get a full picture of what is going on.

[http://www.jsonml.org/](http://www.jsonml.org/) may also be a source of related usefull infos.

BTW the library plays just fine with [Redux](https://github.com/rackt/redux), an example is coming.

Browser compatibility is just the same as Incremental DOM itself, which by now seems to target IE9.

### Opinions

##### Incremental DOM is still experimental
The stability of the JSONML format somewhat protects from Incremental DOM experimental status. Still things like *_key*, *_skip*, *statics/dynamic properties* assignment, and eventual new features or better understanding may vary this repo.

##### Compatibility with standard JSONML code
Only one attributes object at position 1 of the element's array is allowed. This is the only incompatibility with standard JSNOML where multiple attributes objects can be scattered anywhere after the head. Implementing this with Incremental DOM would be a performance hit on long child lists, and frankly i never used it.

##### Performance considerations
Talking raw frame rate, the demos provided sit just slightly behind hand coded incremental dom implementations. Performance can be made even closer by assigning some attributes, like the id and class from the tag definition, as Incremental DOM static properties, unfortunately right now this would mean providing a key for each element created with static properties (this is something the Incremental DOM team seems to be addressing, this library will be updated as soon as it gets stable).

That said performance is not so much of a deal, we are not doing videogames here and all demos presented are mere exagerations. Thanks to Incremental DOM the result is already excellent for real world web apps, in many cases ahead of far more complex libraries around.

What's really interesting is that memory behaves very well too, the array describing the dom is an easy target for GC and the memory footprint of the running demos stays stable, perfectly in line with the hand coded counterparts.

The transpiled approaches generating the Incremental DOM code from templating languages at build time should always have the last word here, but unless you're constrained by extreme performance/memory limitations this should not be of any concern.

##### What's it good for?
This library has no opinions about code architecture, so probably shouldn't be your pick for the next big monster project that will try to fire back at you as soon as you release it.

If you have a small project, or simply don't make monsters, like to have full control of your code architecture with a bit of third party libraries and much vanilla on top, then you can give it a try: expecially in small projects, coding without big misterious dependencies can be a refreshing experience.

I personally used JSONML for a long time to develop browser extensions, where you want to load as little dependencies as possible, and I can tell adding Incremental DOM to the mix allows far better reasoning and far simpler architecture.

ES6 modules + Redux seems a very good match to this library, promising scalability while keeping things simple and real.

##### Routing
TODO How to routing

##### Server side rendering
[Look here for experiments](https://github.com/paolocaminiti/incremental-dom-to-string) in this direction, turns out Incremental DOM API is really simple to map to string output.

##### About this library
All this library does is making the relevant Incremental DOM calls while traversing the JSONML DOM description.

At around 50 loc not only it's lightweight (Incremental DOM itself is < 10kb), it's easily hackable to tailor around any specific needs you may encounter in your projects, instead of resorting on weird workarounds.

There are lots of ways to use Incremental DOM methods, I tried out many, the code published here is and will be changed according to the simplest and most performant I can come with.

##### Further
TODO

##### Tests
Once I settle on how to do it properly along with Incremental DOM.
