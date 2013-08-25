/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="vegitable.js" />
WinJS.Namespace.defineWithParent(VegitableKingdom, "Natural", {
	Tomato: WinJS.Class.derive(VegitableKingdom.Vegitable, function (color, radius) {
		VegitableKingdom.Vegitable.apply(this, [color, radius, "cm", true]);
	},
	{
		radius: {
			get: function () { return this.quantityValue + this.quantityType; },
			set: function (val) { this.quantityValue = val; }
		},
		toString: function () {
			result = "This '" + this.color
			+ " tomato' with radius " + this.radius
			+ " is" + (this.eatable ? "" : "n't") + " eatable!";
			return result;
		}
	})
});