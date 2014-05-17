Trellino.Collections.Lists = Backbone.Collection.extend ({
	model: Trellino.Models.List,
	
	initialize: function (models, options) {
		this.board = options.board;
	},

	url: function () {
		return "api/boards/" + this.board.id + "/lists"; 
	},

	getOrFetch: function(id) {
		var lists = this;

		var list;
		if (list = this.get(id)) {
			list.fetch();
		} else {
			list = new Trellino.Models.List({ id: id});
			list.fetch({
				success: function () { lists.add(list) }
			});
		}

		return list;
	},

});