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
		console.log(new Core);
		//console.log('args: ', [].splice.call(arguments,0));

	};
	
	return {init: init};
});
