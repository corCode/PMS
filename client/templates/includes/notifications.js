Template.notifications.helpers({
    notifications: function() {
    return Notifications.find({userId: Meteor.userId(), read: false});
    },

    notificationCount: function(){
        return Notifications.find({userId: Meteor.userId(), read: false}).count();
    }
});


Template.notificationItem.helpers({

    notificationItemPath: function() {
        if (this.reviewId)
            return Router.routes.propertyPage.path({_id: this.propertyId});
        else if (this.bookingId) {
            console.log(Router.routes.bookingDetails.path({_id: this.bookingId}));
            return Router.routes.bookingDetails.path({_id: this.bookingId});
        }
        else if (this.conversationId)
            return "/inbox";
    },


    fromUser: function () {

        console.log("Notification...");
        console.log(this);
        if (this.bookingId)

            return this.bookedBy;
        else if (this.reviewId)
            return this.reviewerName;
        else if (this.conversationId)
            return this.sender;
    },

    isMessageNotification: function () {

        return (this.conversationId);
    },

    isReviewNotification: function () {

        return (this.reviewId);
    },

    isNewBookingNotification: function () {

        return (this.bookingId) ;
    }
});


Template.notificationItem.events({
    'click a': function() {
    Notifications.update(this._id, {$set: {read: true}}); }
});