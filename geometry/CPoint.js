/* * * * * * * * * * * * * * * * * * * * * * * * * * * * 
* POINT
*/
var CPoint = Class.create(CClonable, {
    initialize: function () {
        var a = $A(arguments);
        switch (a.length) {
            case 0:
                a.push(0);
            case 1:
                // [left, top]
                // point
                // left = top
                if (Object.isArray(a[0])) {
                    this.x = a[0][0];
                    this.y = a[0][1];
                } else if (['x', 'y'].all(function (x) { return !Object.isUndefined(a[0][x]); })) {
                    this.x = a[0].x;
                    this.y = a[0].y;
                } else {
                    this.x = this.y = a[0];
                }
                break;
            case 2:
                // left, top
                this.x = a[0];
                this.y = a[1];
                break;
            default:
                console.debug(a);
                throw "Invalid construction arguments";
        }
    }
    , toString: function () {
        return "[" + this.x + "," + this.y + "]";
    }
    , lengthTo: function (p) {
        return Math.sqrt(Math.pow(p.x - this.x, 2) + Math.pow(p.y - this.y, 2));
    }
    , radiansTo: function (p) {
        return Math.atan2(p.y - this.y, p.x - this.x);
    }
    , degreesTo: function (p) {
        return Math.atan2(p.y - this.y, p.x - this.x) * 180 / Math.PI;
    }
    , distanceTo: function (p) {
        return new CPoint(p.x - this.x, p.y - this.y);
    }
    , middleTo: function (p) {
        return this.clone().moveBy(this.distanceTo(p).scaleBy(2));
    }
    , moveBy: function (p) {
        this.x += p.x;
        this.y += p.y;

        return this;
    }
    , scaleBy: function (f) {
        this.x /= f;
        this.y /= f;

        return this;
    }
    , mirror: function () {
        this.x *= -1;
        this.y *= -1;

        return this;
    }
});
