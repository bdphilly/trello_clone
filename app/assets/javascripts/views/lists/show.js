Trellino.Views.ListShow = Backbone.CompositeView.extend ({
	template: JST["lists/show"],

	events: { 'click button.destroy': 'destroyList',
						'mouseover .list-title': 'addDeleteButton',
						'mouseleave .list-title': 'removeDeleteButton'
					 },

	tagName: 'li',

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














});