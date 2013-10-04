# BitOrchestra's prototypejs extensions

## CViewportRect : CRect

Class representing a geometric rectangle holding the size of current <code>document.viewport</code>. IS-A [CRect](CRect.md).

This class does not add any additional method to <code>CRect</code>, and is constructible in just a way, without parameters.

### initialize()

**description**

Class constructor. The size of the rectangle will consider current viewport scroll offset, while top-left corner will always be <code>[0,0]</code>

