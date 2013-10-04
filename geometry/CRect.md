# BitOrchestra's prototypejs extensions

## CRect : CClonable

Class representing a geometric rectangle. IS-A [CClonable](../clonable/CClonable.md).

This class is specialized in [CViewportRect](CViewportRect.md), [CMarginRect](CMarginRect.md) and [CHtmlRect](CHtmlRect.md).

Its boundaries are represented by numeric properties: <code>left</code>, <code>top</code>, <code>right</code>, <code>bottom</code>.
Also its <code>width</code> and <code>height</code> are computed and kept in sync across calls to any mutator method below.

### initialize(element)
### initialize(CRect)
### initialize([left,top],[width,height])
### initialize(width,height)
### initialize(CPoint,CPoint)
### initialize(left,top,right,bottom)

**description**

Class constructor: may be called with one, two or four parameters, with following semantics:
* if one parameters is provided, that must be an element whose layout will be inspected, or a <code>CRect</code> equivalent object with <code>left</code>, <code>top</code>, <code>width</code>, <code>height</code> own properties to copy from
* if two parameters are provided, they must be 
 * two arrays containing left-top coordinates and rect size respectively
 * two numbers describing rect size, with top-left corner assumed to be the origin <code>[0,0]</code>
 * two [CPoint](CPoint.md)s or equivalent objects with <code>x</code> and <code>y</code> own properties, representing left-top and right-bottom corners respectively
* if four parameters are provided, they must be numbers describing the two rectangle corners

--

### rect.toString() -> String

**description**

Returns a string representation of current instance formatted as <code>R[[left,top],[right,bottom]]</code>

--

### rect.isValid() -> Boolean

**description**

Tells if current instance is a valid rectangle, i.e. one with non-negative <code>height</code> and <code>width</code>.

--

### rect.getLeftTop() -> CPoint
### rect.getLeftBottom() -> CPoint
### rect.getRightTop() -> CPoint
### rect.getRightBottom() -> CPoint

**description**

Returns vertices as [CPoint](CPoint.md) instances.

--

### rect.getCenter() -> CPoint

**description**

Returns the center of this rectangle as a [CPoint](CPoint.md) instance.

--

### rect.getDimensions() -> CPoint

**description**

Returns the size of this rectangle as a [CPoint](CPoint.md) instance.

--

### rect.doesContainPoint(point[, tolerance = 0]) -> Boolean

**description**

Tells if the <code>point</code> argument (any value suitable to construct a [CPoint](CPoint.md)s) is contained in this rectangle instance,
respecting the given <code>tolerance</code>.

--

### rect.doesContainRect(rect[, tolerance = 0]) -> Boolean

**description**

Tells if the <code>rect</code> argument (any value suitable to construct a <code>CRect</code>) is contained in this rectangle instance,
respecting the given <code>tolerance</code>.

--

### rect.intersectionWithRect(rect[, tolerance = 0]) -> CRect

**description**

Returns the rectangle representing the intersection between current instance and the <code>rect</code> argument. <code>tolerance</code> is used
to perform inclusion check, i.e. to discover if one rectangle is inside the other.

Returned value is always a new rectangle, even if the intersection corresponds to current instance.

--

### rect.moveBy(point) -> CRect

**description**

Moves current rectangle around by the amount specified by the <code>point</code> argument (any value suitable to construct a [CPoint](CPoint.md)s),
changing values of current instance properties. 

<code>this</code> is returned to provide method chaining.

--

### rect.moveTo(point) -> CRect

**description**

Moves current rectangle so that its top-left corner will be at coordinates specified by the <code>point</code> argument (any value suitable to construct a [CPoint](CPoint.md)s),
changing values of current instance properties. 

<code>this</code> is returned to provide method chaining.

--

### rect.resizeBy(point) -> CRect

**description**

Changes the size of current rectangle by the amount(s) specified by the <code>point</code> argument (any value suitable to construct a [CPoint](CPoint.md)s),
changing values of current instance properties; the top-left corner remains in its position, while the bottom-right will be moved.

<code>this</code> is returned to provide method chaining.

--

### rect.symResizeBy(point) -> CRect

**description**

Changes the size of current rectangle by the amount(s) specified by the <code>point</code> argument (any value suitable to construct a [CPoint](CPoint.md)s),
changing values of current instance properties; resizing is performed keeping the *center* of the rectangle fixed, so every coordinate will be moved: <code>top</code>
and <code>bottom</code> by half of the specified <code>y</code> amount, <code>left</code> and <code>right</code> by half of the specified <code>x</code> amount.

<code>this</code> is returned to provide method chaining.

--

### rect.scaleBy(point) -> CRect

**description**

Scales the size of current rectangle by the factor(s) specified by the <code>point</code> argument (any value suitable to construct a [CPoint](CPoint.md)s),
changing values of current instance properties; the top-left corner remains in its position, while the bottom-right will be moved.

<code>this</code> is returned to provide method chaining.

**example**

```
var y = new CRect(100,100).moveBy(20);  // R[[20,20],[120,120]]
y.scaleBy(4);       // R[[20,20],[45,45]]
console.log(y.getDimensions().toString());  // P[25,25]
```

--

### rect.symScaleBy(point) -> CRect

**description**

Scales the size of current rectangle by the factor(s) specified by the <code>point</code> argument (any value suitable to construct a [CPoint](CPoint.md)s),
changing values of current instance properties; scaling is performed keeping the *center* of the rectangle fixed, so every coordinate will be moved.

<code>this</code> is returned to provide method chaining.

**example**

```
var y = new CRect(100,100).moveBy(20);  // R[[20,20],[120,120]]
y.symScaleBy(4);       // R[[58,58],[83,83]]
console.log(y.getDimensions().toString());  // P[25,25]
```

--

### rect.zoomBy(point) -> CRect

**description**

Multiplies current rectangle properties by the factor(s) specified by the <code>point</code> argument (any value suitable to construct a [CPoint](CPoint.md)s),
changing values of current instance properties; no geometric property is kept fixed.

<code>this</code> is returned to provide method chaining.

**example**

```
var y = new CRect(100,100).moveBy(20);  // R[[20,20],[120,120]]
y.zoomBy(2);       // R[[58,58],[83,83]]
console.log(y.toString());  // R[[40,40],[240,240]]
console.log(y.getDimensions().toString());  // P[200,200]
```

--

### rect.getStyle() -> Object

Returns an <code>Object</code> with these properties:
* "left"
* "top"
* "height"
* "width"
Their value is a string representing the correspondent position or dimension of this rectangle in pixel (example: <code>"20px"</code>).
