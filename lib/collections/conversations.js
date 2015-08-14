
Conversations = new Mongo.Collection('conversations');

Meteor.methods({

    conversationInsert: function(messageAttributes) {
        check(Meteor.userId(), String);

        var user = Meteor.user();
        var message = _.extend(messageAttributes, {

            senderId: Meteor.userId(),
            sender: user.username,
            sentTime: new Date()
        });

        var conversation = {
            participants: [Meteor.userId(), messageAttributes.recipientId],
            participantsUsername: [user.username, messageAttributes.recipient],
            messages: [],
            createdBy: Meteor.userId,
            created: new Date()
        };

        conversation.messages[0] = message;

        console.log("conversationInsert...");
        console.log(messageAttributes);
        console.log([Meteor.userId(), messageAttributes.recipientId]);
        console.log(conversation);


        //perform the insert
        var conversationId = Conversations.insert(conversation);

        createMessageNotification(message);


        return {
            _id: conversationId
        };
    },

    conversationUpdate: function(messageAttributes) {

        /***
        var user = Meteor.user();
        var convoId = messageAttributes.conversaionId;
        delete messageAttributes.conversaionId;
        var message = _.extend(messageAttributes, {

            senderId: Meteor.userId(),
            sender: user.username,
            sentTime: new Date()
        });


        console.log("new message...");
        console.log(message);
        alert("TTTT");

***/

        var message = _.extend(messageAttributes, {

            senderId: Meteor.userId(),
            sender: Meteor.user().username,
            sentTime: new Date()


        });

        //alert(message.sentTime);

        Conversations.update( messageAttributes.conversaionId,
            { $addToSet: {messages: message}},
            function (error)
        {

            if (error) {
                alert("!!!");
                throwError(error.reason);

            }

        })

        createMessageNotification(message);
    }

        /***
                Conversations.update(currentConversationId, {$set: propertyFields}, function (error) {

                    if (error) {
                        //alert(error.reason);
                        throwError(error.reason)
                    }
                    else {
                        Router.go('propertyPage', {_id: currentPropertyId});
                    }
                });
        ****/

})