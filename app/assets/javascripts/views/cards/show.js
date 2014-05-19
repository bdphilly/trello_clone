Trellino.Views.CardShow = Backbone.View.extend ({
	template: JST["cards/show"],

	initialize: function() {
		this.listenTo(this.model, "sync add remove", this.render);
	},

	render: function () {
		var renderedContent = this.template({ card: this.model });
		this.$el.html(renderedContent);

		return this;
	},

});