Trellino.Views.BoardShow = Backbone.View.extend ({
	template: JST["boards/show"],

	initialize: function () {
		// debugger
		this.listenTo(this.model, "sync add remove", this.render);
	},

	render: function () {
		var renderedContent = this.template({ board: this.model });
		this.$el.html(renderedContent);

		return this;
	},

	
});