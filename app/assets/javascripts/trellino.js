window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
  	Trellino.Routers.router = new Trellino.Routers.router({
      $rootEl: $("#content") 
    });
  	Trellino.Collections.boards = new Trellino.Collections.Boards();
    Backbone.history.start();
  }
};

$(document).ready(function () {
	Trellino.initialize();
});