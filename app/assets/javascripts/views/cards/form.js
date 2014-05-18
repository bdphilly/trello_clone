Trellino.Views.CardForm = Backbone.View.extend ({
	template: JST["cards/form"],

	events: {'submit form': 'create'},

	render: function () {
		var renderedContent = this.template({ list: this.model });

		this.$el.html(renderedContent);

		return this;
	},

	create: function (event) {
		event.preventDefault();

		var params = $(event.currentTarget).serializeJSON()["card"];
		var newCard = new Trellino.Model.Card(params);

		newCard.set("list_id", this.model.id);
		this.model.cards().create(newCard);
	},

})