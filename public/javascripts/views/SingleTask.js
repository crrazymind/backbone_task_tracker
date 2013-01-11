define([
		'jquery', 
		'backbone',
		'underscore', 
		'utils/BaseView'],
function($, Backbone, _, BaseView){
	var SingleTask = BaseView.extend({
		template: _.template($('#my_template').html()),
		el: '<div class="item_hold"></div>',
		events: {
			"click .save": "submitModel",
			"dblclick .item": "changeTtl",
			"click .remove": "removeHandler",
			"change .duration": "calcCost",
			"blur .item input": "itemEditComplete"
		},
		initialize: function(args) {
			this.model = args.model;
			this.timer = "";
			this.bindTo(this.model, 'destroy', this.destroyView, this);
			this.bindTo(this.model, 'change', this.modelChangeCallback, this);
			this.model.viewLink = this;
		},
		modelChangeCallback : function(add){
			if(this.model.hasChanged){
				this.submitEl.fadeIn();
				var root = this;
				if(this.timer) clearTimeout(this.timer);
				this.timer = setTimeout(function(){
					root.model.viewLink.idEl.val(root.model.get("_id"));
				},100);
			}
			//console.log('render_add: ', [].splice.call(arguments,0));
		},
		removeHandler : function(e){
			if(this.model.attributes._id == ""){
				this.$el.slideUp();
				this.model.id = null
				this.model.destroy();
				return;
			}else{
				var choise = confirm("are you sure?");
				if(choise){
					this.model.validate();
					this.model.destroy({success: this.removeSuccess, error: this.removeError});
				}
			}
		},
		remove : function(){
			var root = this;
			this.$el.slideUp(600, function(){
				root.$el.remove();
			});
		},
		destroyView : function(e){
			this.dispose();
		},
		removeSuccess: function(model, response){},
		removeError: function(model, response){
			console.log("wtf?11 - removeError" , this);
		},
		render: function(data) {
			var elCode = $(this.template(this.model.toJSON()));
			this.$el.append(elCode);
			this.submitEl = this.model.viewLink.submitEl = elCode.find(".save");
			this.removeEl = this.model.viewLink.removeEl= elCode.find(".remove");
			this.removeEl = this.model.viewLink.idEl= elCode.find("._id");
			this.submitEl.hide();
			return this;
		},
		submitModel: function(e){
			if(this.model.hasChanged()) this.model.save({},{success: this.saveSuccess, error: this.saveError});
		},
		saveSuccess: function(model, response){
			model.viewLink.submitEl.fadeOut();
			if($.taskList.updateQueue.stack[0]) {
				model.viewLink.model.set("_id", $.taskList.updateQueue.stack[0])
				$.taskList.updateQueue.stack.pop();
				console.log("saveSuccess: ", model.get("_id"));
				model.viewLink.submitEl.fadeOut();
			}
		},
		saveError: function(model, response){
			console.log('smth was ololo!11 ', response);
		},
		changeTtl: function(e){
			var el = $(e.currentTarget);
			if(el.hasClass('eta') || el.hasClass('edit') || el.hasClass('buttons')) return;
			var val = el.text();
			el.empty();
			var edit = el.find('input');
			if(edit.length > 0){
				edit.val(val);
				edit.show();
			}else{
				edit = $('<input type="text" value="'+val+'"/>');
				el.append(edit);
			}
			edit.focus();
		},
		parseData : function (el) {
			var data = {};
			var num = el.find('._id').val();
			var arr = ["duration","cost","eta","link","done","_id","title"];
			for (var i = arr.length - 1; i >= 0; i--) {
				data[arr[i]] = el.find('.' + arr[i]).text();
			};
			if(data['done'] == "") data['done'] = false;
			data['_id'] = num;
			return data;
		},
		checkNumber: function(e){
			if(!e.currentTarget || e.currentTarget.length <= 0) return;
			var reg = /([0-9])/gi;
			var val = $(e.currentTarget).val().match(reg);
			if(val) val = val.join('')*1;
			$(e.currentTarget).val(val ? val : 0)
		},
		calcCost: function (e){
			$(e.currentTarget).closest('.view').find('.cost').text($(e.currentTarget).find('input').val()*15);		
		},
		itemEditComplete: function(e){
			var el = $(e.currentTarget).closest('.item');
			var hold = $(e.currentTarget).closest('.view');
			if(el && el.hasClass('cost') || el.hasClass('eta') || el.hasClass('duration')) this.checkNumber(e);
			var val = $(e.target).val();
			el.text(val);
			$(e.target).remove();
			var data = this.parseData(hold);
			this.model.set(data);
		}
	});
	
	return SingleTask;
});
