# BitOrchestra's prototypejs extensions

## CPoint : CClonable

Class representing a geometric point. IS-A [CClonable](../clonable/CClonable.md).

Provides two value properties: <code>x</code> and <code>y</code>.

### initialize()
### initialize(coord)
### initialize( { x: left, y: top } )
### initialize( [left, top] )
### initialize(left, top)

**description**

Class constructor: may be called with zero, one, or two parameters, with following semantics:
* if no parameter is provided, the point will hold <code>[0,0]</code> coordinates
* if one parameter is provided it may be:
 * an array containing <code>x</code> and <code>y</code> coordinates in such order
 * an object with <code>x</code> and <code>y</code> properties (so even a <code>CPoint</code>)
 * a number representing both coordinates
* if two parameters are provided, they will be <code>x</code> and <code>y</code> coordinates in such order

--

### point.toString() -> String

**description**

Returns a string representation of current instance formatted as <code>P[x,y]</code>

--

### point.lengthTo(otherPoint) -> Number

**description**

Returns the [geometric distance](http://en.wikipedia.org/wiki/Distance) between two points.
<code>otherPoint</code> must be a <code>CPoint</code> or a single-parameter <code>CPoint</code> construction argument.

--

### point.radiansTo(otherPoint) -> Number
### point.degreesTo(otherPoint) -> Number

Returns the angle between two points, i.e. the angle between the vector defined by such points 
and the X axis - so it keeps *direction* in consideration.
<code>otherPoint</code> must be a <code>CPoint</code> or a single-parameter <code>CPoint</code> construction argument.

**example**

```
var a = new CPoint(), b = new CPoint(50);
console.log(a.degreesTo(b));    // 45°
console.log(b.degreesTo(a));    // -135°
```

--

### point.distanceTo(destination) -> CPoint

**description**

Returns a new <code>CPoint</code> with each coordinate *c* computed as <code>destination.c - point.c</code>,
i.e. the amount to be added to current instance to reach <code>destination</code>.
<code>destination</code> must be a <code>CPoint</code> or a single-parameter <code>CPoint</code> construction argument.

**example**

```
var a = new CPoint(10,20), b = new CPoint(50);
console.log(a.distanceTo(b).toString());   // P[40,30]
```

--

### point.middleTo(destination) -> CPoint

**description**

Returns a new <code>CPoint</code> positioned in the middle of the segment with <code>point</code> and <code>destination</code>
as boundaries.
<code>destination</code> must be a <code>CPoint</code> or a single-parameter <code>CPoint</code> construction argument.

**example**

```
var a = new CPoint(10), b = new CPoint(50);
console.log(a.middleTo(b).toString());   // P[30,30]
```

--

### point.moveBy(amount) -> CPoint

Modifes current instance coordinates by provided <code>amount</code>; such amount must be expressed as a <code>CPoint</code> or a
single-parameter <code>CPoint</code> construction argument.

Returns current instance for method chaining.

**example**

```
var a = new CPoint(10);
a.moveBy(5);
console.log(a.toString());   // P[15,15]
a.moveBy([5,15]);
console.log(a.toString());   // P[20,30]
a.moveBy(new CPoint(1));
console.log(a.toString());   // P[21,31]
```

--

### point.scaleBy(factor) -> CPoint

Modifies current instance scaling both coordinates by profided numeric <code>factor</code>.

Returns current instance for method chaining.

**example**

```
var a = new CPoint(3);
a.scaleBy(3);
console.log(a.toString());   // P[1,1]
a.scaleBy(0.5);
console.log(a.toString());   // P[2,2]
```

--

### point.mirror() -> CPoint

Modifies current instance mirroring both coordinates wrt origin (<code>[0,0]</code>).

Returns current instance for method chaining.
