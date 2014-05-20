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

		var that = this;

		this.$(".cards").sortable({
			connectWith: ".cards",

			start: function (event, ui) {
				$(ui.item.find(".card-detail")).toggleClass('dragged');
			},

			receive: function (event, ui) {
				// var cardID = ui.item.data('id');
				// var movedCard = Trellino.Cards.get(cardID);

			},

			stop: function (event, ui) {
				$(ui.item.find(".card-detail")).toggleClass('dragged');
			},

			update: function (event, ui) {
				var listIdArray = $(event.target).sortable('toArray', {attribute: 'id'});
				// var list = ui.item.attr('id');
				var listId = $(event.target).data('id')
				// debugger
				that.updateCardRanks(listIdArray, listId);

			},

		});

		this.$(".lists").sortable({

			start: function (event, ui) {
				$(ui.item.find(".list-detail")).toggleClass('dragged');
			},

			receive: function (event, ui) {
				
			},

			stop: function (event, ui) {
				$(ui.item.find(".list-detail")).toggleClass('dragged');
			},

			update: function (event, ui) {
				var listIdArray = $(event.target).sortable('toArray', {attribute: 'id'});
				that.updateListRanks(listIdArray);
			},

		});

		return this;
	},

	updateListRanks: function(ids) {
		var rank = 0;
		var that = this;
		_.each(ids, function (id) {
			var list = that.model.lists().get(id);
			list.save({ 'rank': rank });
			rank ++;
		})
	},

	updateCardRanks: function(ids, listId) {
		var rank = 0;
		var that = this;
		var list = that.model.lists().get(listId);
		_.each(ids, function (id) {
			var card = list.cards().get(id);
			card.set({ 'rank': rank });
			rank ++;
		})
		list.save();
	},

});






// jQuery(function(){

// // loop through the original items...
// jQuery("#original_items li").each(function(){

//     // clone the original items to make their
//     // absolute-positioned counterparts...
//     var item = jQuery(this);
//     var item_clone = item.clone();
//     // 'store' the clone for later use...
//     item.data("clone", item_clone);

//     // set the initial position of the clone
//     var position = item.position();
//     item_clone.css("left", position.left);
//     item_clone.css("top", position.top);

//     // append the clone...
//     jQuery("#cloned_items").append(item_clone);
// });

// // create our sortable as usual...
// // with some event handler extras...
// this.$("card-list").sortable({

//     // on sorting start, hide the original items...
//     // only adjust the visibility, we still need
//     // their float positions..!
//     start: function(e, ui){
//         // loop through the items, except the one we're
//         // currently dragging, and hide it...
//         ui.helper.addClass("exclude-me");
//         $("#original_items li:not(.exclude-me)")
//             .css("visibility", "hidden");

//         // get the clone that's under it and hide it...
//         ui.helper.data("clone").hide();
//     },

//     stop: function(e, ui){
//         // get the item we were just dragging, and
//         // its clone, and adjust accordingly...
//         jQuery("#original_items li.exclude-me").each(function(){
//             var item = jQuery(this);
//             var clone = item.data("clone");
//             var position = item.position();

//             // move the clone under the item we've just dropped...
//             clone.css("left", position.left);
//             clone.css("top", position.top);
//             clone.show();

//             // remove unnecessary class...
//             item.removeClass("exclude-me");
//         });

//         // make sure all our original items are visible again...
//         jQuery("#original_items li").css("visibility", "visible");
//     },

//     // here's where the magic happens...
//     change: function(e, ui){
//         // get all invisible items that are also not placeholders
//         // and process them when ordering changes...
//         jQuery("#original_items li:not(.exclude-me, .ui-sortable-placeholder)").each(function(){
//             var item = jQuery(this);
//             var clone = item.data("clone");

//             // stop current clone animations...
//             clone.stop(true, false);

//             // get the invisible item, which has snapped to a new
//             // location, get its position, and animate the visible
//             // clone to it...
//             var position = item.position();
//             clone.animate({
//                 left: position.left,
//                 top:position.top}, 500);
//         });
//     }
// });