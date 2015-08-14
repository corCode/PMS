Bookings = new Mongo.Collection('bookings');

/***
Bookings.allow({
    insert: function(userId, doc) {

        return !! userId;
    },

    update: function(userId, property) {
        return (ownsDocument(userId, property) || checkAdmin());
    }

});
 ***/

setBookingObj = function (bookingInfo) {

  return null;
};

checkAvailableDates = function (checkIn, checkOut, availableDates) {

    for (var i = 0; i < availableDates.length; i++) {

        if (availableDates[i].startDate > checkIn || availableDates[i].endDate < checkOut)
        {
            return false;
        }
    }

    return true;
};

Meteor.methods({
    bookingInsert: function(bookingAttributes) {
        check(Meteor.userId(), String);

        /**
         check(propertyAttributes, {
                title: String,
                description: String
            });
         **/



        var user = Meteor.user();
        var booking = _.extend(bookingAttributes, {


            bookedBy: user.username,
            status: "Requested",
            submitted: new Date()
        });

        //perform the insert
        var bookingId = Bookings.insert(booking);

        booking._id = bookingId;

        createBookingNotification(booking);

        return {
            _id: bookingId
        };
    },

    bookingUpdate: function(bookingAttributes) {

        var user = Meteor.user();
        var currentBookingId = bookingAttributes._id;
        var booking = _.extend(bookingAttributes, {


            modifiedBy: user.username,

            modified: new Date()
        });



        delete booking._id;

        Bookings.update(currentBookingId, {$set: booking}, function (error) {

            if (error) {
                //alert(error.reason);
                throwError(error.reason)
            }
            else {
                Router.go('bookingsList', {_id: currentBookingId});
            }
        });

        return {
            _id: currentBookingId};



    }
})