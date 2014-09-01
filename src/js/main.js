var AppRouter = Backbone.Router.extend({
	
	routes : {
		"" : "propertiesToLet",
		"properties/tolet" : "propertiesToLet",
		"properties/tobuy" : "propertiesForSale",
		"properties/tolet/:page" : "propertiesToLet",
		"properties/tobuy/:page" : "propertiesForSale",
		"properties/add" : "addProperty",
		"properties/:id" : "propertyDetails",
		"properties/admin/:id" : "propertyDetails",
		"about" : "about"
	},

	initialize : function() {
		this.headerView = new HeaderView();
		$(".header").html(this.headerView.el);
	},
	
	propertiesToLet: function(page){
		var p = page ? parseInt(page, 10) : 1;
		collections.properties.fetch({success:function(){
			var propertyList = collections.properties.myFilter("listedForRent",true);
	        $("#content").html(new PropertyListView({model: propertyList, page: p}).el);
		}});
        this.headerView.selectMenuItem('tolet-menu');
	},

	propertiesForSale: function(page){
		var p = page ? parseInt(page, 10) : 1;
		collections.properties.fetch({success:function(){
			var propertyList = collections.properties.myFilter("listedForSale",true);
        	$("#content").html(new PropertyListView({model: propertyList, page: p}).el);
        }});
        this.headerView.selectMenuItem('forsale-menu');
	},

	propertyDetails: function(id){
		var property = new Property({id: id});
		property.fetch({success: function(){
            $("#content").html(new PropertyView({model: property,editMode: false}).el);
        }});
	},
	
	addProperty: function(){
		var property = new Property();
		$("#content").html(new PropertyView({model:property,editMode: true}).el);
	}

});

utils.loadTemplate(['HeaderView','PropertyListItemView','PropertyView'],function(){
	app = new AppRouter();
	Backbone.history.start();
});
