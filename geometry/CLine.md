# BitOrchestra's prototypejs extensions

## CLine : CClonable

Class representing a geometric line. IS-A [CClonable](../clonable/CClonable.md).

Its boundaries are represented as [CPoint](CPoint.md)s, and are accessible through
properties <code>p0</code> and <code>p1</code>.

### initialize(p0, p1)
### initialize(x0, y0, x1, y1)

**description**

Class constructor: may be called with two or four parameters, with following semantics:
* if two parameters are provided, each of them must be a suitable argument to construct a <code>CPoint</code> from a single value
* if four parameters are provided, they are the coordinates of the two boundaries, as described

--

### line.toString() -> String

**description**

Returns a string representation of current instance formatted as <code>[[x0,y0]-[x1,y1]]</code>

--

### line.length() -> Number

**description**

Returns the length of current instance, computed as the geometric distance between its two boundaries.

--

### line.radians() -> Number
### line.degrees() -> Number

Returns the angle between current instance and the X axis, keeping line *direction* in consideration.

**example**

```
var a = new CLine(0, 50);
console.log(a.degrees());    // 45°
a.mirror();
console.log(a.degrees());    // -135°
```

--

### line.getCenter() -> CPoint

**description**

Returns a new <code>CPoint</code> positioned in the middle of the current line instance.

--

### line.getPortion(percentage) -> CPoint

Returns a new <code>CPoint</code> positioned along current line instance at the specified proportional
distance from it's <code>p0</code>.

```
var a = new CLine(0, 100);
var p = a.getPortion(0.25);
console.log(p.toString());  // [25,25]
```

--

### line.mirror() -> CLine

Modifies current instance swapping its boundaries.

Returns current instance for method chaining.
