Trellino.Views.ListForm = Backbone.View.extend ({
	template: JST["lists/form"],

	events: { 'submit form': 'create' },

	render: function () {
		var renderedContent = this.template({ board: this.model });

		this.$el.html(renderedContent);

		return this;
	},

	// leave: function () {
	// 	this.remove;
	// },

	create: function (event) {
		event.preventDefault();

		var params = $(event.currentTarget).serializeJSON()["list"];
		var newList = new Trellino.Models.List(params);

		newList.set("board_id", this.model.id);

		var that = this;

		this.model.lists().create(newList);
	},

});