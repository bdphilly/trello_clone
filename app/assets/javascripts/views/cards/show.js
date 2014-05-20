Trellino.Views.CardShow = Backbone.View.extend ({
	template: JST["cards/show"],

	tagName: 'li',

	attributes: function () {
		return {
			id: this.model.id,
			rank: this.model.rank
		}
	},

	initialize: function() {
		this.listenTo(this.model, "sync add remove change", this.render);
	},

	events: { 'click button.destroy': 'destroyCard',
						'mouseover .card-title': 'addDeleteButton',
						'mouseleave .card-title': 'removeDeleteButton'
					 },

	destroyCard: function(event) {
		event.preventDefault();
	
		this.model.destroy();
	},

	render: function () {
		var renderedContent = this.template({ card: this.model });
		this.$el.html(renderedContent);

		return this;
	},

	addDeleteButton: function (event) {
		event.preventDefault();

		$(event.target).find('button.destroy').removeClass('hidden');
	},

	removeDeleteButton: function (event) {
		event.preventDefault();

		$(event.target).find('button.destroy').addClass('hidden');
	},

});