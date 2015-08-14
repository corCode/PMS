Meteor.publish('properties', function() {


    var tmp = Properties.find().count();

    return Properties.find();
});


/*
Meteor.publish('accounts', function() {

        return UserAccounts.find();
    });

    */


Meteor.publish("images", function() {return Images.find()});

Meteor.publish('reviews', function() {return Reviews.find()});

Meteor.publish('bookings', function() {

    return Bookings.find();
});

Meteor.publish('messages', function() {

    return Messages.find();
});

Meteor.publish('conversations', function(userId) {

    //var tmp = Conversations.find({participants: Meteor.userId()});
    var tmp = Conversations.find({participants: userId});

    return tmp;
});

Meteor.publish('notifications', function() {
    return Notifications.find();
});