Trellino.Collections.Lists = Backbone.Collection.extend ({
	model: Trellino.Models.List,

	url: "/api/lists",

	getOrFetch: function(id) {
		var lists = this;

		var list;
		if (list = this.get(id)) {
			list.fetch();
		} else {
			list = new Trellino.Models.Board({ id: id});
			list.fetch({
				success: function () { lists.add(list) }
			});
		}

		return list;
	},

});