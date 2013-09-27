/* * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* RECT
*/
var CRect = Class.create(CClonable, {
	initialize: function () {
		var a = $A(arguments);
		switch (a.length) {
			case 1:
				// element          
				var e = $(a[0]);
				var p = e.cumulativeOffset();
				//console.log("P:    ", p.top);
				//p.left += parseFloat(e.getStyle('left') || '0');
				//p.top += parseFloat(e.getStyle('top') || '0');
				var d = e.getDimensions();
				//d.width += parseFloat(e.getStyle('right') || '0');
				//d.height += parseFloat(e.getStyle('bottom') || '0');
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
				if (Object.isArray(a[0])) {
					this.left = a[0][0];
					this.top = a[0][1];
				} else {
					this.left = this.top = 0;
					this.right = this.width = a[0];
				}
				if (Object.isArray(a[1])) {
					this.right = this.left + (this.width = a[1][0]);
					this.bottom = this.top + (this.height = a[1][1]);
				} else {
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
				console.debug(a);
				throw "Invalid construction arguments";
		}

		if (this.height < 0 || this.width < 0) {
			throw ("Invalid size " + this.width + "x" + this.height);
		}
	}
	, toString: function () {
		var round = function (x) { return Math.round(x * 100) / 100; };
		return "[L" + round(this.left) + " T" + round(this.top) + " R" + round(this.right) + " B" + round(this.bottom) + "]";
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
		return (p.x - this.left >= tolerance && this.right - p.x >= tolerance)
			&& (p.y - this.right >= tolerance && this.bottom - p.y >= tolerance)
	}
	, doesContainRect: function (r, tolerance) {
		return this.doesContainPoint(r.getLeftTop(), tolerance)
			&& this.doesContainPoint(r.getRightBottom(), tolerance);
	}

	, intersectionWithRect: function (r, tolerance) {
		if (this.doesContainRect(r, tolerance)) return r;
		if (r.doesContainRect(this, tolerance)) return this;
		try {
			return new CRect(
				Math.max(this.left, r.left),
				Math.max(this.top, r.top),
				Math.min(this.right, r.right),
				Math.min(this.bottom, r.bottom));
		} catch (e) {
			return null;
		}
	}

	, moveBy: function (p) {
		this.left += p.x;
		this.right += p.x;
		this.top += p.y;
		this.bottom += p.y;

		return this;
	}
	, moveTo: function (p) {
		var d = this.getLeftTop().distanceTo(p);
		return this.moveBy(d);
	}
	// move right / bottom by point x / y
	// resize keeping left top fixed
	, resizeByPoint: function (p) {
		this.right += p.x;
		this.width += p.x;
		this.bottom += p.y;
		this.height += p.y;

		return this;
	}
	// move every corner by half point x / y
	// resize keeping center fixed
	, symResizeByPoint: function (p) {
		this.left -= Math.floor(p.x / 2);
		this.right += Math.ceil(p.x / 2);
		this.width += p.x;
		this.top -= Math.floor(p.y / 2);
		this.bottom += Math.ceil(p.y / 2);
		this.height += p.y;

		return this;
	}
	// scale by a point with x = y
	// resize keeping left top fixed
	, scaleBy: function (f) {
		return this.scaleByPoint(new CPoint(f, f));
	}
	// sym scale by a point with x = y
	// resize keeping center fixed
	, symScaleBy: function (f) {
		return this.symScaleByPoint(new CPoint(f, f));
	}
	// divide size by point x / y then resize
	// resize keeping left top fixed
	, scaleByPoint: function (p) {
		var dx = this.width - (this.width / p.x);
		var dy = this.height - (this.height / p.y);
		return this.resizeByPoint(new CPoint(-dx, -dy));
	}
	// divide size by point x / y then sym resize
	// resize keeping center fixed
	, symScaleByPoint: function (p) {
		var dx = this.width - (this.width / p.x);
		var dy = this.height - (this.height / p.y);
		return this.symResizeByPoint(new CPoint(-dx, -dy));
	}
	// multiply sizes by factor
	, zoomBy: function (f) {
		return this.zoomByPoint(new CPoint(f, f));
	}
	// multiply size by point x / y
	, zoomByPoint: function (p) {
		$w('left right width').each(function (w) {
			this[w] = this[w] * p.x
		}, this);
		$w('top bottom height').each(function (w) {
			this[w] = this[w] * p.y
		}, this);
		return this;
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
	, resizeByPoint: function ($super, p) {
		$super(p);
		return this.refreshMargins();
	}
	, symResizeByPoint: function ($super, p) {
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
	, getStyle: function () {
		return {
			left: this.left + "px"
			, top: this.top + "px"
			, height: this.height + "px"
			, width: this.width + "px"
		};
	}
});
