Trellino.Views.BoardMembers = Backbone.View.extend ({
	template: JST["boards/members"],

	events: {'submit form': 'submit'},

	render: function () {
		var renderedContent = this.template({ board: this.model });
		this.$el.html(renderedContent);

		return this;
	},

	submit: function (event) {
		event.preventDefault();

		var params = $(event.currentTarget).serializeJSON();
		var memberData = params["newMemberEmail"];
		this.model.fetch();
		this.model.save(memberData, {
			success: function () {
				alert('success');
			}
		});
	},

});