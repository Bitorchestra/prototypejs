# BitOrchestra's prototypejs extensions

## CHtmlRect : CRect

Class representing a rectangle displayable on current page and moveable via mouse interaction. IS-A [CRect](CRect.md).

While instances can be built using existing elements as information source, rendering them will create a new DOM element, specifically a <code>div</code>.
Positioning behaviour and appearence should be provided via a proper CSS class, that can be passed as an extra construction argument, defaulted to <code>rect</code>.

So, defined a base style like this:
```
.rect {
    position: absolute;
    z-index: 1000;
    border: 3px double #000;
    background-color: #CCC;
}
```
we can create our draggable rectangle like this:
```
var rect = new CHtmlRect(10,10,100,100);
rect.render();  // will create div with class 'rect' and append it to document.body
rect.makeDraggable();   // now we can move it around
```
change its appearence programmatically
```
rect.symScaleBy(0.9);   // and changing its appearence programmatically
```
react to any change via custom event:
```
Event.observe(rect.element, 'rect:changed', handler);
```
release resources and remove markup when done
```
rect.destroy();
```

### initialize(element)
### initialize(element, className)
### initialize(CRect)
### initialize(CRect, className)
### initialize([left,top],[width,height])
### initialize([left,top],[width,height], className)
### initialize(width,height)
### initialize(width,height, className)
### initialize(CPoint,CPoint)
### initialize(CPoint,CPoint, className)
### initialize(left,top,right,bottom)
### initialize(left,top,right,bottom, className)

These are all the ways a <code>CHtmlRect</code> can be built. <code>className</code> argument when missing is defaulted to <code>rect</code>.