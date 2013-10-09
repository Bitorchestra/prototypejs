# BitOrchestra's prototypejs extensions

## CInstanceRegistry

This class provides functions to keep an in-sync registry of class instances bound to HTML element.
The purpose of the registry is to scan the DOM looking for some selector, create instances of some defined
class for every element that has no instance yet, and destroy active instances for elements that are no more
in the DOM.

When an instance is created, the element is marked with an attribute to indicate such fact.
Different selectors can be registered with a different set of options to be passed to the class constructor.

These properties are exposed:
* <code>instanceAttribute</code>: name of the attribute that will decorate elements with an active instance
* <code>facotyr</code>: instance builder function, receives an element and a set of options
* <code>instances</code>: <code>Hash</code> that maps element ids to their class instances
* <code>styles</code>: <code>Hash</code> that maps element selectors to their option set


### initialize(instanceAttribute, factoryFunction)

**description**

Class constructor: creates a fresh empty instance registry

--

### registry.registerStyle(selector[, options = {}]) -> void

**description**

Adds a new selector with its specific options to the set of handled styles.

--

### registry.updateInstances() -> void

**description**

For each registered selector, scans the DOM looking for matching elements.
For every element found without the <code>instanceAttribute</code> mark, a new instance is created calling the <code>factory</code> function with the set
of options registered with current selector, and such instance is bound in the <code>instances</code> registry.
For every instance present in the registry without a correspondent element, such instance is destroyed and removed from the instance registry.

--

### registry.purgeInstance(elementId) -> void

**description**

Destroys instance bound to <code>elementId</code> and removes the information from the registry. This method is used by <code>updateInstances</code> and <code>destroy</code>.

--

### registry.dispose() -> void

**description**

Destroies and removes every instance from the registry. If instances also have a <code>dispose</code> method, it will be invoked before removal.

