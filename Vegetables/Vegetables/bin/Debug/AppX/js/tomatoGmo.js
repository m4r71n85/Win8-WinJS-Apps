/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="tomato.js" />
/// <reference path="vegitable.js" />
/// <reference path="mushroom-mixin.js" />
WinJS.Namespace.defineWithParent(VegitableKingdom, "Gmo", {
	TomatoGmo: WinJS.Class.mix(VegitableKingdom.Natural.Tomato, MyMixins.MushroomMixin)
});
