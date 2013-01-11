// This set's up the module paths for underscore and backbone
require.config({
    'paths': { 
		"underscore": "libs/underscore", 
		"backbone": "libs/backbone"
	},
	'shim': 
	{
		underscore: {
			'exports': '_'
		},
		backbone: {
			'deps': ['jquery', 'underscore'],
			'exports': 'Backbone'
		}
	}	
}); 

require([
	'underscore',
	'backbone',
	'app'
	], 
	function(_, Backbone, app){
		app.init();
});
