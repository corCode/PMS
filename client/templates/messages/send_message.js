

Template.sendMessage.helpers({

    previousMsg: function () {

        console.log("inbox...");
        var participantId = "";

        if (this.ownerId)
            participantId = this.ownerId;
        else
        {

            if (this.participants) {

                console.log(" me = " + Meteor.userId());
                //console.log(ppl[0]);
                //console.log(Meteor.users.findOne(ppl[0]));

                if (this.participants.indexOf(Meteor.userId()) === 0)

                    participantId  = this.participants[1];
                else
                    participantId = this.participants[0];
            }
        }

        var curConversation = Conversations.findOne({participants: participantId});
        console.log('find conversation...');
        console.log("this...");
        console.log(this);
        console.log(participantId);
        console.log(curConversation);

        if (curConversation) {
            for (var i = 0; i < curConversation.messages.length; i++)
            {
                console.log (curConversation.messages[i]);
                curConversation.messages[i].sentTimeDisp = formateDateForDisplay(curConversation.messages[i].sentTime);
            }
            return curConversation.messages;
        }

        return null;
    },

    convId: function () {

        if (this.ownerId)
            return "";
        else
            return this._id;
    }

});


Template.sendMessage.events({

    'submit form': function (e) {

        var thisRecipientId = "";
        var thisProperty = this;

        console.log(this);
        //alert("0");
        if (this.ownerId) {

            thisRecipientId = this.ownerId;
            thisRecipient = this.owner;
        }
        else {
            var tmpP = this.participants;
            var tmpU = this.participantsUsername;
            tmpP.splice(this.participants.indexOf(Meteor.userId()), 1);
            thisRecipientId = tmpP[0];

            tmpU.splice(this.participantsUsername.indexOf(Meteor.user().username), 1);
            thisRecipient = tmpU[0];



            //copy the property from the last msg in the conversation
            if (this.messages && this.messages.length > 0)
            {
                var lastMsgIndex = this.messages.length - 1;
                thisProperty = {
                    ownerId: this.messages[lastMsgIndex].recipientId,
                    owner: this.messages[lastMsgIndex].recipient,
                    _id: this.messages[lastMsgIndex].propertyId,
                    title: this.messages[lastMsgIndex].propertyName


                }
            }

        }

        // sending msg from "Contact Owner"
        // "this" === current property



            console.log("sendMessage submit form...");
            console.log(this);
            console.log(thisRecipientId);
            console.log(thisProperty);
        //console.log(event.);
        console.log(e);
        //alert("1");

            if (!thisRecipientId)
                throwError("Can't send message from this page!");
            else {



                var msg = $(e.target).find('[id=msgBody]').val();
                console.log(msg);
                //alert("1.5");
                var messageObj = {
                    recipientId: thisRecipientId,
                    recipient: thisRecipient,

                    propertyId: thisProperty._id,
                    propertyName: thisProperty.title,

                    msg: $(e.target).find('[id=msgBody]').val()
                };

                console.log(messageObj);

                var conversation = Conversations.findOne({participants: thisRecipientId});
                //alert("2");

                console.log("send message...");
                //alert("3");
                console.log(thisProperty.ownerId);
                //alert("4");
                console.log(conversation);
                //alert("5");


                if (conversation) {

                    //append the message to the existing conversation
                    messageObj.conversaionId = conversation._id;

                    //alert(messageObj.conversaionId);

                    Meteor.call('conversationUpdate', messageObj, function (error, result) {
                        if (error) {
                            alert(error);
                            alert(error.reason);
                            throwError(error.reason);
                        }
                    })

                }
                else {
                    //Start new conversation
                    Meteor.call('conversationInsert', messageObj, function (error, result) {

                        if (error)
                        //return alert(error.reason);
                            throwError(error.reason);

                        //Router.go('payment', {_id: result._id});

                    });
                }

                /***
                Meteor.call('sendEmail',
                    'corrie.lch@gmail.com',
                    'bob@example.com',
                    'Message from PMS',
                    'This is a test of Email.send.');
                 ***/

            }

    }
});