Trellino.Routers.router = Backbone.Router.extend ({
	initialize: function (options) {
		this.$rootEl = options.$rootEl;
	},

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
		Trellino.Collections.boards.fetch();
		this._swapView(indexView);
	},

	boardShow: function (id) {
		var board = Trellino.Collections.boards.getOrFetch(id);
		var showView = new Trellino.Views.BoardShow({
			model: board
		});

		this._swapView(showView);
	},

	boardNew: function () {
		var newBoardView = new Trellino.Views.BoardForm();

		this._swapView(newBoardView);
	},

	_swapView: function (newView) {
		if (this._currentView) {
			this._currentView.remove();
		}
		// alert('hey');
		this.$rootEl.html(newView.render().$el);

		this._currentView = newView;
	},


});