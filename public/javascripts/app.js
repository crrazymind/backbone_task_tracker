var config = ['jquery',
			'backbone',
			'underscore',
			'utils/BaseView',
			'models/AppModel',
			'models/TasksCollection',
			'views/TaskGenerator'];

// This is the main entry point for the App
define(config, function($, Backbone, _, BaseView, AppModel, TasksCollection, TaskGenerator){
	var init = function(){
		console.log(TaskGenerator);
		//console.log('args: ', [].splice.call(arguments,0));

	};
	
	return { init: init};
});
