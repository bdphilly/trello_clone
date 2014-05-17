Trellino.Views.Show = Backbone.View.extend ({
	template: JST["lists/show"],

	initialize: function () {
		this.listenTo(this.model, "sync add remove", this.render)
		//this.listenTo(this.model.cards, "sync add remove", this.render) //ADD AFTER CARDS ARE MADE!
	},

	render: function () {
		var reneredContent = new this.template({ list: this.model });
		this.$el.html(renderedContent);

		return this;
	},


});