Trellino.Models.List = Backbone.Model.extend ({
	// urlRoot: "/api/lists",
	parse: function (jsonResp) {
		if (jsonResp.cards) {
			this.cards().set(jsonResp.cards);
			delete jsonResp.cards;
		}
		return jsonResp;
	}

	cards: function () {
		if (!this._cards) {
			cards._cards = new Trellino.Collections.Cards([], {
				cards: this
			});
		}
		return this._cards
	}

});
