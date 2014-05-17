Trellino.Views.BoardForm = Backbone.View.extend ({
	template: JST["boards/form"],

	initialize: function () {
		this.subviews = [];
	},

	events: { 
		"submit form": "create" 
	},

	render: function () {
		var renderedContent = this.template();
		this.$el.html(renderedContent);

		return this;
	},

	leave: function () {
		this.subviews.forEach(function(subview) {
			subview.leave();
		})
		this.remove();
	},

	create: function (event) {
		event.preventDefault();

		var params = $(event.currentTarget).serializeJSON()["board"];
		var newBoard = new Trellino.Models.Board(params);

		newBoard.save({}, {
			success: function () {
				Trellino.Collections.boards.add(newBoard);
				Backbone.history.navigate("/boards/" + newBoard.id, { trigger: true });
			}
		});
	}
});