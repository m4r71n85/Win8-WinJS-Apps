/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="vegitable.js" />

WinJS.Namespace.defineWithParent(VegitableKingdom, "Natural", {
	Cucumber: WinJS.Class.derive(VegitableKingdom.Vegitable, function (color, length) {
		VegitableKingdom.Vegitable.apply(this, [color, length, "cm", true]);
	},
	{
		length: {
			get: function () { return this.quantityValue + this.quantityType; },
			set: function (val) { this.quantityValue = val; }
		},
		toString: function () {
			result = "This '" + this.color
			+ " cucumber' with length " + this.length
			+ " is" + (this.eatable ? "" : "n't") + " eatable!";
			return result;
		}
	})
});