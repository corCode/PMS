/**
 * Created by corrie on 3/27/15.
 */
Properties = new Mongo.Collection('properties');



Properties.allow({
   insert: function(userId, doc) {

       return !! userId;
   },

    update: function(userId, property) {
        return ownsProperty(userId, property);
    },

    remove: function(userId, property) {
        return ownsProperty (userId, property);
    }

});

Meteor.methods({

    propertyInsert: function(propertyAttributes) {
        check(Meteor.userId(), String);

        check(propertyAttributes.title, String);

        check(propertyAttributes.description, String);


        /**
        check(propertyAttributes, {
            title: String,
            description: String
        });
         **/

        // Change to check address, exit if already exists
        var propertyAddressExists = Properties.findOne({address:propertyAttributes.address});

        if (propertyAddressExists) {
            return {
                propertyExists: true,
                _id: propertyAddressExists._id
            }
        }

        var user = Meteor.user();
        var property = _.extend(propertyAttributes, {

            ownerId: user._id,
            owner: user.username,
            submitted: new Date()
        });

        //perform the insert
        var propertyId = Properties.insert(property);

        return {
            _id:propertyId
        };
    }


});

// utility function to populate a property object except the images filed
setPropertyObj = function (formPage){

    console.log("setPropertyObj...");

    var propertyAddress = {
        address1:   formPage.find('[name=address1]').val().trim(),
        address2:   formPage.find('[name=address2]').val().trim(),
        city:       formPage.find('[name=city]').val().trim(),
        postcode:   formPage.find('[name=postcode]').val().trim(),
        state:      formPage.find('[name=state]').val().trim(),
        country:    formPage.find('[name=country]').val().trim()

    };

    var sDate = new Date(parseDate(formPage.find('[name=startDate]').val()));
    var eDate = new Date(parseDate(formPage.find('[name=endDate]').val()));


    var propertyAvailableDates = [
        {
            startDate: sDate,
            endDate: eDate//,
            //startDateString: formPage.find('[name=startDate]').val(),
            //endDateString: formPage.find('[name=endDate]').val()

        }];


    var servicesCount = Session.get('propertyServices').length;
    var services = [];
    //services = Session.get('propertyServices');

    var strA, strB, strC;



     if (  servicesCount > 1 ||
         (Session.get('propertyServices')[0] && Session.get('propertyServices')[0].service !== ""))
     {
         console.log(Session.get('propertyServices'));
         console.log(Session.get('propertyServices')[0]);

         for(var i = 0; i < servicesCount; i++ ) {

             strA = "[name=service" + (i).toString() + "]";
             strB = "[name=service" + (i).toString() + "Desc]";
             strC = "[name=service" + (i).toString() + "Price]";

             services[i] = {
                 name: formPage.find(strA).val().trim(),
                 desc: formPage.find(strB).val().trim(),
                 price: Number(formPage.find(strC).val())
             }
         }
     }

    console.log("services...");
    console.log(services);
    if (services.length > 0) {

        for (var j = 0; j < services.length; j++) {

            if (services[j].name === "")
            {
                console.log("inside if...")
                //remove first element
                services.splice(0, 1);
            }
        }
    }

    console.log("after splice...");
    console.log(services);

    var propertyObj = {

        title: formPage.find('[name=title]').val().trim(),
        description: formPage.find('[name=desc]').val().trim(),
        rate: Number(formPage.find('[name=rate]').val()),
        occupancy: Number(formPage.find('[name=occupancy]').val()),
        address: propertyAddress,
        availableDates: propertyAvailableDates,
        services: services

    };

    var errors = validatePropertyForm(propertyObj);

    if (Object.getOwnPropertyNames(errors).length > 0)
        Session.set('propertyFormErrors', errors);

    return propertyObj;


};


validatePropertyForm = function (propertyForm){

    var errors = {};
    Session.set('propertyFormErrors', {});

    if(!propertyForm.title || propertyForm.title.length === 0)
        errors.title = "Please fill in a headline";
    if(!propertyForm.address.address1 || propertyForm.address.address1.length === 0)
        errors.address1 = "Please fill in a street address";

    if(!propertyForm.address.city || propertyForm.address.city.length === 0)
        errors.city = "Please fill in a city";

    if(!propertyForm.address.country || propertyForm.address.country.length === 0)
        errors.country = "Please fill in a country";

    if(!propertyForm.rate || propertyForm.rate === 0)
        errors.rate = "Please fill in a price";

    console.log(propertyForm.availableDates[0])

    if( propertyForm.availableDates[0].startDate == "Invalid Date" ||
        propertyForm.availableDates[0].endDate == "Invalid Date" ||
        propertyForm.availableDates[0].startDate >= propertyForm.availableDates[0].endDate) {
        errors.dates   = "Please select a valid date range";
    }

    return errors;

};

