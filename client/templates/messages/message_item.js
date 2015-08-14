Template.messageItem.helpers({

    correspondent: function() {

        var ppl = this.participants;

        //ppl.splice(ppl.indexOf(Meteor.userId()), 1);



        console.log(" me = " + Meteor.userId());
        //console.log(ppl[0]);
        //console.log(Meteor.users.findOne(ppl[0]));

        if (ppl.indexOf(Meteor.userId()) === 0)

            return (this.participantsUsername[1]);
        else
            return (this.participantsUsername[0]);

    },

    lastMsgDate: function() {

        var msgCount = this.messages.length;
        return formateDateForDisplay(this.messages[msgCount - 1].sentTime);
    }
});

Template.messageItem.events({

    'click #test': function(e) {
        alert("!!!");

        var messageObj = {

                recipientId: "G4mgGENwoLFv4LsX5",
                recipient: "owner2",

                propertyId: "WbEYr3Pivx8W6vQFD",
                propertyName: "Prop 006",

                msg: "TEST TEST TEST TEST",
            conversaionId: "HqaeH46sw7ByTC3AM"

        };



        Meteor.call('conversationUpdate', messageObj, function (error, result) {
            if (error) {
                alert(error);
                alert(error.reason);
                throwError(error.reason);
            }
        })
    }
})