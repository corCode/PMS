/**
 * Created by corrie on 3/29/15.
 */
Template.propertyDetails.helpers({
    ownProperty: function(){
        return this.ownerId === Meteor.userId();
    },

    canEdit: function () {

        return (this.ownerId === Meteor.userId() || checkAdmin());

    },

    bookedByUser: function() {



    },

    reviews: function () {

        return Reviews.find({propertyId: this._id});
    },

    reviewsCount: function () {

        return Reviews.find({propertyId: this._id}).count();

    },

    allowedToReview: function () {

        var booking = Bookings.find({propertyId: this._id, userId: Meteor.userId(), checkIn: {$lte: new Date()}});

        return booking.count() > 0;
    }




});

Template.propertyDetails.events({

    'click .image': function(e) {

        window.open(e.target.currentSrc , "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=500, left=500, width=400, height=400");
    }
});