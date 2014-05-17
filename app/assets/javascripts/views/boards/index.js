Trellino.Views.BoardsIndex = Backbone.View.extend({
	template: JST["boards/index"],

	events: { 'click button.destroy': 'destroyBoard' },

	initialize: function () {
		this.listenTo(this.collection, "sync add remove change", this.render);
	},

	destroyBoard: function (event) {
		event.preventDefault();

		var $target = $(event.target);
		var board = this.collection.get($target.attr('data-id'));

		board.destroy();
	},

	render: function () {
		var renderedContent = this.template({ boards: this.collection });
		this.$el.html(renderedContent);

		return this;
	},
	
});