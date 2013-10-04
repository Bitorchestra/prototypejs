/* * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* LINE
*/
var CLine = Class.create(CClonable, {
    initialize: function () {
        var a = $A(arguments);
        switch (a.length) {
            case 2:
                this.p0 = new CPoint(a[0]);
                this.p1 = new CPoint(a[1]);
                break;
            case 4:
                this.p0 = new CPoint(a[0], a[1]);
                this.p1 = new CPoint(a[2], a[3]);
                break;
            default:
                throw "Invalid construction arguments: {0}".printf(a);
        }
    }
    , toString: function () {
        return "L[{0},{1}]".printf(this.p0.toString(), this.p1.toString());
    }
    , length: function () {
        return this.p0.lengthTo(this.p1);
    }
    , degrees: function () {
        return this.p0.degreesTo(this.p1);
    }
    , radians: function () {
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
    , mirror: function() {
        var tmp = this.p0;
        this.p0 = this.p1;
        this.p1 = tmp;
        
        return this;
    }
});
