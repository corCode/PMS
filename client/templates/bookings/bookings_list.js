Template.bookingsList.helpers({
    bookings: function() {

        //if (Session.get('searchLocation') === "")
        //return Properties.find({"availableDates.startDate":{$lt : Session.get('checkInDate')}});

        if (checkGeneralUser()) {

            //only return bookings booked by user
            return Bookings.find({userId: Meteor.userId()}, {sort: {submitted: -1}});
        }
        else if(checkAdmin())
        {
            // return all bookings
            return Bookings.find({}, {sort: {submitted: -1}});
        }
        else if (checkOwner()){

            var x = Properties.find({ownerId: Meteor.userId()}, {_id: 1});
            var propArray = [];

            x.forEach( function(myDoc) {
                //print( "user: " + myDoc.name );

                console.log(myDoc);

                propArray.push(myDoc._id);
            } );

            console.log(propArray);



            return Bookings.find({propertyId: {$in: propArray}}, {sort: {checkIn: -1}});
        }

        //db.properties.find({"availableDates.startDate":{$lt : new ISODate("2015-04-01")}})

    },

    isAdmin: function () {

        return checkAdmin() || checkOwner();
    },

    isCancelled: function () {

        return this.status === "Cancelled";
    },

    isPending: function () {

        return this.status === "Requested";
    },

    isExpired: function () {

        return this.checkIn < new Date();
    },

    isAccepted: function() {

        return this.status === "Accepted";
    }

});

Template.bookingsList.events({
    'click .modify' : function (e) {


        console.log(e.target.id);
        console.log(Bookings.findOne({_id: e.target.id}));
        Session.set('bookingInfo', Bookings.findOne({_id: e.target.id}));
    },

    'click .bookingCancel' : function (e) {

        if (confirm("You sure you want to cancel the booking?") == true){
            console.log("cancel booking...");

            var cancelBooking = Bookings.findOne({_id: e.target.id});
            cancelBooking.status = "Cancelled";
            console.log(cancelBooking);
            Meteor.call('bookingUpdate', cancelBooking ,function (error, result){
                if (error)
                    throwError(error.reason);

                //Router.go('bookingsList');
            })
        }
    },

    'click .bookingResp': function (e) {

        var respBooking = Bookings.findOne({_id: e.target.id});
        respBooking.status = e.target.value;
        console.log(respBooking);
        Meteor.call('bookingUpdate', respBooking ,function (error, result){
            if (error)
                throwError(error.reason);

            //Router.go('bookingsList');
        })


    },

    'click .decline':  function (e) {

        console.log(this._id + " declined...");

        Bookings.update(this._id, {$set: {status: "Declined"}}, function (error) {

            if (error) {
                //alert(error.reason);
                throwError(error.reason)
            }
            else {
                //Router.go('propertyPage', {_id: this._id});

            }
        });
    }
});