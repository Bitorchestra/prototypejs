/* * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* HTML RECT
*/
var CHtmlRect = Class.create(CRect, {
	initialize: function ($super) {
		var a = $A(arguments).without($super);
		var loadExtraArgs = function (shift) {
			// apply local params
			var start = a.length - shift;
			var arg = function (i, def) {
				return (a.length > i ? a[i] : def);
			}
			this.className = arg(start, 'rect');
		};

		this.element = null;

		var shift = 0;
		switch (a.length) {
			case 1:
				if (['left', 'top', 'right', 'bottom', 'height', 'width'].all(function (x) { return !Object.isUndefined(a[0][x]); })) {
					loadExtraArgs.call(this, 0);
					var lt = a[0].getLeftTop();
					var dm = a[0].getDimensions();
					$super.call(this, [lt.x, lt.y], [dm.x, dm.y]);
					return;
				}
			case 2:
			case 4:
				// super, no shift
				break;
			case 3:
				// 2 +class
			case 5:
				// 4 +class
				shift = 1;
				break;
			default:
				console.debug(a);
				throw "Invalid construction arguments";
		}

		loadExtraArgs.call(this, shift);
		$super.apply(this, a.splice(0, a.length - shift));
	}
	, makeDraggable: function (onMove, box) {
		this.element.observe('mousedown', (function (evt) {
			if (!Event.isLeftClick(evt)) return;
			this.element.addClassName('drag');
			this.mousePos = new CPoint(evt.pointerX(), evt.pointerY());
			this.mouseDelta = this.getLeftTop().distanceTo(this.mousePos).mirror();
			//console.log("p start", this.mousePos.toString());
		}).bind(this));
		var moveToPoint = (function (evt) {
			if (!this.mousePos) return;

			var nuPos = new CPoint(evt.pointerX(), evt.pointerY());
			this.mousePos = nuPos.clone();

			if (box) {
				nuPos.moveBy(this.mouseDelta);
				nuPos.x = Math.min(Math.max(box.left, nuPos.x), box.right - this.width);
				nuPos.y = Math.min(Math.max(box.top, nuPos.y), box.bottom - this.height);
				this.moveTo(nuPos);
				onMove && onMove(box.getLeftTop().distanceTo(this.getLeftTop()));
			} else {
				this.moveTo(nuPos.moveBy(this.mouseDelta));
				onMove && onMove(this.getLeftTop());
			}

		});
		this.element.observe('mousemove', moveToPoint.bind(this));
		this.element.observe('mouseup', (function (evt) {
			moveToPoint.call(this, evt);

			delete this.mousePos;
			delete this.mouseDelta;
			this.element.removeClassName('drag');
		}).bind(this));
		this.element.observe('mouseout', (function (evt) {
			if (!this.mousePos) return;
			delete this.mousePos;
			delete this.mouseDelta;
			this.element.removeClassName('drag');
		}).bind(this));
	}
	, destroy: function () {
		if (this.element) {
			$w('mousedown mousemove mouseup mouseout').each(this.element.stopObserving);
			this.element.remove();
			delete this.element;
		}
	}
	, render: function (parent) {
		if (this.element) this.element.remove();

		this.element = Builder.node('div', { 'className': this.className });
		parent.appendChild(this.element);

		this.element.identify();
		this.update();
		this.element.observe('rect:changed', this.update.bind(this));
		return this;
	}
	, update: function () {
		this.element.setStyle({
			top: this.top + 'px',
			left: this.left + 'px',
			width: this.width + 'px',
			height: this.height + 'px'
		});
	}
	, refresh: function () {
		if (this.element) Event.fire(this.element, 'rect:changed');
		return this;
	}
	, intersectionWithRect: function ($super, r) {
		var rt = $super(r);
		if (rt) {
			rt = new CHtmlRect(rt.left, rt.top, rt.right, rt.bottom);
		}
		return rt;
	}

	, moveBy: function ($super, p) {
		$super(p);
		return this.refresh();
	}
	, resizeByPoint: function ($super, p) {
		$super(p);
		return this.refresh();
	}
	, symResizeByPoint: function ($super, p) {
		$super(p);
		return this.refresh();
	}
	, zoomByPoint: function ($super, p) {
		$super(p);
		return this.refresh();
	}
});