window.Property = Backbone.Model.extend({
	
	urlRoot:"properties",
	
	initialize: function(){
	},
	
	validate: function (attr) {
		var retVal = {};
		if (_.has(attr,'propertyTitle') && !attr.propertyTitle) {
			retVal['propertyTitle'] = "You must enter a property title";
		}
		if (_.has(attr,'noOfBedrooms') && !attr.noOfBedrooms) {
			retVal['noOfBedrooms'] = "You must enter no. of bedrooms";
		}
		if (_.has(attr,'city') && !attr.city) {
			retVal['city'] = "You must enter a city";
		}
		if (_.has(attr,'country') && !attr.country) {
			retVal['country'] = "You must enter a country";
		}
		if (_.has(attr,'rentAmount') && attr.listedForRent && !attr.rentAmount) {
			retVal['rentAmount'] = "You must enter a monthly rent amount";
		}
		if (_.has(attr,'purchasePrice') && attr.listedForSale && !attr.purchasePrice) {
			retVal['purchasePrice'] = "You must enter a purchase price";
		}
		
		return _.size(retVal) > 0 ? retVal : null;
	},
	
	validateItem: function (key) {
		var attr = {};
		attr[key] = this.get(key);
		var result = this.validate( attr );
        return result ? {message: result[key], isValid: false} : {isValid: true};
    },

	defaults: {
		id:null,
		propertyTitle:"",
		noOfBedrooms:null,
		listingDate:new Date(),
		lapseTime:"N/A",
		town:"",
		city:"",
		country:"",
		listedForSale:false,
		listedForRent:false,
		purchasePrice:'',
		rentAmount:'',
		currency:"GBP",
		status:"Available",
		description:"",
		picture:null,
		contactTitle:"",
		contactFirstName:"",
		contactLastName:"",
		contactNo1:"",
		contactNo2:"",
		contactNo3:"",
		contactEmailAddress:""
	}
	
});

window.PropertyCollection = Backbone.Collection.extend({
	model:Property,
	url:"properties",
	myFilter: function(attr,val){
		if (attr =="") return this;
		
		return _(this.filter(function(property){
			return (val === undefined) ? true : (property.get(attr)==val);
		}));
	}
});

window.collections = window.collections || {};
window.collections.properties =  new PropertyCollection();
