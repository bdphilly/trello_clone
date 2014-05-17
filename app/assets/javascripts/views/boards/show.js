Trellino.Views.BoardShow = Backbone.View.extend ({
	template: JST["boards/show"],

	initialize: function () {
		this.listenTo(this.model, "sync add remove", this.render);
		this.listenTo(this.model.lists(), "sync add remove", this.render);
		
	},

	render: function () {
		var renderedContent = this.template({ board: this.model });
		this.$el.html(renderedContent);

		var newListForm = new Trellino.Views.ListForm({ model: this.model });
		this.$el.append(newListForm.render().$el);

		var addMember = new Trellino.Views.BoardMembers({ model: this.model });
		this.$el.append(addMember.render().$el);
		
		return this;
	},

});