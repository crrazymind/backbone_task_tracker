
$(window).load(function(){
	//http://localhost:3000/task/#/views/10

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
	    		var app_router = $.taskList.app.globalAppRouter = new AppRouter;
			    app_router.on('route:getView', function (id) {
			        console.log('model save: ', $.taskList.AppRouter);
			        alert( "Get post number " + id );   
			    });
			    app_router.on('route:renderSelected', function (id) {
			    	console.log($.taskList.detailsCollection)
			        var detailsCollection = $.taskList.app.detailsCollection = new $.taskList.detailsCollection(new $.taskList.AppModel, {hashCode:"showDetails/"+id});
			    	var detailsApp = $.taskList.app.detailsView = new $.taskList.TaskGenerator({collection: detailsCollection});
			    	$("#todoapp").empty().html(detailsApp.el);
				});
			    app_router.on('route:defaultRoute', function (actions) {
			    	var appModel = new $.taskList.AppModel;
			    	var appCollection = $.taskList.app.appCollection = new $.taskList.tasksCollection(appModel);
			    	var indexApp = $.taskList.app.globalView = new $.taskList.TaskGenerator({model: appModel, collection: appCollection});
			    	//new $.taskList.utils.SourceView({model: new $.taskList.AppModel, collection : new $.taskList.tasksCollection})
					$("#todoapp").html(indexApp.el);
			    });
			    Backbone.history.start();
			    return this;
	    	}
	    }
    }
    var tsk = new appCore().init();

})
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