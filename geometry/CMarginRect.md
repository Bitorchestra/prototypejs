# BitOrchestra's prototypejs extensions

## CMarginRect : CRect

Class representing dimension and position of an HTML element, holding also bottom and right margins wrt the current <code>document.viewport</code>. IS-A [CRect](CRect.md).

This class is constructible in the same ways a <code>CRect</code> is, and adds a couple of new methods.

### marginRect.getViewportOverflow() -> Hash

**description**

Retuns a <code>Hash</code> with one or more of these keys set:
* "left"
* "top"
* "right"
* "bottom"
Value associated with each key is the correspondent pixel overflow of this rectangle wrt the current viewport.

In case of no overflow, <code>null</code> is returned.

--

### marginRect.getStyle() -> Object

Returns an <code>Object</code> with these properties:
* "left"
* "top"
* "height"
* "width"
Their value is a string representing the correspondent position or dimension of this rectangle in pixel (example: <code>"20px"</code>).
