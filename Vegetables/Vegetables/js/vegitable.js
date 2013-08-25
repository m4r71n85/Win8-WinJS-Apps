/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
WinJS.Namespace.define("VegitableKingdom", {
	Vegitable : WinJS.Class.define(function (color, quantityValue, quantityType, eatable) {
		this.color = color;
		this.eatable = eatable;
		this.quantityType = quantityType; //use properties
		this.quantityValue = quantityValue; //use properties
	},
		{
			quantityValue: {
				get: function () { return this._quantityValue },
				set: function (val) { this._quantityValue = val }
			},
			quantityType: {
				get: function () { return this._quantityType },
				set: function (val) { this._quantityType = val }
			}
		})
});