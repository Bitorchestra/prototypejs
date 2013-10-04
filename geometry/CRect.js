/* * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* RECT
*/
var CRect = Class.create(CClonable, {
    initialize: function () {
        var a = $A(arguments);
        switch (a.length) {
            case 1:
                // element, position, dimensions
                var arg = a[0], e = $(arg), p = null, d = null;
                if (e && e.nodeType) {
                    // it's an element
                    p = e.cumulativeOffset();
                    d = e.getDimensions();
                } else if (['left', 'top', 'width', 'height'].all(function (p) {
                    return arg.hasOwnProperty(p);
                })) {
                    // it's a CRect or similar
                    p = d = arg;
                } else {
                    throw "Invalid construction arguments: {0}".printf(a);
                }
                this.left = p.left;
                this.top = p.top;
                this.right = p.left + d.width;
                this.bottom = p.top + d.height;
                this.width = d.width;
                this.height = d.height;
                break;

            case 2:
                // [left,top], [width,height]
                // height, width
                // p0, p1
                if (Object.isArray(a[0]) != Object.isArray(a[1]))
                    throw "Invalid construction arguments: {0}".printf(a);
                
                if (Object.isArray(a[0])) {
                    this.left = a[0][0];
                    this.top = a[0][1];
                    this.right = this.left + (this.width = a[1][0]);
                    this.bottom = this.top + (this.height = a[1][1]);
                } else if (a.all(function(arg) {
                        return ['x','y'].all(function(p) {
                            return arg.hasOwnProperty(p);
                        });
                    })) {
                    this.left = a[0].x;
                    this.top = a[0].y;
                    this.right = a[1].x;
                    this.bottom = a[1].y;
                    this.width = this.right - this.left;
                    this.height = this.bottom - this.top;
                } else {
                    this.left = this.top = 0;
                    this.right = this.width = a[0];
                    this.bottom = this.height = a[1];
                }
                break;

            case 4:
                // left, top, right, bottom
                this.left = a[0];
                this.top = a[1];
                this.right = a[2];
                this.bottom = a[3];
                this.width = this.right - this.left;
                this.height = this.bottom - this.top;
                break;

            default:
                throw "Invalid construction arguments: {0}".printf(a);
        }
    }
    , toString: function () {
        var round = function (x) { return Math.round(x * 100) / 100; };
        return "R[[{0},{1}],[{2},{3}]]".printf(round(this.left), round(this.top), round(this.right), round(this.bottom));
    }
    , isValid: function () {
        return (this.width >= 0 && this.height >= 0);
    }
    , getLeftTop: function () {
        return new CPoint(this.left, this.top);
    }
    , getLeftBottom: function () {
        return new CPoint(this.left, this.bottom);
    }
    , getRightTop: function () {
        return new CPoint(this.right, this.top);
    }
    , getRightBottom: function () {
        return new CPoint(this.right, this.bottom);
    }
    , getCenter: function () {
        return new CPoint(this.left + this.width / 2, this.top + this.height / 2);
    }
    , getDimensions: function () {
        return new CPoint(this.width, this.height);
    }
    , doesContainPoint: function (p, tolerance) {
        tolerance = tolerance || 0;
        var tmp = new CPoint(p);
        return (tmp.x - this.left >= tolerance && this.right - tmp.x >= tolerance)
            && (tmp.y - this.right >= tolerance && this.bottom - tmp.y >= tolerance)
    }
    , doesContainRect: function (r, tolerance) {
        var tmp = new CRect(r);
        return this.doesContainPoint(tmp.getLeftTop(), tolerance)
            && this.doesContainPoint(tmp.getRightBottom(), tolerance);
    }

    , intersectionWithRect: function (r, tolerance) {
        var tmp = new CRect(r);
    
        if (this.doesContainRect(tmp, tolerance)) return tmp;
        if (tmp.doesContainRect(this, tolerance)) return new CRect(this);
        
        var rt = new CRect(
            Math.max(this.left, tmp.left),
            Math.max(this.top, tmp.top),
            Math.min(this.right, tmp.right),
            Math.min(this.bottom, tmp.bottom)
        );
        
        return (rt.isValid() ? rt : null);
    }

    , moveBy: function (p) {
        var tmp = new CPoint(p);
        this.left += tmp.x;
        this.right += tmp.x;
        this.top += tmp.y;
        this.bottom += tmp.y;

        return this;
    }
    , moveTo: function (p) {
        var d = this.getLeftTop().distanceTo(p);
        return this.moveBy(d);
    }
    // move right / bottom by point x / y
    // resize keeping left top fixed
    , resizeBy: function (p) {
        var tmp = new CPoint(p);
        this.right += tmp.x;
        this.width += tmp.x;
        this.bottom += tmp.y;
        this.height += tmp.y;

        return this;
    }
    // move every corner by half point x / y
    // resize keeping center fixed
    , symResizeBy: function (p) {
        var tmp = new CPoint(p);
        this.left -= Math.floor(tmp.x / 2);
        this.right += Math.ceil(tmp.x / 2);
        this.width += tmp.x;
        this.top -= Math.floor(tmp.y / 2);
        this.bottom += Math.ceil(tmp.y / 2);
        this.height += tmp.y;

        return this;
    }
    // divide size by point x / y then
    // resize keeping left top fixed
    , scaleBy: function (p) {
        var tmp = new CPoint(p);
        var dx = this.width - (this.width / tmp.x);
        var dy = this.height - (this.height / tmp.y);
        return this.resizeBy([-dx, -dy]);
    }
    // divide size by point x / y then
    // sym resize keeping center fixed
    , symScaleBy: function (p) {
        var tmp = new CPoint(p);
        var dx = this.width - (this.width / tmp.x);
        var dy = this.height - (this.height / tmp.y);
        return this.symResizeBy([-dx, -dy]);
    }
    // multiply sizes by factor
    , zoomBy: function (f) {
        var p = new CPoint(f);
        $w('left right width').each(function (w) {
            this[w] = this[w] * p.x
        }, this);
        $w('top bottom height').each(function (w) {
            this[w] = this[w] * p.y
        }, this);
        return this;
    }
    , getStyle: function () {
        return {
            left: this.left + "px"
            , top: this.top + "px"
            , height: this.height + "px"
            , width: this.width + "px"
        };
    }
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// rect for viewport
var CViewportRect = Class.create(CRect, {
    initialize: function ($super) {
        var d = document.viewport.getDimensions();
        var o = document.viewport.getScrollOffsets();
        $super([0, 0], [d.width + o[0], d.height + o[1]]);
    }
});

// * * * * * * * * * * * * * * * * * * * * * * * * * * * 
// rect with right / bottom margin
var CMarginRect = Class.create(CRect, {
    initialize: function ($super) {
        $super.apply(this, $A(arguments).slice(1));
        this.refreshMargins = function () {
            var docDims = document.viewport.getDimensions();

            this.marginRight = docDims.width - this.right;
            this.marginBottom = docDims.height - this.bottom;

            return this;
        };
        this.refreshMargins();
    }

    , moveBy: function ($super, p) {
        $super(p);
        return this.refreshMargins();
    }
    , resizeBy: function ($super, p) {
        $super(p);
        return this.refreshMargins();
    }
    , symResizeBy: function ($super, p) {
        $super(p);
        return this.refreshMargins();
    }
    , getViewportOverflow: function () {

        var rt = $H({});

        if (this.top < 0) {
            rt.set("top", new CPoint(0, this.top));
        }
        if (this.marginBottom < 0) {
            rt.set("bottom", new CPoint(0, -this.marginBottom));
        }
        if (this.left < 0) {
            rt.set("left", new CPoint(this.left, 0));
        }
        if (this.marginRight < 0) {
            rt.set("right", new CPoint(-this.marginRight, 0));
        }

        [['top', 'bottom'], ['left', 'right']].each(function (pair) {
            if (rt.get(pair[0]) != null && rt.get(pair[1]) != null) {
                console.warn('overflow clash: ' + pair[0] + ' + ' + pair[1]);
                rt.unset(pair[0]); rt.unset(pair[1]);
            }
        });
        return (rt.size() ? rt : null);
    }
});
