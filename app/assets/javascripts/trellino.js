window.Trellino = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function () {
  	new Trellino.Routers.router();
  	Backbone.history.start();
  }
};

$(document).ready(function () {
	Trellino.initialize();
})