# BitOrchestra's prototypejs extensions

[prototypejs](http://prototypejs.org) related extensions, utils and classes

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

After this, the computed parameter value is stored in <code>element</code>'s cache via <code>Element.store</code> to speed up successive retrievals.

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