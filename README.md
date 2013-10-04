# BitOrchestra's prototypejs extensions

[prototypejs](http://prototypejs.org) related extensions, utils and classes.

You can find [our version of prototype 1.7.1](lib/prototype.js) that 
* is compiled with an improved (yep, we still have to clone and pull these) [zest](https://github.com/chjj/zest) version as selector engine, with
 * added <code>:visible</code>, <code>:first</code> and <code>:last</code> non-standard selectors
 * a fix to the <code>$=</code> attribute selector
* includes some fixes borrowed from the community
* adds <code>MobileAndroid</code>, <code>MobileBlackBerry</code>, <code>MobileiOS</code>, <code>MobileOpera</code>, <code>MobileWindows</code> and a generic <code>Mobile</code> flags to <code>Prototype.Browser</code>
* adds the <code>hasObservers(element, eventName) -> bool</code> method to <code>Element</code>, <code>Event</code> and <code>document</code> to check wether an element has observers for some event type ( *click*, ... ). 
Since it looks up in prototype's observers registry, beside inline handlers defined in the HTML source, it couldn't be added via <code>Element.addMethods</code>.

Following code is released under the terms of the [WTFPL](http://www.wtfpl.net/) public license.

* [Extensions to built-in and prototype classes](BO.prototype.extensions.md)
* [CClonable](clonable/CClonable.md)
* Geometry
 * [CPoint](geometry/CPoint.md)
 * [CLine](geometry/CLine.md)
 
 
--

![WTFPL](http://www.wtfpl.net/wp-content/uploads/2012/12/wtfpl-badge-1.png)
