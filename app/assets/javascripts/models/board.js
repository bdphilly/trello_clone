Trellino.Models.Board = Backbone.Model.extend ({
	urlRoot: "/api/boards",

	parse: function (jsonResp) {
		if (jsonResp.lists) {
			this.lists().set(jsonResp.lists)
			delete jsonResp.lists;
		}
		return jsonResp;
	},

	lists: function () {
		if (!this._lists) {
			this._lists = new Trellino.Collections.Lists([], {
				list: this
			});
		}
		return this._lists;
	},

});