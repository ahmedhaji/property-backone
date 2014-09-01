window.HeaderView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
    	if (this.template!=null)
        	$(this.el).html(this.template());
        return this;
    },

    selectMenuItem: function (menuItem) {
    	console.log($('.nav-header li'));
        $('.nav-header li').removeClass('active');
        if (menuItem) {
            $('.' + menuItem).addClass('active');
        }
    }

});