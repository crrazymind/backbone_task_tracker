define(['jquery', 'backbone', 'underscore', 'utils/sync'], function($, Backbone, _, ownSync){
	var AppModel = Backbone.Model.extend({
		idAttribute: '_id',
		silent : true,
		sync: ownSync,
		url : "http://localhost:5000/api",
		initialize: function(){
			_.bindAll(this, "fetchSuccess")
			this.name = "AppModel";
			this.fetch({success : this.fetchSuccess});
		},
		fetchSuccess : function(){}
	});
	
	return AppModel;
});
