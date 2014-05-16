Trellino.Routers.router = Backbone.Router.extend ({
	routes: {
		"": "boardsIndex",
		"boards/:id": "boardsShow"
	},

	boardsIndex: function () {
		Trellino.Collections.boards.fetch();
		var indexView = new Trellino.Views.BoardsIndex({
			collection: Trellino.Collections.boards
		});

		this._swapView(indexView);
	},

	boardsShow: function (id) {
		var board = Trellino.Collections.boards.getOrFetch(id);
		// debugger
		var showView = new Trellino.Views.BoardShow({
			model: board
		});

		this._swapView(showView);

	},

	_swapView: function (newView) {
		if (this.currentView) {
			this.currentView.remove();
		}

		$('body').html(newView.render().$el);

		this._currentView = newView;
	},


});