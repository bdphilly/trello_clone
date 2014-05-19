Trellino.Views.BoardShow = Backbone.CompositeView.extend ({
	template: JST["boards/show"],

	initialize: function () {
		this.listenTo(this.model, "sync add remove", this.render);
		this.listenTo(this.model.lists(), "add", this.addList);
		this.listenTo(this.model.lists(), "remove", this.removeList)

		var newListView = new Trellino.Views.ListForm({ model: this.model });
		
		this.model.lists().each(this.addList.bind(this));
		this.addSubview(".lists-new", newListView);
	},

	addList: function (list) {
		var listShow = new Trellino.Views.ListShow({ model: list});
		this.addSubview(".lists", listShow);
	},

	removeList: function (list) {
		var subview = _.find(
			this.subviews(".lists"),
			function (subview) {
				return subview.model === list;
			}
		);

		this.removeSubview(".lists", subview);
	},

	render: function () {
		var renderedContent = this.template({ board: this.model });
		this.$el.html(renderedContent);
		this.attachSubviews();

		var addMember = new Trellino.Views.BoardMembers({ model: this.model });
		this.$el.append(addMember.render().$el);

		return this;
	},

});