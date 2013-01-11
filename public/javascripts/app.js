var config = ['jquery',
			'backbone',
			'underscore',
			'utils/Namespace',
			'Core'/*,
			'utils/BaseView',
			'models/AppModel',
			'models/TasksCollection',
			'views/TaskGenerator'*/];

// This is the main entry point for the App
define(config, function($, Backbone, _,Namespace, Core/*BaseView, AppModel, TasksCollection, TaskGenerator*/){
	var init = function(){
		var app = new Core;
		app.init();
		//console.log('args: ', [].splice.call(arguments,0));

	};
	
	return {init: init};
});
