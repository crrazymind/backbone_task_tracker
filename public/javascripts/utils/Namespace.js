define(['jquery'], function($){
	var AppNamespace = function(){
		name : "global taskList namespace",
		utils : {},
		app : {},
		updateQueue : {
			stack : [],
			flush : function(){
				for (var i = this.stack.length - 1; i >= 0; i--) {
					//console.log(this.stack[i]);
				};
			}
		},
		waitQueue : {},
		globalId  : 0
	}
	return AppNamespace;
});

