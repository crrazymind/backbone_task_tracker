define(['jquery', 'backbone', 'underscore', 'utils/sync'], function($, Backbone, _, ownSync){
	var TasksCollection = Backbone.Collection.extend({
		url : "http://localhost:5000/api",
		//model: $.taskList.AppModel,
		initialize: function(model, options) {
			this.name = "tasksCollection";
			_.bindAll(this, "loadSucess")
			this.add(model);
		},
		loadSucess: function(root, data, status){
			console.log(arguments);
		},
		loadError: function(root, data, status){
			console.log("error: ", root);
		},
		sync: ownSync
	});
	return TasksCollection;
});
