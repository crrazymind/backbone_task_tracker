var config = ['jquery',
			'backbone',
			'underscore',
			'utils/BaseView',
			'models/AppModel',
			'models/TasksCollection',
			'models/DetailsCollection',
			'views/TaskGenerator'];

// This is the main entry point for the App
define(config, function($, Backbone, _, BaseView, AppModel, TasksCollection, DetailsCollection, TaskGenerator){
    function appCore(){
    	return {
	    	configUrl : "/cofig",
	    	getConfig : function(){
	    		var config = {};
				config.routes = {
		            "views/:id": "getView",
		            "selected/:id": "renderSelected",
		            "*actions": "defaultRoute"
		        }
	    		return config;
	    	},
	    	init : function(){
	    		var AppRouter = Backbone.Router.extend(this.getConfig());
	    		var app_router = new AppRouter;
			    app_router.on('route:getView', function (id) {
			        console.log('model save: ', $.taskList.AppRouter);
			        alert( "Get post number " + id );   
			    });
			    app_router.on('route:renderSelected', function (id) {
			        var detailsCollection = new DetailsCollection(new AppModel, {hashCode:"showDetails/"+id});
			    	var detailsApp = new TaskGenerator({collection: detailsCollection});
			    	$("#todoapp").empty().html(detailsApp.el);
				});
			    app_router.on('route:defaultRoute', function (actions) {
			    	var appModel = new AppModel;
			    	var appCollection = new TasksCollection(appModel);
			    	var indexApp = TaskGenerator({model: appModel, collection: appCollection});
			    	//new $.taskList.utils.SourceView({model: new $.taskList.AppModel, collection : new $.taskList.tasksCollection})
					$("#todoapp").html(indexApp.el);
			    });
			    Backbone.history.start();
			    return this;
	    	}
	    }
    }
	return appCore;
});

	/*$.taskList.NewItemModel = Backbone.Model.extend({
		idAttribute: '_id',
		initialize: function(data, view){
			console.log("new item model initialize");
			this.viewLink = view;
			this.modelId = $.taskList.globalId++;
		},
		defaults: function(){
		  return {
			title: 'task title some other ',
			_id : '',
			duration: 0,
			cost: 0,
			eta: '0/1/0',
			link: 'http://localhost',
			done: false
		  };
		}
	});*/