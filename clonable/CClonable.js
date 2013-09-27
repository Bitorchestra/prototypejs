var CClonable = Class.create({
    clone: function () {
        return Object.clone(this);
    }
    , copy: function() {
        return Object.deepCopy(this);
    }
});
