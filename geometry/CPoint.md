# BitOrchestra's prototypejs extensions

## CPoint : CClonable

Class representing a geometric point. IS-A [CClonable](../clonable/CClonable.md)

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
 * an object with <code>x</code> and <code>y</code> properties
 * a number representing both coordinates
* if two parameters are provided, they will be <code>x</code> and <code>y</code> coordinates in such order

--

### point.toString() -> String

**description**

Returns a string representation of current instance formatted as <code>[x,y]</code>


--

### point.lengthTo(otherPoint) -> Number

**description**

Returns the [geometric distance](http://en.wikipedia.org/wiki/Distance) between two points.

### point.radiansTo(otherPoint) -> Number
### point.degreesTo(otherPoint) -> Number

Returns the angle between two points, i.e. the angle between the vector defined by such points 
and the X axis - so it keeps *direction* in consideration.

```
var a = new CPoint(), b = new CPoint(50);
console.log(a.degreesTo(b));    // 45°
console.log(b.degreesTo(a));    // -135°
```

