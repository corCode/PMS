Messages = new Mongo.Collection('messages');

/***
Messages.allow({
    insert: function(userId, doc) {

        return !! userId;
    }

});
 ***/


Meteor.methods({
    messageInsert: function(messageAttributes) {
        check(Meteor.userId(), String);

        /**
         check(propertyAttributes, {
                title: String,
                description: String
            });
         **/



        var user = Meteor.user();
        var message = _.extend(messageAttributes, {

            senderId: Meteor.userId(),
            sender: user.username,
            sentTime: new Date()
        });

        //perform the insert
        var messageId = Messages.insert(message);

        return {
            _id: messageId
        };
    }
})