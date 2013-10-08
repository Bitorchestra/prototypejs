# BitOrchestra's prototypejs extensions

* [Object](#object)
* [String](#string)
* [Number](#number)
* [Math](#math)
* [Array](#array)
* [Event](#event)
* [Element](#element)
* [Element.Layout](#elementlayout)
* [Function](#function)

## Object

### Object.extendOnly(dest, source) -> Object

**description**

Class method: extends <code>dest</code> with properties in <code>source</code> only if not already defined.
Sometimes you can't swap *dest* and *source* to achieve this, you really want just *dest* to 
be augmented but not overridden.

**returns**

Augmented version of <code>dest</code>

--

### Object.extendMany(dest, source0[, source1 ...]) -> Object

**description**

Class method: recursive version of <code>Object.extend</code>

**returns**

Augmented version of <code>dest</code>

**example**

```
var x = Object.extendMany({}, a, b);
```

--

### Object.deepCopy(object) -> Object

**description**

Class method: performs a *deep* copy of the passed object, rather than a *shallow* copy as the one performed by <code>Object.clone</code>.

**returns**

A deep copy of the passed object.

--

### Object.bind(object[, context]) -> Object

**description**

Class method: binds every function property in <code>object</code> to a <code>context</code>; if not provided,
such context is the <code>object</code> itself.

**returns**

The input <code>object</code> with bound function properties.

**example**

```
var x = Object.bind({
    what: 'world',
    hello: function() {
        console.log('hello ' + this.what + ' !');
    }
});
x.hello();  // hello world !
```

## String

### string.repeat(n) -> String

**description**

Instance method: returns current string instance repeated <code>n</code> times.

**returns**

A new string with original content repeated

**example**

```
console.log('Asd'.repeat(3));  // 'AsdAsdAsd'
```

--

### string.lpad(fill, len) -> String

**description**

Instance method: pads current string instance on the left with provided <code>fill</code> character
to reach designed <code>len</code>.

**returns**

A new string with original content left padded

**example**

```
console.log('0123456789');
console.log('right'.lpad(' ', 10)); 
// 0123456789
//      right
```

--

### string.rpad(fill, len) -> String

**description**

Instance method: pads current string instance on the right with provided <code>fill</code> character
to reach designed <code>len</code>.

**returns**

A new string with original content right padded

**example**

```
console.log('0123456789');
console.log('left'.rpad('.', 10)); 
// 0123456789
// left......
```

--

### string.trim() -> String

**description**

Instance method: removes both leading and trailing spaces (anything that matches <code>/\s/)

**returns**

A new string with original content left and right trimmed

--

### string.printf(arg0[, arg1 ...]) -> String

**description**

Instance method: substitutes numbered placeholders (<code>{0}</code>, <code>{1}</code>, etc) present 
in current instance with a string version of provided arguments, with these rules:
* <code>null</code> and <code>undefined</code> are replaced as they are
* instances of <code>String</code>, <code>Number</code>, <code>Date</code> and <code>Function</code>
are replaced with the result of their <code>.toString()</code> method invocation
* everything else is serialized to JSON

**returns**

A new string with arguments formatted to string and put in the format string in place of their 
correspondent placeholders

**example**

```
x = '{0}; {1}; {2}; {3}'.printf(null, undefined, 12, [1,2,3]);
console.log(x); // null; undefined; 12; [1,2,3]
```

## Number

### number.between(low, high) -> Boolean

**description**

Instance method: tells if current number instance is inside provided bounds, included.
Put number in parenthesis if you want to use this method on a literal, or the dot will
be confused with decimal separator triggering a syntax error.

**returns**

<code>true</code> if <code>low <= this <= high</code>, <code>false</code> otherwise.

**example**

```
x = 5;
console.log(x.between(1,5)); // true
console.log(x.between(5,15)); // true
console.log(x.between(10,15)); // false
console.log( (12.55).between(0,20) ); // true
```

## Math

### Math.randomInt(low, high) -> Number

**description**

Class method: returns a random integer inside provided bounds, included - i.e. [low, high].

**example**

```
x = Math.randomInt(0,1);
console.log(x); // 0 or 1
```

## Array

### array.minus(otherArray) -> Array

**description**

Instance method: performs array subtraction, <code>this - otherArray</code>, relying on <code>Array.without</code>.
Just a shortcut to a proper invocation of <code>Function.apply</code> on <code>Array.without</code>.

**example**

```
console.log([1,2,3].minus([2,3,4]); // [1]
```

### array.range(start, len) -> Array

**description**

Instance method: extracts a portion of <code>len</code> elements from current instance starting at position <code>start</code>;
just forwards its arguments to <code>Array.slice</code>.

**example**

```
console.log([1,2,3,4,5,6].range(1,2)); // [2,3]
```

## Event

### Event.wheel(event) -> Number

**description**

Class method: based on [a popular extension for the <code>Event</code> class](http://ajaxian.com/archives/prototype-event-extension-eventwheele),
this version returns the *sign* of the wheel movement: 
* <code>+1</code> is up
* <code>0</code> is steady
* <code>-1</code> is down

--

### Event.isOpenInNewTabClick(event) -> Boolean

Class method: returns <code>true</code> if the event is a <code>click</code> and one of <code>CTRL</code> or <code>META</code> key was pressed during click,
or <code>Event.isMiddleClick(event)</code> is <code>true</code>.

## Element

These functions are added via <code>Element.addMethods</code>, so will be available both as class or instance methods.

### Element.getText(element) -> String

**description**

Polyfill to return text content of an element; at least this method returns an empty string, never <code>null</code> or <code>undefined</code>.

--

### Element.setBorderRadius(element, radius) -> Element
### Element.setBorderRadius(element, vertical, horizontal) -> Element
### Element.setBorderRadius(element, topLeft, topRight, bottomRight, bottomLeft) -> Element

**description**

Sets border radius for the element using standard property and every browser variant (-moz, -webkit, -o).
Radiuses are intended to be numbers in <code>px</code> u.m.

--

### Element.getParameter(element, paramName[, defaultValue]) -> Object

**description**

Returns value of a parameter bound to an element. This method starts looking in <code>element</code>'s store via <code>Element.retrieve</code>; if nothing is found
there, then it looks through <code>element</code>'s attributes; if neither the attribute is defined, the parameter is the <code>defaultValue</code> provided, if any.
<code>defaultValue</code> can also be a function with no parameters to support lazy intialization.

After this, the computed parameter value is stored in <code>element</code>'s cache via <code>Element.store</code> to speed up successive retrievals.

**example**

```
var sz = Element.getParameter('foo', 'data-size', Element.getDimensions.curry('foo'));
```

--

### Element.columnize(element, criteria) -> Element

**description**

Groups child elements of <code>element</code> in various columns depending on <code>criteria</code>:
* if it is a <code>Number</code>, it directly represents the number of desired columns
* if it is a <code>px</code> width, for instance <code>50px</code>, the number of columns is computed wrt <code>element</code>'s width

Each column will be represented by a 
```
<div class="column"> ... </div>
```
containing various former <code>element</code>'s children.

--

### Element.centerOffset(element, bbox) -> { top: pixelOffset, left: pixelOffset }

**description**

Computes the offsets to be applied to <code>element</code> to center it inside <code>bbox</code>. It's result is intended to be used later via a <code>Element.setStyle</code>,
hence its properties are strings representing <code>px</code> offsets.

--

### Element.centerInViewport(element) -> Element

**description**

Centers <code>element</code> in current <code>document.viewport</code> modifying its <code>top</code> and <code>left</code> properties - so its position should be *absolute*
wrt document's body.

--

### Element.centerInHorizontalViewport(element) -> Element

**description**

Centers <code>element</code> just horizontally in current <code>document.viewport</code>, leaving its <code>top</code> unchanged.

--

### Element.centerInParent(element) -> Element

**description**

Centers <code>element</code> in it's parent.

## Element.Layout

These functions are added via <code>Element.Layout.addMethods</code>, so will be available both as class or instance methods.

### Element.Layout.sum(property0[, property1 ...]) -> Number

**description**

Returns the sum of pixel measures of requested properties.

**example**

```
l = new Element.Layout('some-element-id');
vertStuff = l.sum('border-top', 'border-bottom', 
                  'margin-top', 'margin-bottom', 
                  'padding-top', 'padding-bottom');

```

## Function

### function.lambda(...) -> Function

**description**

Instance method: performs a right-bind of specified arguments, with a <code>curry</code>-symmetrical behaviour.

**returns**

A function that expects some left-arguments to be invoked with to provide a result.

**example**

```
var f = function(a,b,c,d) { return (a+b) * (c+d); };
var g = f.lambda(1, 1); // g = f'(a,b) => (a+b) * (1+1)
g(2, 2);    // 8

var addFooClassName = Element.addClassName.lambda('foo');
addFooClassName(document.body);
```

--

### function.onDomLoaded() -> Function

**description**

Instance method: registers this function to be executed on <code>dom:loaded</code>, ensuring that multiple calls to this method will execute this function only once.

**returns**

Current instance for method chaining

**example**

```
(function(event) { ... }).onDomLoaded();    // anonymous function will be executed on dom:loaded
var f = function(event) { ... };
f.onDomLoaded();
...
f.onDomLoaded();    // f will be executed once on dom:loaded, not twice
```

--

### function.observeOnce(eventType[, target = document.body]) -> Function

**description**

Instance method: registers this function to be executed only once when <code>eventType</code> is fired on <code>target</code>.
This method will actually define an event handler wrapper around this function that will <code>stopObserving</code> once executed.

**returns**

Current instance for method chaining

**example**

```
(function(event) {
    (function(event) {
        console.log('clicked somewhere');
    }).observeOnce('click');
}).onDomLoaded();
```

--

### function.registerUnobtrusiveHandler(eventType[, target = document.body]) -> Function

**description**

Instance method: on <code>dom:loaded</code>, registers this function to be executed every time <code>eventType</code> is fired on <code>target</code>,
and executes it a first time (only once per function instance, as for <code>onDomLoaded</code>). 
Usually applied in dom-rewrite scenarios after ajax loading part of the page, when this behaviour makes sense.

**returns**

Current instance for method chaining

**example**

```
(function(event) {
    // upgrade markup
}).registerUnobtrusiveHandler('BO:loaded'); // every ajax call ends with an Event.fire(updated_element, 'BO:loaded')

// but if you don't want/need the first call, follow the existing path
Event.observe.curry(document.body, 'click', function(event) {
    console.log('clicked somewhere');
}).onDomLoaded();
```

--

## function.deferUnobtrusiveHandler(eventType[, target = document.body]) -> function

**description**

Instance method: on dom ready, registers this function to be executed every time <code>eventType</code> is fired on <code>target</code>,
and executes it a first time. 
Usually applied when new handlers must be installed through some js code coming with a page snippet via ajax calls.

**returns**

Current instance for method chaining

## function.onWindowResized() -> function

**description**

Will make this function execute on resize end instead of being fired at every <code>resize</code> event triggered by <code>window</code>, using a timer to delay execution.

**returns**

Current instance for method chaining

## function.stopOnWindowResized() -> function

**description**

Will stop observing this function for window resized; function must have been installed as event handler for such event via the method above.

**returns**

Current instance for method chaining
