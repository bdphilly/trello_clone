Trellino.Views.BoardShow = Backbone.CompositeView.extend ({
	template: JST["boards/show"],

	initialize: function () {
		this.listenTo(this.model, "sync add remove", this.render);
		this.listenTo(this.model.lists(), "sync add remove", this.render);

		var listView = new Trellino.Views.ListShow({ model: this.model });
		this.addSubview(".lists-new", listView);

		// this.model.lists().each(this.addList.bind(this));
	},

	render: function () {
		var renderedContent = this.template({ board: this.model });
		this.$el.html(renderedContent);
		this.attachSubviews();

		var newListForm = new Trellino.Views.ListForm({ model: this.model });
		this.$el.append(newListForm.render().$el);

		var addMember = new Trellino.Views.BoardMembers({ model: this.model });
		this.$el.append(addMember.render().$el);
		
		return this;
	},

});