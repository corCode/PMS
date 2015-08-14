/**
 * Created by corrie on 3/29/15.
 */



Template.propertySubmit.events({

        'submit form': function(e) {


            console.log("Errors count " + Errors.find().count());
            e.preventDefault();

            /***
            var propertyAddress = {
                address1:   $(e.target).find('[name=address1]').val(),
                address2:   $(e.target).find('[name=address2]').val(),
                city:       $(e.target).find('[name=city]').val(),
                postcode:   $(e.target).find('[name=postcode]').val(),
                state:      $(e.target).find('[name=state]').val(),
                country:    $(e.target).find('[name=country]').val()

            };


            var propertyAvailableDates = [
                {
                    startDate: new Date($(e.target).find('[name=startAvailableDate]').val()),
                    endDate: new Date($(e.target).find('[name=endAvailableDate]').val())
                }];
             ***/




            var propertyImages = [];

            var files = document.getElementById('myFileInput').files;


            if (files && files.length > 0) {
                // Upload images first to get the db keys
                for (var i = 0, ln = files.length; i < ln; i++) {
                    //alert(uploadQ[i].name);

                    Images.insert(uploadQ[i], function (err, fileObj) {
                        // Inserted new doc with ID fileObj._id, and kicked off the data upload using HTTP
                        if (err) {
                            alert(err.message);
                        }

                        else {
                            //alert(fileObj._id);
                            propertyImages[propertyImages.length] = fileObj._id;
                            //alert(propertyImages.len)
                            //alert(propertyImages[propertyImages.length - 1]);

                            if (propertyImages.length === files.length) {
                                /***
                                 var property =

                                 {

                                     title: $(e.target).find('[name=title]').val(),
                                     description: $(e.target).find('[name=desc]').val(),
                                     rate: Number($(e.target).find('[name=rate]').val()),
                                     address: propertyAddress,
                                     images: propertyImages,
                                     availableDates: propertyAvailableDates

                                 };
                                 ***/
                                var property = setPropertyObj($(e.target));
                                if (Object.getOwnPropertyNames(Session.get('propertyFormErrors')).length > 0)
                                    return throwError("Please correct the errors.");

                                property.images = propertyImages;

                                Meteor.call('propertyInsert', property, function (error, result) {

                                    if (error)
                                        //return alert(error.reason);
                                        return throwError(error.reason);

                                    if (result.propertyExists)
                                        //alert('This property has already been submitted');
                                        throwError('This property has already been submitted')

                                    Router.go('propertyPage', {_id: result._id});

                                });

                            }
                        }


                    });

                    //alert("image" + i.toString() );
                    //alert("propertyImages " + propertyImages[i])
                }

            }
            else
            {
                var property = setPropertyObj($(event.target));
                if (Object.getOwnPropertyNames(Session.get('propertyFormErrors')).length > 0)
                    return throwError("Please correct the errors.");

                Meteor.call('propertyInsert', property, function (error, result) {

                    if (error)
                        //return alert(error.reason);
                        throwError(error.reason);

                    if (result.propertyExists)
                        //alert('This property has already been submitted');
                        throwError('This property has already been submitted');

                    Router.go('propertyPage', {_id: result._id});

                });

            }

            //while (propertyImages.length !== files.length || confirm("exit?"));

            //alert("propertyImages[0] " + propertyImages[0]);
/***
            var property = {

                title: $(e.target).find('[name=title]').val(),
                description: $(e.target).find('[name=desc]').val(),
                rate: Number($(e.target).find('[name=rate]').val()),
                address: propertyAddress,
                images: propertyImages,
                availableDates: propertyAvailableDates

            };

 ***/

/***
            Meteor.call('propertyInsert', property, function(error, result){

               if (error)
                return alert(error.reason);

                if (result.propertyExists)
                    alert('This property has already been submitted');

                Router.go('propertyPage', {_id: result._id});

            });

 ***/
            //property._id = Properties.insert(property);
            //Router.go('propertyPage', property);

        }





});