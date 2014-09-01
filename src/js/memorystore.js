// The in-memory Store. Encapsulates logic to access properties data.
window.store = {

    properties: {},
    currencies: {},

    populateProperties: function () {

        this.properties[1] = {
            id:1,
			propertyTitle:"3 Bed Maisonette",
			noOfBedrooms:3,
			listingDate:new Date(),
			lapseTime:null,
			town:"Willesden Green",
			city:"London",
			country:"UK",
			listedForSale:true,
			listedForRent:true,
			purchasePrice:'350000.00',
			rentAmount:'2100.00',
			currency:"GBP",
			status:"",
			description:"",
			picture:"images.jpeg",
			contactTitle:"Mr",
			contactFirstName:"Ahmed",
			contactLastName:"Haji",
			contactNo1:"02099999999",
			contactNo2:"02011111111",
			contactNo3:"",
			contactEmailAddress:"ahmed@unicube.com"
        };
		this.properties[2] = {
            id:2,
			propertyTitle:"2 Bedroom Flat",
			noOfBedrooms:2,
			listingDate:new Date(),
			lapseTime:null,
			town:"Mile End",
			city:"London",
			country:"UK",
			listedForSale:false,
			listedForRent:true,
			purchasePrice:'',
			rentAmount:'1200.00',
			currency:"GBP",
			status:"",
			description:"",
			picture:"images-1.jpeg",
			contactTitle:"Mr",
			contactFirstName:"Ahmed",
			contactLastName:"Haji",
			contactNo1:"02099999999",
			contactNo2:"02011111111",
			contactNo3:"",
			contactEmailAddress:"ahmed@unicube.com"
        };
        this.properties[3] = {
            id:3,
			propertyTitle:"1 Bed Maisonette",
			noOfBedrooms:1,
			listingDate:new Date(),
			lapseTime:null,
			town:"Ealing",
			city:"London",
			country:"UK",
			listedForSale:true,
			listedForRent:true,
			purchasePrice:'210000.00',
			rentAmount:'980.00',
			currency:"GBP",
			status:"",
			description:"",
			picture:"images-2.jpeg",
			contactTitle:"Mr",
			contactFirstName:"Ahmed",
			contactLastName:"Haji",
			contactNo1:"02099999999",
			contactNo2:"02011111111",
			contactNo3:"",
			contactEmailAddress:"ahmed@unicube.com"
        };
		this.properties[4] = {
            id:4,
			propertyTitle:"3 Bed Apartment",
			noOfBedrooms:3,
			listingDate:new Date(),
			lapseTime:null,
			town:"Greenford",
			city:"London",
			country:"UK",
			listedForSale:false,
			listedForRent:true,
			purchasePrice:'',
			rentAmount:'1550.00',
			currency:"EUR",
			status:"",
			description:"Situated in the heart of Greenford with good transportation links to Ealing and Central London.",
			picture:null,
			contactTitle:"Mr",
			contactFirstName:"Ahmed",
			contactLastName:"Haji",
			contactNo1:"02099999999",
			contactNo2:"02011111111",
			contactNo3:"",
			contactEmailAddress:"ahmed@unicube.com"
        };
        this.lastPropertyId = 4;
    },
    
    populateCurrencies: function (){
    	this.currencies[0] = {
    		id:1,
    		code:"GBP",
    		name:"Great British Pound"
    	},
    	this.currencies[1] = {
    		id:2,
    		code:"EUR",	
    		name:"Euro"
    	}
    },

    find: function (model) {
    	var retValue;
    	switch(model.urlRoot) {
    		case "properties":
    			retValue = this.properties[model.id];
    			break;
    		case "currencies":
    			retValue = this.currencies[model.id];
    			break;
    	}
        return retValue;
    },

    findAll: function (model) {
    	var retValue;
    	switch(model.url) {
    		case "properties":
    			retValue = _.values(this.properties);
    			break;
    		case "currencies":
    			retValue = _.values(this.currencies);
    			break;
        }
        return retValue;
    },

    create: function (model) {
    	var retValue;
    	switch(model.url) {
    		case "properties":
		        this.lastPropertyId++;
		        model.set('id', this.lastPropertyId);
		        this.properties[this.lastPropertyId] = model;
		        break;
		}
        return model;
    },

    update: function (model) {
    	var retValue;
    	switch(model.url) {
    		case "properties":
        		this.properties[model.id] = model;
        		break;
    	}
        return model;
    },

    destroy: function (model) {
    	var retValue;
    	switch(model.url) {
    		case "properties":
        		delete this.properties[model.id];
        		break;
		}
        return model;
    }

};

store.populateProperties();
store.populateCurrencies();
// Overriding Backbone's sync method. Replace the default RESTful services-based implementation
// with a simple in-memory approach.
Backbone.sync = function (method, model, options) {

    var resp;

    switch (method) {
        case "read":
            resp = model.id ? store.find(model) : store.findAll(model);
            break;
        case "create":
            resp = store.create(model);
            break;
        case "update":
            resp = store.update(model);
            break;
        case "delete":
            resp = store.destroy(model);
            break;
    }

    if (resp) {
        options.success(resp);
    } else {
        options.error("Record not found");
    }
};