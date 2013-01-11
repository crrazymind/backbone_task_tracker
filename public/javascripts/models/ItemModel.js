define(['jquery', 'backbone', 'underscore', 'utils/sync'], function($, Backbone, _, ownSync){
	var ItemModel = Backbone.Model.extend({
		idAttribute: '_id',
		sync: ownSync,
		urlRoot : "http://localhost:5000/api",
		initialize : function(data, view){
			this.name = "ItemModel model";
			this.viewLink = view;
		},
		validate : function(item){
			if(this._id == "") this.id = "new";
			if (typeof this.id == "object") this.id = this.id.$oid;
		}
	});
	
	return ItemModel;
});
