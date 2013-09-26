// define property only if not exists in dest
Object.extendOnly = function (dest, source) {
    for (var prop in source) {
        if (!Object.isUndefined(dest[prop]))
            delete source[prop];
    }
    return Object.extend(dest, source);
};
// extend a list of objects recursively
Object.extendMany = function () {
    var args = $A(arguments),
        dest = args.shift(),
        source = args.shift();
    dest = Object.extend(dest, source);
    if (args.length) {
        args.unshift(dest);
        return Object.extendMany.apply(null, args);
    } else {
        return dest;
    }
};
// deep copies Object, Array, String, Number, Boolean
Object.deepCopy = function (source) {
    var baseTypes = ['string', 'number', 'boolean', 'function'];
    var innerCopy = function (e) {
        if (e === null || e === undefined)
            return null;
        else if (e instanceof Array)
            return $A(e).map(innerCopy);
        else if (baseTypes.member(typeof (e)))
            return e;
        else
            return $H(e).inject({}, register);
    };
    var register = function (rt, x) {
        rt[x.key] = innerCopy(x.value);
        return rt;
    };
    return innerCopy(source);
};
// binds object functions to a context (default: self)
Object.bind = function (o, ctx) {
    ctx = ctx || o;
    $H(o).keys().each(function (k) {
        var m = o[k];
        if (Object.isFunction(m))
            o[k] = m.bind(ctx);
    });
    return o;
};
// String extensions
Object.extendOnly(String.prototype, {
    // repeat string n times
    repeat: function (times) {
        return (new Array(isNaN(times) || times <= 0 ? 1 : times + 1)).join(this);
    },
    // pad left with fill till len is reached
    lpad: function (fill, len) {
        return fill.repeat(len - this.length) + this;
    },
    // pad right with fill till len is reached
    rpad: function (fill, len) {
        return this + fill.repeat(len - this.length);
    },
    // trim heading and trailing spaces
    trim: function () {
        return this.replace(/^\s+/, '').replace(/\s+$/, '');
    },
    // apply arguments to format string holding {n} placeholders
    // ex: "{0} likes these: {1}".printf('mario', [1,2,3])
    printf: function () {
        return $A(arguments).inject(this, function(acc,v,i) {
            var str = (
                v === null || v === undefined
                ? v
                : Object.isString(v) || Object.isNumber(v) || Object.isDate(v) || Object.isFunction(v)
                ? v.toString()
                : Object.toJSON(v)
            );
            return acc.replace(new RegExp("\\{" + i + "\\}", "g"), str);
        }, this);
    }
});
// Number extensions
Object.extendOnly(Number.prototype, {
    between: function (a, b) {
        return a <= this && this <= b;
    }
});
Math.randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
// Array extensions
Object.extendOnly(Array.prototype, {
    // returns an array without and element
    minus: function (a) {
        return this.filter(function (i) {
            return a != i;
        });
    },
    // returns a portion of the array from start for len elements
    // ex: [1,2,3,4,5,6].range(1,2) -> [2,3]
    range: function (start, len) {
        var rt = [];
        for (var i = start; i < start + len; ++i) {
            rt.push(this[i]);
        }
        return rt;
    }
});
// Event extensions
Object.extend(Event, {
    // add wheel event to mouse
    wheel: function (event) {
        var delta = 0;
        if (!event) event = window.event;
        if (event.wheelDelta) {
            delta = event.wheelDelta;
            if (window.opera) delta = -delta;
        } else if (event.detail) {
            delta = -event.detail;
        }
        return (delta > 0 ? +1 : (delta < 0 ? -1 : 0));
    },
    // ctrl + click, meta + click, middle click = open in new tab
    isOpenInNewTabClick: function (event) {
        return ((e.type == 'click' && (event.ctrlKey || event.metaKey)) || Event.isMiddleClick(event));
    }
});
// Element extensions
Element.addMethods({
    // get text content of element - polyfill
    getText: function (element) {
        return element.textContent || element.innerText || '';
    }
    // set border radius with cross-browser compatibility
    , setBorderRadius: function (element) {
        var rads = $A(arguments).slice(1).map(function (a) {
            return a + 'px';
        }).join(' ').trim();
        element.setStyle({ 
            'border-radius': rads, 
            '-webkit-border-radius': rads, 
            '-moz-border-radius': rads,
            '-o-border-radius': rads
        });
        return element;
    }
    // get "parameter" looking in element store or in element attributes
    // value is then stored in element store for faster retrieval next calls
    , getParameter: function (element, paramName, defaultValue) {
        var rt = element.retrieve(paramName) || element.readAttribute(paramName) || defaultValue;
        element.store(paramName, rt);
        return rt;
    }
    // groups children of element in columns given the criteria
    // criteria can be a number of columns, or a pixel width (number of columns will be deducted)
    , columnize: function (element, criteria) {
        var children = Element.childElements(element);
        var nCols = parseFloat(criteria);
        if (('' + criteria).endsWith('px')) {
            nCols = Math.floor(Element.getWidth(element) / nCols);
        }
        var nPerCol = Math.ceil(children.length / nCols);

        var columns = [];
        for (var i = 0; i < nCols; ++i) {
            var node = Builder.node('div', { className: 'column' }, children.splice(0, nPerCol));
            columns.push(node);
        }
        columns.each(function (c) {
            element.appendChild(c);
        });
        Element.writeAttribute(element, 'data-cols', nCols);

        return element;
    }
    // get offset to apply to element so it will be in the middle of a bbox
    , centerOffset: function (element, bbox) {
        var vpDim = $(bbox).getDimensions();
        var elmDim = $(element).getDimensions();
        return {
            top: Math.round((vpDim.height - elmDim.height) / 2) + 'px',
            left: Math.round((vpDim.width - elmDim.width) / 2) + 'px'
        };
    }
    // center an element in current viewport
    , centerInViewport: function (element) {
        return Element.setStyle(element, Element.centerOffset(element, document.viewport));
    }
    // center an element in current viewport, just horizontally
    , centerInHorizontalViewport: function (element) {
        var off = Element.centerOffset(element, document.viewport);
        delete off.top;
        return Element.setStyle(element, off);
    }
    // center an element in its parent
    , centerInParent: function (element) {
        return Element.setStyle(element, Element.centerOffset(element, Element.up(element)));
    }
});
// Element.Layout extensions
Element.Layout.addMethods({
    // get the sum of many properties
    // ex: layout.sum('margin-top', 'padding-top', 'border-top')
    sum: function () {
        return $A(arguments).inject(0, function (acc, prop) {
            return acc + this.get(prop) || 0;
        }, this);
    }
});
