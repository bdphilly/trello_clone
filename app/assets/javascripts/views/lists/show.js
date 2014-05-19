Trellino.Views.ListShow = Backbone.CompositeView.extend ({
	template: JST["lists/show"],

	events: { 'click button.destroy': 'destroyList',
						'mouseover .list-title': 'addDeleteButton',
						'mouseleave .list-title': 'removeDeleteButton'
					 },

	tagName: 'li',

	attributes: {class: 'list'},

	initialize: function (cardModel) {
		this.listenTo(this.model, "sync add remove", this.render);
		this.listenTo(this.model.cards(), "add", this.addCard);
		this.listenTo(this.model.cards(), "remove", this.removeCard);

		var newCardView = new Trellino.Views.CardForm({ model: this.model });
		this.addSubview(".cards-new", newCardView);
		this.model.cards().each(this.addCard.bind(this));
	},

	addCard: function (card) {
		var cardShow = new Trellino.Views.CardShow({ model: card });
		this.addSubview(".cards", cardShow);
	},

	removeCard: function (card) {
		var subview = _.find(
			this.subviews(".cards"),
			function (subview) {
				return subview.model === card;
			}
		);

		this.removeSubview(".lists", subview);
	},

	destroyList: function(event) {
		event.preventDefault();
	
		this.model.destroy();
	},

	addDeleteButton: function (event) {
		event.preventDefault();

		$(event.target).find('button.destroy').removeClass('hidden');
	},

	removeDeleteButton: function (event) {
		event.preventDefault();

		$(event.target).find('button.destroy').addClass('hidden');
	},

	render: function () {
		var renderedContent = this.template({ list: this.model });

		this.$el.html(renderedContent);

		this.attachSubviews();

		return this;
	},

});