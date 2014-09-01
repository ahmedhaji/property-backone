window.PropertyView = Backbone.View.extend({

    initialize: function () {
        this.render();
        this.model.on("error",this.displayValidationMessage,this)
    },

    render: function () {
    	var __model = {};
    	__model['currentProperty'] = this.model.attributes;
    	__model['editMode'] = this.options.editMode;
        $(this.el).html(this.template(__model));
		// this.$( "#tabs" ).tabs();
        return this;
    },

    events: {
        "change"        			: "change",
        "invalid"					: "displayValidationMessage",
        "change #listedForSale"		: "toggleAvailability",
        "change #listedForRent"		: "toggleAvailability",
        "click .save"   			: "beforeSave",
        "click .edit"				: "enableEditMode",
        "click .delete" 			: "deleteProperty"
        // "drop #picture" : "dropHandler"
    },

    change: function (event) {
        // Remove any existing alert message
        utils.hideAlert();

        // Apply the change to the model
        var target = event.target;
        var change = {};

		if (target.name==="listedForSale" || target.name==="listedForRent")
		{
	        this.toggleAvailability(event);
	        this.render();
		}
		else
		{
	        change[target.name] = target.value;
	        this.model.set(change,{silent:true});
		}

        // Run validation rule (if any) on changed item
        
        var check = this.model.validateItem(target.id);
        if (check.isValid === false) {
            utils.addValidationError(target.id, check.message);
        } else {
            utils.removeValidationError(target.id);
        }
    },
    
    displayValidationMessage: function(model,error) {
    	console.log(error);
    	utils.addValidationError(error.attribute,error.message);
    },
    
    toggleAvailability: function (event) {
    	var target = event.target;
    	var change = {};
    	change[target.name] = target.checked;
    	this.model.set(change,{silent:true});
    },

    enableEditMode: function (event) {
		this.options.editMode = !this.options.editMode; 
    	this.render();
    	return false;
    },

    beforeSave: function () {
        var self = this;
        var check = this.model.isValid();
        if (check === false) {
            utils.displayValidationErrors(check.messages);
            return false;
        }
        // Upload picture file if a new file was dropped in the drop area
        if (this.pictureFile) {
            this.model.set("picture", this.pictureFile.name,{silent:true});
            utils.uploadFile(this.pictureFile,
                function () {
                    self.saveProperty();
                }
            );
        } else {
            this.saveProperty();
        }
        return false;
    },

    saveProperty: function () {
    	var self = this;
    	this.model.save(null,{
    		success: function (model) {
    			self.options.editMode = false;
    			self.render();
    			utils.showAlert('Success!','Property saved successfully','alert-success');
    		},
    		error: function () {
    			utils.showAlert('Error', 'An error occurred while trying to save this item','alert-error');
    		}
    		
    	});
    },

    deleteProperty: function () {
        this.model.destroy({
            success: function () {
                alert('Property deleted successfully');
                window.history.back();
            }
        });
        return false;
    }

    // dropHandler: function (event) {
        // event.stopPropagation();
        // event.preventDefault();
        // var e = event.originalEvent;
        // e.dataTransfer.dropEffect = 'copy';
        // this.pictureFile = e.dataTransfer.files[0];
// 
        // // Read the image file from the local file system and display it in the img tag
        // var reader = new FileReader();
        // reader.onloadend = function () {
            // $('#picture').attr('src', reader.result);
        // };
        // reader.readAsDataURL(this.pictureFile);
    // }

});