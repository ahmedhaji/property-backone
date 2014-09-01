window.PropertyListView =  Backbone.View.extend({
	
	initialize: function(){
		this.render();
	},
	
	render: function(){
		var self = this;
		$(this.el).html('<ul class="thumbnails"></ul>');
		this.model.each(function(property){
			$('.thumbnails', self.el).append(new PropertyListItemView({model: property}).render().el);
		});
		
        $(this.el).append(new Paginator({model: this.model, page: this.options.page}).render().el);
        return this;
	}
	
});

window.PropertyListItemView = Backbone.View.extend({
	
	tagName: "li",

    className: "span3",

	initialize: function(){
		this.model.bind("change", this.render, this);
		this.model.bind("destroy", this.close, this);
	},
	render: function () {
		var lapseTime = this.model.get("listingDate") ? (new Date()).getTime() - this.model.get("listingDate").getTime() : 'N/A';
		lapseTime = isNaN(lapseTime) ? lapseTime : Math.round(lapseTime / (60 * 1000)) + ' mins'; 
		this.model.set("lapseTime",lapseTime);
        if(this.template!=null)
        	$(this.el).html(this.template(this.model.toJSON()));
        return this;
    }
    
});

