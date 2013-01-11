define(['jquery', 'backbone', 'underscore', 'utils/sync', 'models/ItemModel'], function($, Backbone, _, ownSync, ItemModel){
	var NewItemModel = ItemModel.extend({
		defaults: function(){
		  return {
			title: 'New task',
			_id : '',
			duration: 0,
			cost: 0,
			eta: new Date().toUTCString(),
			link: '',
			done: false
		  };
		}
	})
	
	return NewItemModel;
});
