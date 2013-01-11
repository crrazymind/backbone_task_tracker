define(['jquery', 'backbone', 'underscore', 'utils/sync'], function($, Backbone, _, ownSync){
	DetailsCollection = Backbone.Collection.extend({
		url : "http://localhost:5000/",
		initialize: function(model, options) {
			this.name = "detailsCollection";
			this.url = "http://localhost:5000/"+options.hashCode
		},
		sync: ownSync
	});
	return DetailsCollection;
});
