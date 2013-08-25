WinJS.Namespace.define("MyMixins", {
	MushroomMixin: {
		addWater: function (litres) {
			this.quantityValue += litres * 0.15;
			return "Added " + litres + " litres of water.";
		}
	}
});