Trellino.Routers.router = Backbone.Router.extend ({
	routes: {
		"": "boardsIndex",
		"boards/new": "boardNew",
		"boards/:id": "boardShow",
	},

	boardsIndex: function () {
		Trellino.Collections.boards.fetch();
		var indexView = new Trellino.Views.BoardsIndex({
			collection: Trellino.Collections.boards
		});

		this._swapView(indexView);
	},

	boardShow: function (id) {
		var board = Trellino.Collections.boards.getOrFetch(id);
		// debugger
		var showView = new Trellino.Views.BoardShow({
			model: board
		});

		this._swapView(showView);
	},

	boardNew: function () {
		// var board = new Trellino.Collections.Board();
		var newBoardView = new Trellino.Views.BoardForm();

		this._swapView(newBoardView);
	},

	_swapView: function (newView) {
		if (this.currentView) {
			this.currentView.remove();
		}

		$('body').html(newView.render().$el);

		this._currentView = newView;
	},


});