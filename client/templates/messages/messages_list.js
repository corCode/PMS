Template.messagesList.helpers({

    myConversations: function () {

        //return Messages.find({postId: this._id});

        //console.log(Meteor.userId());
        /***
        return Messages.find(
            { $or: [ { recipientId: Meteor.userId() } ,
                { senderId: Meteor.userId() } ] }
        )
         ***/


        /***
        return Messages.aggregate([{$match : { $or: [ { recipientId: Meteor.userId() } ,
            { senderId: Meteor.userId() } ] }}, {$group : {_id : "$recipient", msg: {$push : "$$ROOT"}}}]);
        ***/
        return Conversations.find();

    }


});