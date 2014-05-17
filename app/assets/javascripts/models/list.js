Trellino.Models.List = Backbone.Model.extend ({
	// urlRoot: "/api/lists",
	parse: function (jsonResp) {
		if (jsonResp.cards) {
			this.cards().set(jsonResp.cards);
			delete jsonResp.cards;
		}
		return jsonResp;
	},

	cards: function () {
		if (!this._cards) {
			this._cards = new Trellino.Collections.Cards([], {
				card: this
			});
		}
		return this._cards
	},

});
