window.Currency = Backbone.Model.extend({
	
	urlRoot:"currencies"
	
});

window.CurrencyCollection = Backbone.Collection.extend({
	model:Currency,
	url:"currencies"
});

window.collections = window.collections || {};
window.collections.currencies =  new CurrencyCollection();
