window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
  	new Trellino.Routers.router();
  	Trellino.Collections.boards = new Trellino.Collections.Boards();
    Backbone.history.start();
  }
};

$(document).ready(function () {
	Trellino.initialize();
});