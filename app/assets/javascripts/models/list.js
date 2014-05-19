Trellino.Models.List = Backbone.Model.extend ({
	// urlRoot: "/api/lists",

	// initialize: function (models, options) {
	// 	this.board = options.board;
	// },

	parse: function (jsonResp) {
		if (jsonResp.cards) {
			this.cards().set(jsonResp.cards, { parse: true });
			delete jsonResp.cards;
		}
		return jsonResp;
	},

	cards: function () {
		if (!this._cards) {
			this._cards = new Trellino.Collections.Cards([], {
				list: this
			});
		}
		return this._cards
	},

});
