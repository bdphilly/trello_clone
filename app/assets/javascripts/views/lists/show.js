Trellino.Views.ListShow = Backbone.CompositeView.extend ({
	template: JST["lists/show"],

	tagName: 'li',

	initialize: function (cardModel) {
		this.listenTo(this.model, "sync add remove", this.render);
		//TODO: listenTo - addCard, removeCard

		var cardView = new Trellino.Views.CardShow({ model: this.model });
		this.addSubview(".cards-new", cardView);

		// this.model.cards().each(this.addCard.bind(this));
	},

	//TODO: addCard, removeCard

	render: function () {
		var renderedContent = this.template({ list: this.model });
		this.$el.html(renderedContent);
		this.attachSubviews();

		return this;
	},

});