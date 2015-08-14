
uploadQ = [];



Template.propertyFormFields.created = function () {
    Session.set('propertyFormErrors', {});
    Session.set('propertyServicesCount', 1);


    if (this.data) {

        console.log("Edit Property...");

        if (this.data.services) {
            /***
             * Initialize property services for the dynamic add and edit
             *
             */
            var x = this.data.services;

            for (var i = 0; i < this.data.services.length; i++) {
                x[i].index = i;
                x[i].selected = false;
            }


            Session.set('propertyServices', x);
            console.log(Session.get('propertyServices'));
        }
        else
            Session.set('propertyServices', [
                {
                    index: 0,
                    selected: false,
                    name: "",
                    desc: "",
                    price: 0.00
                }]);
    }
    else
        Session.set('propertyServices', [
            {
                index: 0,
                selected: false,
                name: "",
                desc: "",
                price: 0.00
            }]);

    console.log("Exit created...");

}




Template.propertyFormFields.events({

    'change .myFileInput': function(event, template) {
        var files = event.target.files;

        uploadQ = files;


/*
        //for (var i = 0, ln = files.length; i < ln; i++)
        FS.Utility.eachFile(event, function(file)
        {
            //alert(files[i].name);
            alert(file.name);

            Images.insert(file, function (err, fileObj) {
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                if (err)
                {
                    alert(err.message);
                }
                else if (!fileObj)
                {

                    while(!fileObj);

                }
                else
                {
                    alert(fileObj._id);
                    //propertyImages[i] = fileObj._id;
                }




            });

            //alert("image" + i.toString() );
            alert("after insert")
            //alert("propertyImages " + propertyImages[i])
        });
*/

/*        for (var i = 0, ln = files.length; i < ln; i++){
            uploadQ[i] =
        }*/

        //alert(uploadQ[uploadQ.length].name);

        /*for (var i = 0, ln = files.length; i < ln; i++) {





            Images.insert(files[i], function (err, fileObj) {
                // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                if (err)
                {
                    alert(err.message);
                }
                else
                {


                }

                alert(fileObj);
            });
        }*/


    },

    'click .add-service': function(event, template) {

        var services = Session.get('propertyServices');

        //add new element
        services[services.length] = services.length;
        //services[services.length - 1] = {index: services.length};
        services[services.length - 1] = {index: services.length - 1};




        /**
        if (services.length === 1)
        {
            services[1] = services[0];
            services[0] = {
                service: $(event.target).find('[name=service1]').val(),
                serviceDesc: $(event.target).find('[name=service1Desc]').val(),
                servicePrice: $(event.target).find('[name=service1Price]').val(),
                serviceIndex: 1
            }
        }
        else
        {
            services[services.length] = services[0];
            services[services.length].serviceIndex = services.length;
        }
**/

/***
        services[services.length - 1] = {
            service: $(event.target).find('[name=service1]').val(),
            serviceDesc: $(event.target).find('[name=service1Desc]').val(),
            servicePrice: $(event.target).find('[name=service1Price]').val()
        };

        services[services.length] = {
            service: "",
            serviceDesc: "",
            servicePrice: 0.00
        };
***/
        Session.set('propertyServices', services);
        //var i = Session.get('propertyServicesCount');
        //Session.set('propertyServicesCount', i++);
       //Session.set('propertyServicesCount', 2);
    }

});

Template.propertyFormFields.helpers({

    servicesCount: function() {
        return Session.get('propertyServices').length;
    },

    services: function() {
        /***
        if (this.services)
            return this.services;
        else

         ***/
            return Session.get('propertyServices');
    },

    errorMessage: function(inputField) {
        return Session.get('propertyFormErrors')[inputField];
    },

    errorClass: function(inputField) {
        return !!Session.get('propertyFormErrors')[inputField] ? "has-error" : '';
    }
});