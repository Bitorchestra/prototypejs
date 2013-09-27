/* * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* LINE
*/
var CLine = Class.create(CClonable, {
	initialize: function () {
		var a = $A(arguments);
		switch (a.length) {
			case 2:
				this.p0 = a[0];
				this.p1 = a[1];
				break;
			case 4:
				this.p0 = new CPoint(a[0], a[1]);
				this.p1 = new CPoint(a[2], a[3]);
				break;
			default:
				console.debug(a);
				throw "Invalid construction arguments";
		}
	}
	, toString: function () {
		return "[" + this.p0 + "-" + this.p1 + "]";
	}
	, length: function (p) {
		return this.p0.lengthTo(this.p1);
	}
	, degrees: function (p) {
		return this.p0.degreesTo(this.p1);
	}
	, radians: function (p) {
		return this.p0.radiansTo(this.p1);
	}
	, getCenter: function () {
		return this.getPortion(0.5);
	}
	, getPortion: function (f) {
		return new CPoint(
			this.p0.x + (this.p1.x - this.p0.x) * f,
			this.p0.y + (this.p1.y - this.p0.y) * f
		);
	}
});
