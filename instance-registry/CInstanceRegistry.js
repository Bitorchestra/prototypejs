// unobtrusive instance registry
CInstanceRegistry = Class.create({
    // instanceAttribute is used to filter elements already with an instance
    // factory is the function to create an instance; receives element and options
    initialize: function (instanceAttributeibute, factory) {
        this.instanceAttribute = instanceAttribute;
        this.factory = factory;
        this.instances = $H({}); // element => instance
        this.styles = $H({}); // selector => options
    }
    // register different options for different selectors
    , registerStyle: function (selector, options) {
        this.styles.set(selector, options || {});
    }
    // observe this method for some events to achieve unobtrusive creation
    , updateInstances: function () {
        var updateForSelector = function (selector, options) {
            // elements on page: with instance, or not
            var onPage = $$(selector);
            var instanceState = onPage.partition(function (x) { 
                return x.hasAttribute(this.instanceAttribute); 
            }, this);
            // remove the rendered ones whose containers are not on page
            this.instances.keys().filter(function (t) {
                try {
                    return !instanceState[0].member($(t));
                } catch (e) {
                    return false;
                }
            }).each(this.purgeInstance, this);
            // render unrendered ones
            instanceState[1].each(function (el) {
                el.writeAttribute(this.instanceAttribute);
                var nu = this.factory(el, options);
                this.instances.set(el.identify(), nu);
            }, this);
        };
        this.styles.each(function (s) {
            updateForSelector.call(this, s.key, s.value);
        }, this);
    }
    , purgeInstance: function (elementId) {
        try {
            var inst = this.instances.get(elementId);
            this.instances.unset(elementId);
            inst.dispose && inst.dispose();
            delete inst;
        } catch (e) {
            console.error(e);
        }
    }
    , dispose: function () {
        this.instances.keys().each(this.purgeInstance, this);
    }
});