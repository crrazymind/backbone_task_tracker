define(['jquery', 'backbone', 'underscore'], function($, Backbone, _){
	function ownSync(method, model, options){
		this.methodMap = {
			'create': 'POST',
			'update': 'PUT',
			'delete': 'DELETE',
			'read':   'GET'
		};
		this.getValue = function(object, prop) {
			if (!(object && object[prop])) return null;
			//if(prop == "url" && _.isFunction(object[prop])) console.log(object[prop]())
			return _.isFunction(object[prop]) ? object[prop]() : object[prop];
		};

		options.timeout = 2000;  
		options.dataType = "jsonp";
		options.dataKeyword = "items";
		var type = this.methodMap[method];
		options || (options = {});
		var params = {type: type, dataType: 'jsonp'};

		if (!options.url) {
			params.url = this.getValue(model, 'url') || urlError();
		}
		if (!options.data && model && (method == 'create' || method == 'update')) {
		  params.contentType = 'application/json';
		  params.data = JSON.stringify(model.toJSON());
		}
		if((typeof params.data != "undefined") && options.dataKeyword) {
			params.data = options.dataKeyword + "=" + params.data;
			params.data += "&_method=" + method;
		}else{
			params.data = "_method=" + method;
		}
		return $.ajax(_.extend(params, options));
	}
	return ownSync;
});

