define([
		'jquery', 
		'backbone',
		'underscore', 
		'utils/BaseView',
		'models/ItemModel',
		'models/NewItemModel',
		'views/SingleTask'], 
function($, Backbone, _, BaseView, ItemModel, NewItemModel, SingleTask){
	TaskGenerator = BaseView.extend({
		template: _.template($('#my_template').html()),
		el: '<div class="app"></div>',
		events: {
			"click .submit-task": "navigate",
			"click .add-one": "addNew"
		},
		initialize: function(){
			this.name = "TaskGenerator view";
			_.bindAll(this, "render", "fetchError")
			this.bindTo(this.model, 'change', this.render);
			//this.bindTo(this.model, 'destroy', this.render);
			this.bindTo(this.model, 'error', this.fetchError);
		},
		fetchError: function(model, response) {
			console.log('fetch error ', response);
		},
		render: function(){
			var items = this.collection.toJSON()[0].items;
			console.log("render: " ,items)
			if(!items) return false;
			$(this.el).append(_.template($('#task_header_template').html()));
			for(var _i=0; _i < items.length; _i++){
				this.addChild(items[_i]);
			}
			$(this.el).append(_.template($('#submit-btm-tpl').html()));
			return this;
		},
		addChild: function(data){
			var itemModel = new ItemModel(data, this);
			var one = new SingleTask({data:data, model:itemModel});
			$(this.el).append(one.render().el);
		},
		addNew : function(){
			var newModel = new $.taskList.NewItemModel({}, this);
			newModel.validate();
			var one = new SingleTask({model: newModel});
			var newOne = $(one.render().el);
			newOne.insertBefore($(this.el).find('.view:last'));
			newOne.hide();
			newOne.slideDown();
		},
		navigate: function(e){
			console.log(this.model);
			//$.taskList.AppRouter.navigate("/selected");
			//this.model.save({success: this.saveSuccess, error: this.saveError});
		},
		saveSuccess: function(model, response){
			console.log('save callback');
		},
		saveError: function(model, response){
			console.log('smth went ololo!11');
		}
	});
	
	return TaskGenerator;
});
